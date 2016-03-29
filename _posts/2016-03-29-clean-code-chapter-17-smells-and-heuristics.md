---
layout: post-wide
title: "Clean Code: Chapter 17 - Smells and Heuristics"
date: 2016-03-29
---

Code smells are something my mentors here at 8th Light have been warning me about since I started my SnowMan project. I personally do not have the instinctive nose as do they, so I decided that I am going to make a quick cheat sheet with those that are listed in the book. 

Code Smell | Description | Refactoring
-------------------- | -------------------- | --------------------
 | |
**Comments** | |
 | |
Inappropriate information | Record keeping or other metadata in source code | Keep this type of comment in other systems 
 | |
Obsolete comment | Old, irrelevant or incorrect comment | Delete it, avoid using comments that will become obsolete (or at all)
 | |
Redundant comment | Comment describes something that would adequately describe itself | Omit redundant comments, refactor code to be clear
 | |
Poorly written comment | Comment is not clear about its purpose for writing | Write understandable comments, brief and to the point
 | |
Commented out code | Chunks of code not in use but lingering in the source code | Delete it, it will become obsolete if left long enough
 | |
**Environment** | |
 | |
Build requires more than one step | Requiring multiple steps to build | Combine setup to a single command
 | |
Tests require more than one step | Requiring multiple calls to run all tests | Reorganize files to call back to a spec runner
 | |
**Functions** | |
 | |
Too many arguments | Three or more arguments on a function | Try for zero arguments, add only if necessary
 | |
Output arguments | Function changes something with an output* | If the function must change the state of something, have it change the state of its owning object
 | |
Flag arguments | Boolean arguments hint that the function does more than one thing | Avoid, break up receiving function to handle two cases
 | |
Dead function | Methods that are not called | Delete and don't write until they are needed
 | |
**General** | |
 | | 
Multiple languages in one source file | Mixing multiple languages in one file | Separate languages where possible and practical into their own source file
 | |
Obvious behavior is unimplemented | Code behaves counter-intuitively | Descriptive naming that communicates the intent of the code
 | |
Incorrect behavior at the boundaries | Code behaves counter-intuitively for edge cases | Test all cases, look for every boundary condition
 | |
Overridden safeties | Turning off warning and exceptions to get the code to build | Deal with debugging as it comes up, only override when last resort
 | |
Duplication | Identical (or closely similar) code appearing over and over | Replace with better methods, abstractions and polymorphism*
 | |
Code at wrong level of abstraction | High and low level abstractions appear together | Separate lower level concepts into derivatives and higher level concepts in the base class
 | |
Base classes depending on their derivatives | Base classes mentioning derivatives | Base classes should generally not know about their derivatives
 | |
Too much information | Wide and deep interfaces that require multiple gestures to get things done | Limit exposure at interfaces, with fewer methods, variables and instance variables