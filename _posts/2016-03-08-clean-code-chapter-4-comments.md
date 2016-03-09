---
layout: post
title: "Clean Code: Chapter 4 - Comments"
date: 2016-03-08
---

As a general rule, comments are bad. In addition to cluttering the code, comments become useless as code changes because often the comments are not changed when the code is changed. 

Usually if you find yourself needing to write a comment, it is because the code is not clear. There could be many reasons that the code is not clear, some of which were discussed in the previous posts about Robert C. Martin’s book, *Clean Code*. Try to train yourself to ask what you can do to clean up the code, before writing a comment, to eliminate its necessity.

Sometimes the solution is simply better naming. If your function names are clear with their intent, if the action that they will perform is stated in the function’s name, a comment about its operation is unnecessary. Similarly, if objects are named descriptively (ie: `fileAgeInDays`), there should be no question about what the object is that the name is describing. 

Rarely comments are necessary, but they can be useful for things like adding legal headers or footers, or when the intent of a function is not obvious. It might be helpful to comment non-plain English parts of the code such as a regular expressions. They can also serve as a note for something to come back to if something needs attention that could not be met at the time of writing. 

There is not much to say about comments except to try to avoid them whenever possible. Clarify through better naming and smaller methods rather than commenting. 
