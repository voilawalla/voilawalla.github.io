---
layout: post
title: About Exceptions
date: 2016-07-21
---

I am attempting to make a Java server without having any experience in Java. I do feel like I have a pretty decent handle on the language, considering that I had worked on my first apprenticeship project in Swift, also a statically typed language, and also because several of the technical books I have picked up during my apprenticeship have had code examples written in Java. That being said, one thing that I am finding a complete lack of experience with as part of the language is exception handling.

#### What is an exception?

I guess the first place to start is answering the question, *what is an exception?* As I was looking through some of the Java docs for different methods, I would sometimes come across subsections in the method detail for *”throws”*, noting what kind of exception the method would throw and what error in the code would prompt that reaction.

For example, for Java’s `read` [method](https://docs.oracle.com/javase/7/docs/api/java/io/BufferedReader.html), the documentation notes that an `IOException` will be thrown “If an I/O error occurs”. Cool, so what does that mean?

First of all, an Exception is an object that wraps an error event that occurred within a method. All exceptions extend Java’s `Throwable` class. The object will contain information about the error along with the state of the program where the error occurred, such as the file information and line number where the program was stopped. 

There are different types of exceptions which are each a different class with its own set of rules. The `IOExeption` we are working with deals with input/output operations such as `read()`, `write()` and `close()`. An error could occur, for instance, if you are trying to write to a file that is read-only. In that case, an `IOException` would be thrown and would need to be handled before the program would compile. 

Another example, relevant to my server, would be if I was trying to access a file, but the file did not exist. In that case, I would have to handle a `FileNotFound` exception, meaning that if a resource is not available, I have to direct the program to do something else, either to prompt a request for another resource, or maybe deliver a default file. 

#### Why do they occur?

Most of Java’s exceptions are built in and are automatically generated when appropriate. They can also occur in abnormal situations such as infinite loops or memory runs out. Runtime exceptions are often due to human errors while writing the code, such as trying to divide by zero, or access an index that is outside the bounds of an array. 

#### Checked vs unchecked

There are two types of exceptions, checked and unchecked. A checked exception is called such because it is *checked* before the program runs, meaning if there is an exception of the checked variety, the program would not compile. An unchecked exception could be an error or a runtime exception; every other exception class is checked.

![Checked and unchecked exceptions](http://flylib.com/books/1/432/1/html/2/images/fig188_01.jpg)

Unchecked exceptions do not have to be thrown in the method’s signatures. Unchecked exceptions, since not noticed when the program is booted up, can break the program while it is running if they are not properly handled, but they can also be ignored. The benefit to checked exceptions is that you are forced to deal with them.

When you have a choice as to whether to use a checked or an unchecked exception, consider the following from the Java docs:

> If a client can reasonably be expected to recover from an exception, make it a checked exception. If a client cannot do anything to recover from the exception, make it an unchecked exception

Stay tuned for my next blog where I talk about ways to handle exceptions.