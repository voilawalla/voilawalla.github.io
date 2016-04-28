---
layout: post
title: The Interface Segregation Principle
date: 2016-04-28
---

We have reached the **I** in **S.O.L.I.D**: *interface segregation*. Let’s break this down. 

The segregation part of interface segregation is pretty simple to understand. We want our interfaces to work independently of other parts of the system. I can assume from what I have read so far of Uncle Bob’s *Clean Code* and *Agile Software Design - Principles, Patterns and Practices*, that this also means that the interfaces will be free of dependencies. 

Then we have an interface. You can think of an interface as the part of something with which a user interacts. For instance, the physical interfaces you have with your computer include your mouse, your keyboard, and the power button. With your cell phone (mini-computer), you interact with the different buttons (power, volume), as well as the touch screen, speakers and headphone jack. You can interact with your phone by pressing the buttons to control the volume, or by plugging in external speakers to jam out to some epic 90’s alternative rock.

The Interface Segregation Principle is a means to keep polluted data and functionality from your interfaces (fat interfaces). Interfaces should only include the data that is necessary for the client to interact. We would not want to have an extra set of Korean letter buttons on our keyboard if we never use them. There should separate keyboards for those who want to type in Korean versus those who want to type in English. 

Also, it would be very wasteful to add functionality to the interface that does not do anything to change the object to which it is paired. Generally, our cell phones should not control our vacuum cleaner or our treadmill. These devices should have their own specialized interfaces. Being able to control a treadmill’s speed from your phone, while this may seem practical, serves no benefit to the phone itself. 

> Clients should not be forced to implement interfaces they don't use

When you have an interface that has low cohesion, it is difficult to reuse in other parts of the code. As with classes, interfaces that have unrelated methods should be split. Say you have the following swift protocol for bookkeeping.

```
protocol KeepsBooks {
    func calculateBalance()
    func calculateMonthToDateBalance()
    func addCredit()
    func addDebit()
}
```

Everything is accounting-centric. These are all tasks that have to do with bookkeeping. But what if we wanted a `BalancePrinter` of some sort to adopt this protocol? Our balance printer would be forced to use the `addCredit()` and `addDebit()` functions, even if they are void of logic. This does not make sense. A more sensible approach would be to split the `KeepsBooks` protocol into two separate protocols that handle the functions separately. 

The lesson here is that clean, organized code does not stop with small methods and classes. Our interfaces should also be focused so that we can reuse them without needing to implement unnecessary functionality. 