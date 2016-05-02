---
layout: post
title: The Command Pattern
date: 2016-04-29
---

The command pattern is a design pattern that aids in maintaining S.O.L.I.D code by encapsulating certain actions within classes, allowing for extension and facilitating testing. It completely decouples the sender, the object evoking the action, and the receiver, the object that is receiving the execution request. 

In the command pattern, there are four main players: the *command* object, which stores the values for the parameters  of the receiver methods, the *client*, which instantiates the command object, the *invoker*, which decides when the method should be called, and the *receiver*, which will execute the command. Let’s take a look at an example.

Say you have an application that requires you to make a series of validations. For instance, you want to validate whether the person trying to access a certain part of the application is logged in, whether they are authorized to access it, whether they know the current access code, etc. So you have a list of six or seven conditions that the person wishing to access needs to meet before they are granted access. 

The way that the command pattern works, is each command will have its own validation interface. For example, if you would want to confirm if the user is logged in, the interface would map only to the logic that checked that. Such an interface would exist for each validation. 

When drawing back to the players in the command pattern, these individual validations are the receivers; they are being instantiated by the client. The invoker would be a master validate method that executes each of the commands. It does not know the specifics of how each is validated. You can think of each individual validation as an element in an array of validations that will be passed to the receiver, where all the receiver is doing is triggering the execution of each validation. The command is the command that it is giving to each of the validations to execute. 

Another example would be if you are planning a trip. You have a travel agent that has multiple trips being planned. Each trip will have different activities that will need to be added to the agenda. The travel agent is the client. She is sending the activities of the trip, the invokers, to the receiver, which is triggering each of the activities to be added to the itinerary. 
