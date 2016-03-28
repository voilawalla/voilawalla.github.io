---
layout: post
title: "Clean Code: Chapter 16 - Refactoring SerialDate"
date: 2016-03-28
---

`SerialDate` is a Java class that defines the requirements for manipulating dates when you need an instance without the precision that `Java.util.Date` gives. It is part of the JCommon library, which is a free, general purpose library. For me that brings up the question: what are these Java libraries? And why do we need them?

As I am working on my Swift project, I am both using Swift’s standard library, and also avoiding using any extended libraries. The reason for this, as was explained by my 8th Light mentor, is that extended libraries for Swift tend to be Apple platform specific. He, running a Linux machine, would not be able to run the application out of the box if it referenced popular Swift libraries like *Foundation*. I had to write my application without these helper classes. In a language like Swift, this is difficult, as because the language is in its toddler years, the standard library is somewhat lacking. 

Java is not specific to an operating system, so for a similar reason you would not want to use platform-specific extended libraries with Swift, you would not want to use platform-native libraries with Java. This increases the reach of the application.

The most important starting place is the **Java.lang** library. This is the library that contains the fundamental Java classes necessary to the functionality of the application. This is where *Object* resides, which is the base class of all other Java classes. Speaking of classes, the *Class* is what is representing instances of classes and interfaces during runtime. The **Java.lang** library also contains important type classes, like *String* and *Boolean*.

If you wanted to go beyond the functionality of a **Java.lang** class, you can use an extension of the java.lang.Object class, or incorporate one of the hundreds of libraries that package the functionality and do the work for you. Extending a class is just another way of saying that another class is inheriting from a class above it in the class hierarchy. 

Beyond the **Java.lang** library, you can include one of Java’s internal libraries. **Java.util**  contains important and useful utilities like date and time manipulation, and internationalization.  **Java.io** handles input and output functions to handle reading and writing from data streams among other things. 

Besides internal libraries, many powerful and popular third party libraries exist and can be incorporated into your program. The goal of these libraries is to provide enhancements to already existing Java classes and to create new functionality beyond that given in the internal Java libraries. Pretty much any functionality that you could hope for in your program, someone has probably already come up with a library for it. For instance, XML parsing, JSON parsing, database mapping, and logging features are just some of the things you can explore through an extended library. 