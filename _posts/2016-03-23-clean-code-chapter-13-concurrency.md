---
layout: post
title: "Clean Code: Chapter 13 - Concurrency"
date: 2016-03-23
---

Before reading chapter 13 I had never heard of the concept of concurrency. I started programming a few months ago, and I have never dealt with production code in any sizeable scope. I think that trying to tackle explaining concurrency in detail is a little bit beyond my current capabilities, but in general, concurrency means decoupling what takes place in applications from when those things take place. This allows programs to operate without functional order dependency.

One thing I found interesting was a small section about the chapter that spoke to limiting the scope of the data, specifically by using the *synchronized* keyword. I have never used `synchronized` in my code, nor have I seen it in other code, so I wanted to see what this was all about. 

All of the references that I have seen for `synchronized` relate to its use in Java, which is not to say that the concept does not exist in other languages, I just did not find it. `synchronized` is a way to ensure that code is not concurrently accessed by multiple threads. Since “thread” is also not a regular part of my lexicon, here is the Wikipedia definition:

> Threads are a way for a program to divide (termed "split") itself into two or more simultaneously (or pseudo-simultaneously) running tasks

In that sense, a task could be reading and writing to a variable. The reading thread wants to access the value, but if it does so at the same time that the writing thread, it is possible that the reading thread will get outdated data, or even a combination of old and new data. By adding the `synchronized` keyword, it is ensuring that only one thread has access at a single time. 

The obvious positive to using `synchronized` is that you are guaranteeing that the data will be what is expected. The downside, however, is speed, because the reading thread will have to wait until the writing thread is done writing before it can read. 
