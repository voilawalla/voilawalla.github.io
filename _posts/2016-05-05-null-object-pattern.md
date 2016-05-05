---
layout: post
title: The Null Object Pattern
date: 2016-05-05
---

The **Null Object** pattern is just a way to encapsulate the absence of a particular value within an accepted data type. For instance, if we are expecting an array, but there are no values in the array, instead of returning `null`, we can return `[]` for which there are no negative consequences. 

When using the pattern, the `null` is not necessarily unexpected; this is not so much a defensive pattern as much as a way to predict and transparently handle occasionally anticipated null returns. After all, null can be anything. If we use the array example, returning `null` does not signal that we were expecting an array of something. 

The null object itself is a subclass of an abstract class that defines the pattern for the objects for which it will implement. The null object will have the same methods as it’s sister not-null object, but generally these would be void of function. In python, my current language of assignment, we would use the `pass` keyword in these null object methods. 

![null object pattern](https://sourcemaking.com/files/v2/content/patterns/Null_Object2-2x.png)

This leaves us with two versions of the object, one a working object with implementable functions, and a second with all of the same methods, just the methods do nothing. Because both are depending on the same abstract class, the null object is completely substitutable for the real object.

The benefit of using a null object, besides type verification, is that you don’t have to code for null values or handle null exceptions. The methods will still be ran, however they will be of the null object rather than the real object. Either way, a valid object is returning without a failure.