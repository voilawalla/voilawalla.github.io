---
layout: post
title: The Open-Closed Principle
date: 2016-04-26
---

The **Open-Closed Principle** states that *“software entities should be open for extension, but closed for modification”*. What exactly does that mean? 

One way that you can think about OCP is that in order to make modifications, you are not actually changing a base class, but rather, you are adding code in the form of an abstraction to deal with the new requirements. This is easier to illustrate with an example.

In my past life, I used to work as a countertop salesperson and I would have to do in home estimates for my clients to determine the total area of granite or marble that they would be consuming for their project. Most countertops were pretty basic designs, usually an L shape or a “U”, where we had just a series of rectangles to estimate. Every once in a while, though, we had to create more contemporary designs, like this kitchen: ![angled island](https://s-media-cache-ak0.pinimg.com/736x/4f/13/ce/4f13ce7bd2cb29b744b52318870abf7c.jpg) which features trapezoids, or something like this: ![circle peninsula](http://st.hzcdn.com/simgs/3b510bb500b52422_4-8554/contemporary.jpg) that encorporates circles. 

From our perspective with dealing with the customer, they are only going to be paying for the total rectangular enclosure of the shape, so a pentagon would really be counted as the smallest rectangle in which it could reside, however, when we were figuring for our records actual stone use, we needed to know how to figure the area of all kinds of shapes. 