---
layout: post
title: The Main Class
date: 2016-07-21
---

For the last few weeks I have been reading GOOS, and chapter 18 of the book works through refactoring the `main` method. I am but a Java novice, so I wanted to dig a little deeper into what belongs in the `main` method and the best way to design it. 

The `main` method should be used only as an entry point to start the program. It can live in any class, but it should logically be one that has as little logic in it as possible, meaning that it should construct other classes (ideally one) and call methods (ideally one) from the constructed classes to do the heavy lifting. As seen in the [previous post](http://nicolecarpenter.github.io/2016/07/21/handling-exceptions.html) about exception handling, the main method is at the bottom of the call stack, and that’s because it is the first method that is called to run the application. All other methods are called as a result of the main method being called. 

A major reason that the main class and method should be separated is because it allows for greater flexibility. This allows you to use some of the contained classes in other projects, or to make modifications with fewer chances of breakage. Having fewer dependencies in the main (or anywhere, really), allows you to fully utilize interfaces to swap out classes. It makes it easier to change out the order in which classes are instantiated. There are a number of other reasons to try to get in and out of the main method as quickly as possible. 

Let’s take a look at the anatomy of the main method.

```
public static void main(String args[])
```

There are three modifiers to the  `main` method and one argument.

`public` indicates that the `main` method is fully visible and can be called from anywhere
`static` indicates that the `main` method is a class method
`void` indicates that the `main` method does not return anything
`main` accepts as its only argument an array of strings, the mechanism through which the runtime system passes information to your application as command line arguments [(princeton.edu)](http://www.cs.princeton.edu/courses/archive/spr96/cs333/java/tutorial/java/anatomy/main.html)

The Java interpreter must see a `main` method in order for the program to run. 

There are a few ways that you can deal with heavy main methods. In previous applications, I would use the main method (or a conceptual main) as the entry point to inject dependencies into the program through a runner. I ended up constructing two classes, one to set up the application, and one to run the application. You will often see the main class calling a runner class that deals with the intricacies of the logic paths. 

So the short and sweet of the main method is to keep it, well, short and sweet. Try to get in and out of the main method as quickly and cleanly as possible. If you design your application with this in mind, it makes you more flexible for changes in the future. 