---
layout: post
title: The Composite Pattern
date: 2016-05-12
---

The Composite pattern offers a way to pair down one to many relationships at the file level into one to one relationships by creating a composite object that will maintains knowledge of many objects. You can manipulate the composite to act on a group of objects instead of having each object implemented individually. 

![Composit UML class diagram](http://i.stack.imgur.com/TxEpe.png)

The composite can help with pairing down duplication because it will stand in for the same action for all of the objects. This pattern works best when there is a tree code structure, structure, there is a recursive element, and we can group the components together because we are going to be treating them similarly. 
The interface implemented by the leaf and composite is the component. Within the composite, each object will have similar functions such as do() for a command object, or draw() for a composite of shapes. Calling the function on the composite will trigger the action for all elements contained within. The composite usually has a method called hasChildren() to manage it’s children in order to be able to iterate over those children performing whatever function that composite method specified. 

I read somewhere that a way to look at a situation that would be appropriate for a composite pattern is for *"Containers that contain containees, each of which could be a container"*. For example, you have a file structure in your application. Each file in the structure contains elements which could themselves be files. Another example is with HTML code. You can have a div which contains elements, some of which could also be divs. 