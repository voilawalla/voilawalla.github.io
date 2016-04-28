---
layout: post
title: The Dependency Inversion Principle
date: 2016-04-28
---

I must admit, the first time I saw this concept in Bob Martin’s *Clean Code*, I was completely lost. I had just successfully implemented knowingly *dependency injection*, so my brain was at capacity with regards to dependency anything. 

Now, a month later, I am ready to revisit the subject. I am reading Martin’s *Agile Software Development- Principles, Patterns and Practices* and in my last four blogs, I have covered the first four [S](http://nicolecarpenter.github.io/2016/04/22/single-responsibility-principle.html).[O](http://nicolecarpenter.github.io/2016/04/26/open-closed-principle.html).[L](http://nicolecarpenter.github.io/2016/04/27/liskov-substitution-principle.html).[I](http://nicolecarpenter.github.io/2016/04/28/interface-segregation-principle.html).D principles. Dependency inversion still is a little tough for me, but I will try to imbue you with some of my new knowledge from the last month.

For me when I am thinking about the idea of Dependency Inversion, it helps to think of real-world, concrete examples. One great example that I read was from blogger and author [John Sonmez](http://simpleprogrammer.com/author/jsonmez/), whose website, [Simple Programmer](http://simpleprogrammer.com/), I vow to become better acquainted with. 

He explained in his [post](http://simpleprogrammer.com/2010/11/13/basic-to-basics-what-is-dependency-inversion-is-it-ioc-part-1/) that a real life violation of the Dependency Inversion Principle would be with all of your home portable electronics. Each item, like a cellular phone, a camcorder, a video game controller, has to interact with the house in order to get electricity to recharge its associate battery. The interface between the house and the device is the charger. 

The reason that this violates the Dependency Inversion Principle is because each device is dictating to the house how it will be charged, rather than the house telling the devices how it will charge them. *“ Your home’s charging capability should define the interface the devices have to use”*. The dependency for the interface should be defined by the house; it should be inverted. 

One example of a properly inverted dependency would be like the DMV in some cases. The DMV requires all who want to acquire a driver’s license to fill out the same forms. It is setting the contract that those who depend on the DMV have to follow. The DMV would not accept a handwritten piece of paper with the same information; they only accept DMV forms for the service requested. 

When it comes to real life programming examples, I am still a little green. I realize now that dependency inversion involves interfaces. The concept of interfaces and abstractions was completely foreign to me a month ago so now I will be exploring this more in the coming months. 
