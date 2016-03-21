---
layout: post
title: "Clean Code: Chapter 10 - Classes"
date: 2016-03-18
---

Chapter 10 of *Clean Code* talks about keeping classes clean and organized. All of the rules from the previous chapters apply in maintaining clean classes, such as descriptive naming, keeping classes small, and following the step-down method for organizing the functions within the class. This chapter, additionally, introduces several methods of the SOLID principle, to which I will detail today. 

SOLID is an acronym that speaks to five basic principles of Object Oriented software design:

**S**ingle responsibility 
**O**pen-closed
**L**iskov substitution
**I**nterface segregation
**D**ependency inversion

### Single Responsibility Principle

> A class or module should have one, and only one, reason to change

The ideas of *doing one thing* and *having one reason to change* can become convoluted, and for that reason, the single responsible principle gets missed so frequently. I often see single responsibility described as taking into consideration the actors that will be using each part of the system. For instance, business logic will be managed by one actor, whereas data presentation would be handled by a different actor. 

### Open-Closed Principle 

> Objects or entities should be open for extension, but closed for modification

The Open-Closed principle essentially means that you can add functions or fields to the data structures without changing the class itself; that the only reason to change the class is to add to it, not modify. This is a consideration in the design of an application that would make additions less likely to require an extensive amount of change to the already existing application. Keeping classes and functions small and focused helps with this because new functionality should be added as new classes. 

### Liskov Substitution Principle

> Let q(x) be a property provable about objects of x of type T. Then q(y)should be provable for objects y of type S where S is a subtype of T

That is a very mathy looking statement. The Liskov substitution principle basically means that classes derived from base classes should be substitutable by the base class. A base class will have behaviors that should persist into the extended class. If the new class is changing the behavior of the base class, it is in violation of this principle. 

### Interface Segregation Principle

> A client should never be forced to implement an interface that it doesn’t use or clients shouldn’t be forced to depend on methods they do not use.

An interface is the part of the application that the client interacts with. This principle speaks to the idea of having smaller interfaces with smaller responsibilities rather than larger interfaces that support a wider breadth of behaviors that may or may not be necessary to the needs of the end user. Several interfaces may be used within the same class if the behavior intended by each is different.

### Dependency Inversion Principle

> Entities must depend on abstractions not on concretions. A high level module must not depend on the low level module, but they should depend on abstractions.

I am going to try to explain this, however I am still a little shaky as to the detail of dependency inversion. In order to start thinking about what dependency inversion means, one needs to determine the level of responsibility for each object at play. 

Take, for instance, a cookie and an oven. What does the cookie need to know about itself? It knows what kind of cookie it is. It knows what state it is in (dough, chewy, burnt). The oven needs to know whether it is on or off. It needs to have a behavior of opening and closing the door. 

Dependency inversion come in where we are taking the separate classes and inverting the way that you would otherwise think about dependency (from top to bottom) and making the smaller classes depend on an abstraction. In my cookie example, yes the oven is a higher concept than a cookie in the context of a bakery, as an oven is required to change the state of the cookie from dough to a cookie. But the cookie abstraction can apply to any type of cookie. Whether it is a sugar cookie, a chocolate chip cookie, or an oatmeal raisin cookie, they are all dependent on the cookie abstraction. A sugar cookie will have different ingredients than a chocolate chip cookie, but they both change from dough to cookie. 