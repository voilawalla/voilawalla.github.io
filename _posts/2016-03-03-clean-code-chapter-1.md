---
layout: post
title: "Clean Code - Chapter 1"
date: 2016-03-03
---

What do Grady Booch, Dave Thomas, Michael Feathers, Ron Jeffries and Ward Cunningham all have in common? Well besides being experts in their fields, they are also people whose opinions about software development strategies you should pay attention to, and additionally, they are all featured in Robert C. Martin’s book, *Clean Code: A Handbook of Agile Software Craftsmanship*.

In order to understand what it means to write “clean code”, one has to recognize, not only what ugly code looks like, but also, what goes into making acceptable code exceptional. Martin uses Ron Jeffries’ idea of clean code to summarize the contents of his book.
> No duplication, one thing, expressiveness, tiny abstractions.

Let’s look a little closer at each of these ideas.

**No Duplication**

You have heard the term DRY (don’t repeat yourself) code thrown around amongst developers. This is absolutely a cornerstone in clean software development. Duplication can lead to a variety of issues, but most significant is the ease in which duplication can lead one into a labyrinth of maintenance issues.

Chris Peters has a great [post](http://code.tutsplus.com/tutorials/3-key-software-principles-you-must-understand--net-25161) where he goes deeper into the principle of DRY code. One observation that he makes is that people tend to work within specific scopes, solving problems within that scope, often ignoring of the big machine operating outside.

The idea of DRY code was brought up in *The Pragmatic Programmer* by Andy Hunt and Dave Thomas on the principle that:
>Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.
This means that as systems are broken down into smaller and smaller components, representing single responsibility, no one component should do the same thing as another component anywhere within the system.

**Single Responsibility**

The Single Responsibility Principle is another concept that *Clean Code* author Bob Martin has advanced.
>We want to increase the cohesion between things that change for the same reasons, and we want to decrease the coupling between those things that change for different reasons.

Think of a component exhibiting single responsibility as one that is doing one thing and changing for only one reason. A business function will have a specific set of modules with which to operate, and each module answers to just one business function. The scheme and complexities of the whole system are not considered because what is important is the one job that the module represents.

As far as deciding on what is a reason to change, Martin urges programmers to consider the people that are involved in a requesting the change. People could also refer to a tight business concern. Only one person or business concern should make changes to modules that they are specifically responsible for and nothing more.

**Expressiveness**

At its core, expressiveness speaks to readability. A good starting point for establishing this is with meaningful naming of methods and variables. Clean code should not need `// comments` because the method names should be clear about what the method is doing.

If following the plan that each function is only doing one thing, meaningful method names should not be difficult to establish. By refactoring bulky code into several smaller methods, the responsibility of the functions becomes clear beyond just the name of the method.

**Collection Abstractions**

Abstraction in computer science in general involves reducing the complexity of a system for a particular audience by only presenting an interface that is appropriate for what the user needs. Abstractions can be used to clean code by pulling out elements of a collection that will be referenced separately and repeatedly. By referring to the abstraction rather than the collection as a whole, the user can focus only on the critical elements and ignore the rest.

An abstraction is an indication of good code because they represent forethought in how the code will be used. They need not be complicated; in fact, they should be simple as to express the purpose clearly to the user.