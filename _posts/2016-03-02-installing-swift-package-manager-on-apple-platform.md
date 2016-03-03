---
layout: post
title: "Day 2 - Installing Swift Package Manager on Apple Platform"
date: 2016-03-02
---

Swift Package Manager is a handy swift tool that allows for the easy distribution of Swift code, while, according to its [https://github.com/apple/swift-package-manager](documentation), addresses *“compiling and linking Swift packages, managing dependencies, versioning, and supporting flexible distribution and collaboration models”*. For laypeople like myself, that means GitHub integration.

In order to install SPM, it needs to be downloaded from the [https://swift.org/download/](swift.org) download page. It is very important that the options at the very top are selected, under the section labeled **Latest Development Snapshots**.

The system requirements call for El Capitan so that may need to be upgraded through the app store. After the files are downloaded and the wizard has confirmed installation, the file will be downloaded by default to the Toolchains folder. The bash command `ls -lah` will list (`ls`) all of the long, human readable (`-lah`) files in the appropriate folder. The full command should look something like:
```swift
ls -lah /Library/Developer/Toolchains/
```
At the time of this post, the most recent version was listed as:
```swift
swift-DEVELOPMENT-SNAPSHOT-20160030a.xctoolchain
```

From there, I edited `vim bash_profile` to create access to Swift toolchain’s command line tools:
```swift
export PATH=/Library/Developer/Toolchains/swift-DEVELOPMENT-SNAPSHOT-20160030a.xctoolchain/usr/bin:"${PATH}"
```
This should directly target the development snapshot that we identified in the previous step.

That wraps it up. Now you should have a working version of Swift Project Manager with command line tools.