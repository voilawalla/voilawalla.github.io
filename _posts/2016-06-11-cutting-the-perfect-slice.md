---
layout: post
title: Cutting the Perfect Slice
date: 2016-06-11
---

Vertical slicing is a way to divide an application’s design into very simple working end to end versions. This requires deciding on the possible states of the application and splitting up the different paths to get from a beginning state to an end state as would occur in the final version of the application. If you are working on an application that deals with an external database, business logic, and a user interface, for example, the vertical slice will touch each of these three areas, but only as minimally as possible. 

In chapter 9 of [GOOS](https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627?ie=UTF8&*Version*=1&*entries*=0), the authors begin drawing the design plan for a system that automatically places bids in an auction setting. The eventual design will allow a user to join an auction, place a bid based on the current price of the item, automatically increment the bid if the current price goes up, consider a maximum bid amount, and end the bidding if either the max is exceeded or the auction ends. 

An example of a vertical slice in this scenario would be joining an auction, bidding on a single item, and losing. Another vertical slice would be the same scenario, but with the buyer instead instead winning the auction. A third slice could involve bidding on an item, with the ending condition being the maximum bid amount exceeded. 

In each of these three examples, we are demonstrating end to end functionality. I could also consider each of these slices a single user story. In fact, a user story in an Agile sense should demonstrate a vertical slice as a deliverable unit to the client. 

> Our highest priority is to satisfy the customer through early and continuous delivery of valuable software. *- [Agile Manifesto](http://agilemanifesto.org/principles.html)*

This is the first principle from the agile manifesto. The key word is *valuable*, meaning something that the client can use to either increase profit, decrease cost, or improve customer service. This means that we don’t want to deliver something that the client will not be able to immediately put to use.

I could also think of vertical slice examples from the applications that I have built over the past few months. A story for my hangman game that would represent a vertical slice would be to provide a random word for the player to guess, allow the user to guess a pre-decided number of times, where the user guesses the word and wins. Another slice would be providing a random word, allowing the user to guess a pre-decided number of times, but the user does not guess the word and loses. I could also have a slice that introduces the ability to guess a full word, and another slice that allows the user to decide the number of guesses she can take. Each of these new features would be introduced as part of an end to end release. 

Besides vertical slices serving as deliverables to the client, they are also effective points for which to create end to end tests to ensure that the application behaves as expected. I will get into end to end testing more specifically in my the next post. 

Smaller slices delivered more frequently to the client provide quicker feedback loops. This allows us to be more flexible by catching changes and issues earlier in the design process. 