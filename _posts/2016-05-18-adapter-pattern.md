---
layout: post
title: The Adapter Pattern
date: 2016-05-18
---

The Adapter pattern is a way to allow two classes to speak to each other that are otherwise not connected. This pattern is commonly used when dealing with third party APIs or any other class that is subject to frequent changes. The adapter will convert the interface of the API into an interface that our application can use.

There are a few players to consider with the Adapter pattern. The adapter is the client interface used to wrap the interface that we want to use. The adaptee is the interface, like a third party API, upon which the application will depend. The client is the class interacting with that interface.

![The adapter pattern](http://www.dofactory.com/images/diagrams/net/adapter.gif)

You can think of the adapter like that special plug that you would use if you have a three prong appliance needing to use a two prong plug. The client is the home’s electricity, and the adaptee is that which we want to connect, like a mini-fridge. Because the three prongs of the mini-fridge cannot connect to the two prong outlet of the home, we use the adapter plug to facilitate the connection. 

We talked in previous posts about protocols in Swift being contracts. This idea is important here because we are depending on classes and APIs that we cannot control. If the API makes a change to one of their methods, we are insulated from the change. 

When we are using this pattern, we are not depending on the concrete adaptee, but rather the adapter. We create an instance of the adapter and send in the concrete adaptee class as an argument so that we have a reference.

Using the adapter pattern is a great way to protect classes dependent on volatile outside classes. If a change is made to the adaptee, we can take the appropriate measures from within the adapter without exposing its internal interface. 