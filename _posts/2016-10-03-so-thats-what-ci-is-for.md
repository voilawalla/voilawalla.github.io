---
layout: post
title: So that's what CI is for
date: 2016-10-03
---

Last week I pushed up my [Note Taker](https://github.com/NicoleCarpenter/NoteTaker) application to GitHub and was met with an unpleasant error that I couldn't figure out how to reconcile.

```
The command "eval ./gradlew assemble" failed 3 times.
```

I have a problem where sometimes when I see red, I get tunnel vision and I focus on only a small piece of the error, rather than reading the entire picture. In this case, the error message itself was what I was focusing on, however the real value was in the surrounding messages. My obvious first step was Googling the error, but when that turned out too vague, I ended up, shamefully, deleting the [Travis CI](https://travis-ci.org) build file to deal with it later.

Today, I went back to Travis because I spent a few hours on the same exact error in another application, and I was not trying to delete another Travis file. After spending the requisite amount of time in Google, I returned to the error to notice that there was a whole ledger full of other, more helpful errors that I had been completely neglecting. Here is an example:

```
/home/travis/build/NicoleCarpenter/CobSpecServerApp/src/main/java/carpentern/cobSpecApp/handler/FileHandler.java:14: error: cannot find symbol
private ResponseBuilder responseBuilder;
        ^
```

More information, though still somewhat confusing, because why is this failing now? I have unit tests and my build passes locally. What is different here? The error is ocurring in a class called `FileIO`, which is responsible for reading and writing to files. The class that it is not able to find, `ResponseBuilder` is actually an interface that exists in my server. I know it exists there because I have my server right in front of me with a fresh push to [Clojars](https://clojars.org). The solution to this problem lies within the very first line.

```
error: ResponseBuilder is not public in carpentern.coreServer.response; cannot be accessed from outside package
import carpentern.coreServer.response.ResponseBuilder;
                                      ^
```

Let's back up a couple of hours.

I started this project without the helping hints of an IDE, meaning I opted to build my Java project in Sublime rather than IntelliJ. That allowed me to understand my dependencies more thoroughly, as I was doing the wiring manually. The detrement to this method, on the other hand, was that I was unable to benefit from the numerous hints that IntelliJ provides. Sure, I was able to address the major errors, but after making a bunch of changes to various files, I had some unused methods and unreferenced dependencies that could be scrubbed. Additionally, IntelliJ pointed to some access control measures that I could take. This is where I got into trouble. 

One of the hints that I received from IntelliJ for which I did not anticipate the consequences, was a seemingly innocuous suggestion to make some of my classes in my server package private, meaning to remove the `public` modifier. The suggestion was made for my `ResponseBuilder` interface because I had removed the implementation classes to other applications, so there was not anything internally referencing the interface. When I packaged my jar and referenced it in the new applications, though, I was not able to reference the interface. 

But the solution was not to restore the interface's public status, but rather to move the interfaces onto the client.

I was trying to use the same interface for both applications, before I realized that this was inappropriate because both applications had entirely different interfaces. Sure, both applications needed to have a method that returned a HTTP response, but the way to get there on either end was very different. My Cob Spec Application required several options for response that each involved a custom form of a HTTP response. The Note Taker application involved far fewer response options as there were only four combinations of requests: GET an existing file to read, handle a GET request to a file that does not exist, POST to a new file, or handle any other request. 

It was in this little snafu that I realized the value of Continuous Integration tools. See, previously I had always included a Travis build file, however the build would only fail if my tests failed locally. I could predict when a build would fail before I even pushed it up. The value here is with dealing with multiple sources to check not only whether the tests pass, but also whether everything is wired up correctly. Hey, that's what an acceptance test does!

The value of continuous integration shows up when there are actually multiple parts to iterate. Had those errors not blown up with Travis, those errors would have been passed down to the users of my client apps.