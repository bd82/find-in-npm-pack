[![npm version](https://badge.fury.io/js/find-in-npm-pack.svg)](https://badge.fury.io/js/find-in-npm-pack)
[![CircleCI](https://circleci.com/gh/bd82/find-in-npm-pack.svg?style=svg)](https://circleci.com/gh/bd82/find-in-npm-pack)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# find-in-npm-pack

## Description

A CLI tool that searches for text strings inside npm packages tar files.

## installation

with npm:

```
  npm install find-in-npm-pack --save-dev
```

with yarn:

```
  yarn add find-in-npm-pack --dev
```

## Usage

`npm-find-in-files mysecret1 mysecret2`

It is recommended to use this CLI tool inside a npm script which
is executed during your CI build.

## How it works

1. Runs `npm pack` in the `cwd` to create the output tar file.
2. Scans the output tar file and collect a list of the files it contains.
3. Reads each of the contained files, and search for the text strings.
   - Note that the files are read directly from the file system, **not** the tar file.
4. If an issue was detected print to stderr and exit with exitcode 1
5. Will always delete the output tar file before closing the process.

## Limitations

- Searches for text strings verbatim, no support for regular expressions.
- Has a side effect of creating and immediately deleting the npm pack output tar file.
- Implemented as **sync** operations.
- Assumes the contents of the tar file are **text** files in UTF-8 encoding.
