---
layout: post
title: "Clean Code: Chapter 16 - Refactoring SerialDate"
date: 2016-03-28
---

`SerialDate` is a Java class that defines the requirements for manipulating dates when you need an instance without the precision that `Java.util.Date` gives. It is part of the JCommon library, which is a free, general purpose library. For me that brings up the question: what are these language libraries? And why do we need them?

As I am working on my Swift project, I am both using Swift’s standard library, and also avoiding using any extended libraries. The reason for this, as was explained by my 8th Light mentor, is that extended libraries for Swift tend to be Apple platform specific. He, running a Linux machine, would not be able to run the application out of the box if it referenced popular Swift libraries like *Foundation*. I had to write my application without these helper classes. In a language like Swift, this is difficult, as because the language is in its toddler years, the standard library is somewhat lacking. 

Java is not specific to an operating system, so for a similar reason you would not want to use platform-specific extended libraries with Swift, you would not want to use platform-native libraries with Java. This increases the reach of the application.