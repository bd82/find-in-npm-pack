#!/usr/bin/env node
const { execSync } = require("child_process");
const { readFileSync, unlinkSync } = require("fs");
const tar = require("tar");
const argv = require("minimist")(process.argv.slice(2));

if (argv._.length === 0) {
  console.error(
    "Missing search pattern arguments, e.g: <find-in-npm-pack pattern1 pattern2>."
  );
  process.exitCode = 2;
  process.exit();
}

const searchPatterns = argv._;
const packedFiles = [];

// exec adds a newline to the output of the process which we must strip
const packedPkgTarName = (execSync("npm pack") + "").replace("\n", "");
try {
  tar.t({
    sync: true,
    file: packedPkgTarName,
    onentry: (entry) => {
      if (entry.type === "File") {
        packedFiles.push(entry.path.replace("package/", ""));
      }
    },
  });
} finally {
  unlinkSync(packedPkgTarName);
}

const errors = [];

packedFiles.forEach((filePath) => {
  const fileTxt = readFileSync(filePath, "utf-8");
  searchPatterns.forEach((pattern) => {
    if (fileTxt.indexOf(pattern) !== -1) {
      errors.push(
        `file: <${filePath}>, includes disallowed pattern: <${pattern}>`
      );
    }
  });
});

if (errors.length > 0) {
  console.error(errors);
  process.exitCode = 1;
}
