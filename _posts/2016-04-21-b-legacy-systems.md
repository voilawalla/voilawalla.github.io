---
layout: post
title: Legacy Systems
date: 2016-04-21
---

I used to always think of legacy as a positive thing. When we take steps to preserve our legacy, we are bringing forth the positive aspects of ourselves to live on after we pass. A politician backs policies that will paint him in a positive light after he leaves office, his legacy. Not speaking ill of the dead is also a preservation of legacy. 

But if we are talking about software, on the other hand, legacy becomes a dirty word. Legacy systems are often what we call systems that are buggy, broken, out of date, and in need of replacement. But how does a system become “legacy”, and could there have been steps taken to prevent the transition from working and useful code to *more trouble than it’s worth*?

What is the life of a system? Well if you are talking about a huge, expensive software design, one would hope that the system produces for several years, even decades. Complex systems, such as those used in government projects or infrastructure systems, take a great deal of investment of both time and money. For projects like these, the cost per line of code is enormous, as is the cost per mistake, so a huge amount of planning goes into creating sustainable systems. 

But not every project is a 100,000 developer hour project. When there is not an endless budget, and the quick release of software is necessary for the sponsor of said software to maintain a competitive advantage, what then are the expectations? It would indeed be a rosy outlook to expect these types of systems to be able to carry the same lifespan expectations as the big bulky systems. But I think we should be asking ourselves, why not?

Mind you, I have not gotten very far into the principles, patterns and practices part of Robert Martin’s *Agile Software Development* guide, however, I do know that there are ways to ensure that the system won’t live long and prosper. Chapter 7 describes seven design smells, which are a similar idea to [code smells](http://nicolecarpenter.github.io/2016/03/29/clean-code-chapter-17-smells-and-heuristics.html) but higher level: 

Rigidity        the code is hard to change
Fragility       changes cause the system to break in unexpected places
Immobility      code can not easily be abstracted for reuse
Viscosity       doing things wrong is easier than doing things right
Needless Complexity the infrastructure adds no direct benefit
Needless Repetition repeating structures that could be abstracted
Opacity         intent not obvious, code is hard to read and understand

Each of these items is a flag. They signal that the code is not easily changed, which is a huge hinderance to promoting the longevity of a system. 

Stay tuned in for my next handful of posts that will describe the five SOLID principles. Each of these design principles help to combat ugly aging of systems.