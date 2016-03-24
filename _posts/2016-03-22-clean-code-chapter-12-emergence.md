---
layout: post
title: "Clean Code: Chapter 12 - Emergence"
date: 2016-03-22
---

Chapter 12 discusses some overall techniques that you can use to keep your whole code base clean and user-friendly. Specifically, the author references Kent Beck’s four rules of simple design, which note that a design is simple if it runs all the tests, contains no duplication, expresses the intent of the programmer, and minimizes the number of classes and methods.

The concept that I want to talk about a little deeper is testing the application. 

I am currently 3 ½ weeks into the first month of my apprenticeship at 8th Light and if there is one thing I have learned, it is that testing is a way of life. That was actually the reason that I decided to accept the apprenticeship, because I knew that test driven development would be drilled into my head. This is something I am stubbornly learning. I learned the hard way to not push up untested production code.

Normally, I take a problem, and I put my head down and pound away at it until I have a working solution. A major blocker to TDD: a cowboy coded style of finding a solution did not produce a testable solution.

When I applied for the apprenticeship, I knew that the code challenge I filled in was supposed to be tested. I also knew that the way I wrote it, it was pretty much untestable, at least for someone with my knowledge of testing techniques. All of the logic was in a single class, and the view methods were intertwined throughout. The methods were complex and heavy, and there was duplication that I just did not know how to handle.

Fast forward to a week after I submitted my coding challenge, and the developer sends me back a full page list of things that I needed to fix. Number one on that list was testing the application. 

Before, I knew that I had to test the application, but I did not even know where to start. I quickly realized that a clean and organized code base was a testable code base. 

I got to work refactoring. 

The first thing that I began to realize was the importance of methods following that single responsible principle. If a function is only doing one thing, then the test is only testing one thing. Once I realized that, I got to work pulling apart each of my functions. I think that I originally had six total methods in my application; that number more than quadrupled. So now, I had singularly responsible methods that were testable. 

The thing that I am struggling with currently is how to use protocols, interfaces, mocking and stubbing to test the more difficult view methods. This part is a work in process, so I will have to make a follow up post about what I have learned here. 

The moral of the story is, even if you can get an application to run, if that application is not tested, it does not count. Testing allows you to make changes to applications without fear of taking down the whole system. Testing helps to keep the code clean and organized into small, obvious units. And beyond that, testing is just something I need to learn to love because TDD is my new way of life. 
