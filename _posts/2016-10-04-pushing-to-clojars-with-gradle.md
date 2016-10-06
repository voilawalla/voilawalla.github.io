---
layout: post
title: Pushing to Clojars with Gradle
date: 2016-10-04
---

The title of this post is misleading, because I still don't know how to push to Clojars with Gradle, but I did learn a lot trying to figure it out.

Let's start out with the basics. I created a project that I divided into two applications, with __Application 1__ being a dependency of __Application 2__. 

Application 1 is an HTTP server whose sole concern is receiving an HTTP request and returning an HTTP response. How that request is transformed into a response, the actual implementation, is not the concern of Application 1, though through which channels that takes place is specified. Application 2, on the other hand, is concerned with the implementation details. Application 2 dictates which routes exist, how the routes are handled, and of what the response consists.

Because each of the applications are written in Java, I don't have to worry about strange interop details. The only thing I needed to do was to make Application 1's jar file available to Application 2. 


## Including the Jar locally

Not my first instinct, but the easiest method was to manually include Application 1's jar file in Application 2's source code. I saved the jar file in my libs directory and accessed it as a dependency in my Gradle build file. This was an easy enough addition to gradle.build.

```
repositories {
    mavenCentral()
   
    flatDir {
        dirs 'libs'
    }
}

dependencies {
    testCompile 'junit:junit:4.11'
    compile name: 'JavaHttpServer'
}
```

The problem with this implementation is that I am working with a completely static dependency. Any time I make a change to Application 1, I would have to copy the jar into Application 2. This is not very practical.


## Importing an External Jar

A more prudent option would be to save the Jar file externally in an artifact library. I initially looked into uploading to Maven central, but that is definitely not an easy thing to negotiate. Part of the problem was that I was working with a Gradle build file rather than a Maven pom, so it was like all of the instructions were written in French. Another avenue I started down was to attempt to make a personal remote maven repository, but that too lead me to a dark place. Maven documentation is not the best, and Gradle was not significantly better.

My mentor and another code reviewer suggested Clojars, which I did check out, but because there was no mention of Gradle, I set aside. Gradle includes in their documentation instructions to upload to a Maven repository. What I did not initally realize was that Clojars is just a Maven repository, so I already had the instructions.


### Maven plugin

Attempt number one involved the [Maven plugin](https://docs.gradle.org/current/userguide/maven_plugin.html#uploading_to_maven_repositories) for Gradle. The value of this plugin which adds support for deploying artifacts to Maven repositories. An artifact is a file of the project that is meant be externally exposed, like, for instance, a Jar file. 

By including the plugin, an additional task `install` is included among the other Gradle tasks which [installs the associated artifacts to the local Maven cache](https://docs.gradle.org/current/userguide/maven_plugin.html#sec:maven_tasks).

According to the Gradle documentation, in order to upload to a Maven repository, the following code would need to be included in the `build.gradle` file:

```
artifact {
  archives thingToArchive
}

uploadArchives {
    repositories {
        mavenDeployer {
            repository(url: "https://clojars.org/repos")
        }
    }
}
```

The build file tasks are run when the application is built, so this task will create the pom file that Maven repositories require, and upload the files to the specified target in the pom. In a perfect world, I am done. In _my_ world, different story.


### Danger, Will Robinson!

The first error I encountered was mostly my fault.

```
Failed to deploy artifacts: Could not transfer artifact <jar> from/to clojars2 (https://clojars.org/repo/): Failed to transfer file: <jar> Return code is: 401, ReasonPhrase:Unauthorized.
``` 

While the Gradle documentation did not specify that I needed to add authentication, how else would it work? I want to upload to my specific clojars repository and I do not want other people to put their garbage in my library. After a little digging, I added the following line to the `mavenDeployer` task.

```
authentication(userName: "myUserName", password: "myPassword")
```

That actually got rid of my original error, but now, a new one.

```
Failed to deploy artifacts: Could not transfer artifact <jar> from/to clojars (http://clojars.org/repo/): Failed to transfer file: <jar>. Return code is: 405, ReasonPhrase:Not Allowed.
```


### Bringing in the Reinforcements

This was as far as I could get without help. I brought in reinforcements to help me figure out where to go from here.

After also knocking his head against a wall trying to figure out the configuration, Geoff decided to rely on an old fallback: Boot. 

Let's take a look at what problems we were trying to overcome. First of all, I have an established Clojars account, but the clojars documentation does not include Gradle upoad instructions. Secondly, Gradle's instructions are perhaps incomplete, as even with help confirming I was following the instructions as written, I still could not figure out how to resolve the error. 

This is not to say that some other configuration would not have been much easier. Something about the combination of me using Gradle from a Java app to push to Clojars just did not jive. 


### Building with Boot

So a couple of decisions were made when Geoff stepped in. He confirmed to me that this was indeed a known pain point. He also made me aware of the fact that I can work around our current blocker.

Geoff, being the enthusiast of weird technologies he is, introduced me to Boot and the `boot.build` file. I was hoping that I could complete this blog post while benefitting from his in-room presence, but because I blog slow, I am currently finishing up this post from a bar stool in River North while watching a tense wild card playoff between my Mets and the Giants. 

Here is the build file, it should be pretty self explanitory.

```
(set-env! :repositories [["clojars" {:url "https://clojars.org/repo/"
                                     :username "myUserName"
                                     :password "myPassWord"}]])

(task-options!
  push {:file "build/libs/java-http-server-1.0-SNAPSHOT.jar"
        :pom  "build/poms/pom-default.xml"
        :repo "clojars"})
```

With the help of Google instead of Geoff, I am going to attemt to explain this with you. The first thing that is happening is I am using the `set-env!` boot command to alter the repositories key, which is a part of the JVM classpath. I am setting the values to what I need my pom to communicate to Clojars. After that, I am setting values for when I call `boot push`.

There are a couple of additional configuration efforts I had to make in order to ensure that the file updated with each push. First, I had to include the version in my boot file. I also had to specify `group` in the gradle build file because the pom file that was being automatically generated (required for Clojars) needed this specified. Additionally, I had to specify a root project name in a settings.gradle file because the default would be the package name, `JavaHttpServer`, but that would not work because Clojars does not like camel case.


### Putting it all together

Now that I have everything set up, I need to run two commands, but first, I will need to build the application to make sure that everything is in place and the pom file is up to date. I am also using the gradle wrapper to run my tests, so if I want the wrapper to be available in the jar, I would have to call `gradle wrapper` to provide the supporting files. 

```
gradle install
```

`install` is a command made available by the Maven plugin. As mentioned above, this adds the artifacts to the local Maven cache.

```
boot push
```

The push command pushes the pom and jar file to where I specified in the boot build file, which is my Clojars repo. And there you have it, a fresh jar, ready to be pulled down from Clojars.


## Including the Jar in your application

There are two inclusions that you will need in your Gradle build file that will allow you to include the jar.

```
repositories {
   maven { url 'https://clojars.org/repo' }
}

dependencies {
  compile 'org.clojars.ncarpenter:java-http-server:1.0-SNAPSHOT'
}
```

This shows that I want access to the Clojars repo in this application. Second, I am including the jar as a dependency in the application. Now, all I have to do in include the file I want where I want to use it in the application. It's as simple as that.