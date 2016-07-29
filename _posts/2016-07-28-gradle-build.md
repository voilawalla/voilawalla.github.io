---
layout: post
title: Gradle Build
date: 2016-07-28
---

With deciding to not use an IDE to develop my Java Http Server, I am accepting the additional responsibility of correctly wiring up the server’s dependencies and learning how to create my own jar files. I have not gotten to the point where I need to do that yet, so currently I am still working off of a very rudimentary file structure. 

```java
.
├── README.md
├── build.gradle
└── src
    ├── main
    │   └── java
    │       ├── Main.java
    └── test
        └── java
```

Probably the only file that looks out of place here is my `build.gradle` file. Gradle is a build tool that helps to automate the creation of the executable application from source code. Gradle has powerful commands that will eventually assist me in creating the previously mentioned jar files. I can also use Gradle’s wrapper option to create executable code that would run with the command `gradlew run`, rather than by compiling and running through the jar. If someone is trying to run the application and they already have gradle installed, the simpler command `gradle run` will do the trick.

Currently, not much is going on in the build file, but it is enough to get me started and to get my tests running. Take a look.

```
apply plugin: 'java'
apply plugin: 'application'

mainClassName = 'com.carpentern.Main'

repositories {
  mavenCentral()
}

dependencies {
  testCompile "junit:junit:4.11"
}

test.testLogging {
  events 'passed', ‘skipped’, ‘failed’
}
```

Let’s break this down a bit. 


#### Binary Distribution

The first couple of lines are the plugins. The first plugin `java` should be self explanatory. Without this line, Java compilation testing and bundling would not be possible. The second plugin `application` is what enables us to run and install the application. This plugin also provides us with the additional benefit of creating a binary distribution, which is what is temporarily allowing me to compile the application without a specified jar file. 

In order for this to compile with the application plugin, I need to specify where the Main class lives in the application. Once that is set, I am able to call `gradle run` to run the application. I can also package the binary distribution into a zip or tar file with the commands `distZip` and `distTar`. 


#### Repositories

Maven is an alternative build tool to Gradle, but we can still include Maven repositories in our build file. Maven has three types of repositories: local, central and remote. In the build file we are accessing Maven’s central repository, which contains commonly used libraries built by the Maven community. Including this line provides a backup for dependency lookups. When a dependency is not located in a local repository, Maven will search in its central repository by accessing a built in link. Internet is required as this repository lives online only. 

The normal dependencies in our application will live in a local repository, though I currently do not have any so this addition is not yet necessary. Because I am running Gradle tasks and not Maven tasks, I have to actually manually add this repository to the build file. If I were using Maven as my build tool, when I ran a Maven task, this file would be created automatically.

```
repositories {
  mavenLocal()
}
```

The local repository will contain my jar files when they are ready. We could link to any remote Maven or Ivy repository as long as we list it here in the build file.


#### Dependencies

Currently, my only dependency is JUnit for unit testing. Gradle will navigate to Maven Central repository to look these up unless they are listed in a locally named repository. 


#### Test Logging

Test logging is not by any means required. This allows you to see a more verbose test output when the tests are run. The catch to this command, however, is that the output (passed, skipped, failed) is only shown on the first run through the tests, or if a change is made to a particular test. Once it has run, the output will no longer be seen, but next to `:tests` on Gradle’s output will appear the words `UP-TO-DATE`. If you wanted to see the output on a clean run, you would simply have to use the command `gradle cleanTest test` instead of `gradle test`.


#### Conclusion

So there are the basic building blocks of a Gradle build file. As a summary, these inclusions allow me to work with, compile and run my Java application and use JUnit to test it. I am able to run the application without explicitly creating a jar file. I have access to Maven’s central repository for common libraries. I can also customize my JUnit test output to the console. 

I am sure that as I get deeper into this project, this file will expand. Stay tuned. 