---
layout: post
title: Working with Legacy Code
date: 2016-05-31
---

I have never claimed to be a reader, and I won’t promise that this copy of Michael C. Feathers’ *Working Effectively with Legacy Code* will get cracked concurrently with *GOOS*, but it is definitely on my *must read* list. 

The thing that I am most concerned with, as I am move along in my apprenticeship, is being thrust onto a team and having no idea what is going on or how the code works. Chapter 4 of *GOOS* briefly mentions the possibility of having to test legacy code, which I am expecting to be a bit rocky at first.

Mind you, I can read the code of my fellow apprentices pretty effectively, because we are generally being taught to follow the same principles when writing code cleanly and sustainably, but what about when I start working for a client, trying to unpackage their work? And if that work is untested, as I suspect a decent percentage of legacy code is, making sure that my tinkering does not lead to the complete meltdown of the system’s nuclear reactors. 

In agile development we talk about a vertical slice in the sense that clients should incrementally be presented with usable parts of the system. If something looks wrong, or even if something is exactly as specified, but the client changes her mind, this allows more time to make changes at less of a cost. 

When considering reading and testing legacy code, it is suggested that you also try to find the smallest sliver of a slice to recognize and understand from end to end. Perhaps this is my naivety and inexperience with end to end testing showing, but this seems like a difficult thing to wrap my head around. I have only had experience with unit testing, and end to end testing seems far more cumbersome. 

The idea behind end to end testing first is after the build and deploy process has been automated, end to end tests provide a wrapped level of protection for the system, allowing you to go deeper with refactoring the code and adding additional functionality with unit tests. I get that. You should not add anything new without adding tests, and if something breaks across the end to end test, you know that your tinkering has had a negative effect. But how do you know what it was that broke the system if you don’t have unit tests for the area upon which you are working.

It seems like, so far, the only reasonable approach to working with legacy code is to step lightly and slowly.

![Laser security system](https://familynow.com/images/Laser-Security-System.jpg)

I am sure as I start to work with legacy code and learn more, I will pick up more tricks.