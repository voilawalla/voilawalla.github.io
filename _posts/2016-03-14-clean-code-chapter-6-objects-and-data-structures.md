---
layout: post
title: "Clean Code: Chapter 6 - Objects and Data Structures"
date: 2016-03-14
---

There is an interesting distinction that Robert Martin, the author of *Clean Code* makes between objects and data structures. He observes that objects *expose behavior and hide data*, while data structures *expose behavior and have no significant behavior*. 

Programs will contain both data structures and objects, and each will have its purpose within the code. Because the data in objects is hidden, new objects can be added without changing the behaviors that are available. Conversely, however, adding new functions would mean that the classes would have to change in order to accommodate the new behaviors. This type of code structure is what is referred to as Object Oriented. 

The opposite approach would be Procedural, where new functions can be added without changing the existing data structures because the data structures do not have any behavior that would be affected. 
