---
layout: post
title: "Clean Code: Chapter 8 - Boundaries"
date: 2016-03-16
---

Boundaries are the points when your code meets with code written by others, where you have little control on what they deliver. It’s good to buffer these boundaries with Adapters so that your dependency on third party software isn’t widespread and when the third party software changes, you have one place to go and make the change.

You want to explore the boundaries of third party systems. While it is not necessary to test third party code, you still want to know how the code works and that you understand what is actually going on. You never want to make assumptions about what the code should do. 

