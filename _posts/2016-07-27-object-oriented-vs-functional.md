---
layout: post
title: Object Oriented vs Functional
date: 2016-07-27
---

In my [previous post](http://nicolecarpenter.github.io/2016/07/26/idiomatic-clojure.html) I spoke about idiomatic Clojure and the reasons we would want to write code that follows a language’s style and structure conventions. I mentioned that certain rules apply to object oriented languages that cannot necessarily be applied to functional code, so now I am going to give an overview about why that is and what the general differences are between object oriented and functional programming languages. 

Most people, when they start off learning code, will begin learning an object oriented language like Java, Ruby, Python or a C based language. There is certainly not a hard rule for why one would begin programming in this direction, and in fact, as I was looking for evidence to this point, I saw a lot of pull for the converse. So let’s back up.

#### OOP - Why does it rock?

I fondly remember learning about the SOLID principles when I was reading PPP at the beginning of my apprenticeship: 

* Single Responsibility Principle
* Open-Closed Principle
* Liskov Substitution Principle
* Interface Segregation Principle
* Dependency Inversion Principle

Each of these five principles speaks to design decisions one should make when designing object oriented code that is reusable, with low coupling, high cohesion and no duplication. These traits make the program easy to maintain and extend later down the line. Such rules can be applied to object oriented languages thanks to one simple, yet powerful structure: the **class**.

Object oriented programming describes a pattern of design where everything in the program is considered an object, usually in the form of a class, which is part of a larger class hierarchy for the system. An object can hold data as attributes and code as functions. The data is what is referred to as state, is stored as properties of the object. A lamp can have the state of “on” or “off”. The functions represent behavior. A lamp can “turn on” or “turn off”. Changes in an object’s behavior can change that object’s state.

One of the benefits of programming in an OO approach is that you can reuse and extend code through inheritance. Inheritance means sharing commonly used data and functions between classes. The benefit to inheritance is that it reduces duplication, making the code easy to maintain and change. It is also a key factor in increasing the flexibility of a program, assuming that the Liskov Substitution principle is applied, because it enables you to be able to reuse switch out different implementations of a superclass as needed. 

Another core advantage to OOP is encapsulation. Encapsulation allows you to hide certain details about the implementation of the code. It works by bundling properties and methods together as a single unit that must be accessed through public interface methods. Encapsulated code reduces the chances that a change made to one part of the system will cause problems elsewhere in the system.

Beyond those benefits are the advantages that come with the design of object oriented systems. While OO systems tend to be larger and more verbose than functional systems, they tend to be easier to maintain on a larger scale due to the strict structure and reduced dependencies.

#### Functional programming - Why does it rock?

Functional programming is a way of designing code that is absent of side effects. This means that data is passed around without the maintenance of state. Functions only care about and rely on data that was given as an input and their operation does not change data elsewhere in the program. Functional code is concise because we do not have to build objects around the code, and we also eliminate overhead in other places such as maintaining state and passing iterators. 

Given the benefits of OO programming listed above, you might be wondering under what circumstances functional programming would be preferred. Rather than trying to paraphrase, I will just quote a great [Stack Overflow answer](http://stackoverflow.com/a/2079678) addressing this topic:

_When you anticipate a different kind of software evolution:
* Object-oriented languages are good when you have a fixed set of operations on things, and as your code evolves, you primarily add new things. This can be accomplished by adding new classes which implement existing methods, and the existing classes are left alone.
* Functional languages are good when you have a fixed set of things, and as your code evolves, you primarily add new operations on existing things. This can be accomplished by adding new functions which compute with existing data types, and the existing functions are left alone._

First of all, I don’t want to give the impression that object oriented programming is the strict big brother to functional programming. Functional programming has its place and its own benefits. The decision to choose a functional style versus an object oriented style should not depend on solely one factor, but should be the outcome of considerations about both the short and long term goals of the project and the abilities of the people who are on the project team. 