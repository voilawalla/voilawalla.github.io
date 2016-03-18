---
layout: post
title: "Clean Code: Chapter 9 - Unit Tests"
date: 2016-03-17
---


First Law You may not write production code until you have written a failing unit test.
Se---
layout: post
title: "Clean Code: Chapter 9 - Unit Tests"
date: 2016-03-17
---

Robert C. Martin, in his book *Clean Code*, outlines three laws to abide by when working in a test driven development (TDD) fashion: 

**First Law** You may not write production code until you have written a failing unit test.

**Second Law** You may not write more of a unit test than is sufficient to fail, and not compiling
is failing.

**Third Law** You may not write more production code than is sufficient to pass the currently
failing test.

The same rules apply to tests as apply to the production code. You want to keep the tests clean, clear, and organized. Treat test code with the same level of importance as the production code because it really is just as important. Tests help to keep the code base flexible by allowing changes to be made without fear of widespread damage.

The most important rule to maintaining clean tests is readability, and the same things that make production code readable, make tests readable: clarity, simplicity, and density of expression. 

Only one assertion should be made per test. While this can create a lot of duplicate code, the template method pattern can be implemented to reduce this duplication by separating the *given/when* parts of the base class from the *then*. It is ok to use multiple assert statements.

Each test should cover a single concept, a single *when/then* per test. Just like with methods, unit tests should do one thing only.

Clean tests should follow **F.I.R.S.T** rules:

-Test should be **F**ast

-Tests should be **I**ndependent of other tests

-Tests should be **R**epeatable in any environment

-Tests should be **S**elf-validating, having a boolean value: pass or fail

-Tests should be written in **T**imely fashion