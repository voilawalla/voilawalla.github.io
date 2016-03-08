---
layout: post
title: "Clean Code: Chapter 3 - Functions"
date: 2016-03-07
---

Functions should be as small as the action they take, which is to say, very, very small. Think one to two lines. In fact, a good rule of thumb is to never have more than one line of code per block, and one or two indentations per function. Deeper indentation indicates nesting, which can complicate code more than need be. 

Clean code author Robert C. Martin includes a great quote about the purpose of functions:

> Functions should do one thing. They should do it well. They should do it only.

When thinking about whether the code is doing more than one thing, consider how many levels of abstraction are occurring within the function. If everything in the function appears within the same level of abstraction, and no code can be extracted into another function at a different level of abstraction, you are generally safe. 

But what exactly does abstraction mean in this context? Abstracting is defined by *Merriam-Webster* as “the act of obtaining or removing something from a source”. Object oriented programming relies on abstraction as a way to organize code by specific levels of detail. Levels of abstraction can be considered, generally, as levels of detail. 

For instance, a car has wheels, has an engine, and has seats. These are all descriptive properties of the car and all the same level of detail. A car can check coolant levels, check its running temperature and check its gasoline level. These are all descriptive actions at the same level of detail. The car’s response to the brake pedal being depressed, however, is a different level of abstraction; a different process. 

> Functions should either do something or answer something, but not both. Either it should 
> change the state of an object, or it should return some information about the object.

It is important to keep functions organized in a meaningful way. Martin suggests a top-down approach where the most broad and general concepts are stated at the top, with deeper and deeper detail the farther down the methods go. For example, feeding the cat is a general action that is broken down into smaller steps: opening the can requires fetching the can opener which requires opening the drawer, etc. 

The [previous post](http://nicolecarpenter.github.io/2016/03/04/clean-code-chapter-2-meaningful-names.html) discussed more thoroughly how to create meaningful names. Some key points are to make the intention of the method obvious, the function name should be a verb as the function is performing an action, and to make names consistent. 

With regard to function arguments, the author suggests that the fewer, the better. He argues that carrying arguments around the code forces the reader to know the interpretation of the argument each time it is used. Beyond that, arguments make testing more difficult because if there is more than one argument, more cases would have to be tested for different combinations of possible inputs. 

There are exceptions to the no argument guideline. If the purpose of the function is to answer a question about the argument, obviously this is acceptable. Another case is if the function call is intended to be interpreted as an event rather than to produce an output. Two arguments are appropriate in instances like cartesian points, where the two values support one assertion and there is a natural order. 

If you find you are needing to pass more arguments into a function, it is likely that some of those arguments can be pulled into another object and the object passed into the function. For instance, an address is a first name, last name, street, state and ZIP code. Instead of each of these things being passed into a function, an address object as a whole can be passed in instead.

Another important concept about clean functions is that they do not have side effects. A function doing one thing will have one outcome for the function. Keep an eye on functions that change variables, passed parameters or global settings as these violate the do one thing principle. Even error handling should be considered a single and separable action deserving of separate functions.

There are many guidelines in keeping clean functions. It is perfectly acceptable to start out with a working solution and then refactor to a clean, working solutions.