---
layout: post
title: "Clean Code: Chapter 6 - Objects and Data Structures"
date: 2016-03-14
---

There is an interesting distinction that Robert Martin, the author of *Clean Code* makes between objects and data structures. He observes that objects *expose behavior and hide data*, while data structures *expose data and have no significant behavior*. 

Programs will contain both data structures and objects, and each will have its purpose within the code. Because the data in objects is hidden, new objects can be added without changing the behaviors that are available. Conversely, however, adding new functions would mean that the classes would have to change in order to accommodate the new behaviors. This type of code structure is what is referred to as Object Oriented. 

The opposite approach would be Procedural, where new functions can be added without changing the existing data structures because the data structures do not have any behavior that would be affected. 

This speaks to the more broad topic of abstraction.

> Allow users to manipulate the *essence* of the data, without having to know the implementation

Abstraction allows programmers to present a representation of an object without actually exposing the object. This helps to keep variables private as they are not automatically pushed out of the object with getters and setters. We don’t want to expose the details of our data, so this is why we use abstractions. 

One thing that you want to try to avoid is to chain methods in a single call. It is preferable to pull the full function apart, assigning outputs to variables, and using those variables as parameters as needed. 