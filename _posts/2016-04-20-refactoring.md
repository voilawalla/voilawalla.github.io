---
layout: post
title: Refactoring
date: 2016-04-20
---

If you look in the refrigerator at [8th Light](www.8thlight.com), you can usually tell when I have been there. The fridge will be stocked with all labels facing forward, all cans and bottles covered and aligned, just as the Marine Corps taught me. Everything has its place. Someone reaching into the fridge can quickly and easily find what they are looking for. This is how I want to leave my code. 

Writing good code takes both organizational prowess and pride. Clean code is written with the reader in mind. But it is not always easy to write perfect code the first time around. Even TDD code will require changes to the code as its complexity increases. 

In Robert C. Martin’s Book *Agile Software Development: Principles, Patterns and Practices*, he outlines three functions of software modules. The first function is that which is performed while executing, *“the reason for the module’s existence”*. Second, the module should be able to afford change. Finally, the code should communicate to its readers. Assuming that the first function is covered, and you are dealing with unbroken code, you can focus on improving the code in the other two areas: change and communication. 

### Refactoring to allow for change

There are many reasons for which software would require modification. Regardless of the reason, software should be designed in a way that facilitates these modifications without too much trouble to the person making the changes. 

> Extensible design is to accept that not everything can be designed in advance

You might have heard the software buzzword *extensibility*, which is the idea of designing software in a way that would take future growth into consideration. Refactoring code to make it more accessible to change will greatly reduce the amount of time required to make future changes. Refactoring for this goal involves creating additional interfaces, reducing coupling, and increased cohesion with abstractions. 

#### Interfaces

One way to allow for future changes in a module is to create interfaces that allow for shared functionality between classes. 

[Swift protocols](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html) are the same concept as an interface in Java. A protocol is an abstraction in that it is a skeleton, void of implementation. Consider this example:

```
protocol Aged {
    var age: Int { get }
    func ageOneCalendarYear()
}

class Person: Aged {
    var age = 31
    func ageOneCalendarYear() { 
    age = age += 1
}

class Dog: Aged {
    var age = 4
    func ageOneCalendarYear() { 
    age = age += 7
}
```

This simple example shows how you can limit exposure to the `age` property and `ageOneCalendarYear()` functions in both a `Person` and `Dog` class without exposing the whole class. A person should not need to know about how a dog ages, and vice versa, so the implementation is hidden by the protocol (interface). The protocol function calls are what is made visible to the outside world, rather than the logic in each class. 

This allows for future changes because we are creating a contract for all classes that will adopt the protocol. Any class that adopts the protocol `Aged` can dictate how the `ageOneCalendarYear()` function will behave. This means that we can create multiple object instances and decide, based on the object created, how that object will age. The object in turn is agreeing to provide the functions and attributes as noted in the protocol. 
 
#### Reducing Coupling

A class that is *coupled* depends on another class for its implementation, meaning that at least one of the classes knows about the other. When we talk about reducing coupling *(decoupling)*, we are referring to the minimization of these interdependencies. 

The reason that coupled code is bad for extensibility is that when two classes are heavily coupled, when a change is made to one class, there is a strong probability that there will be negative effects to the second class. 

For example, say that you are comparing two houses. We don’t want to know too much about the difference between two houses, but we still can maintain certain truths about all houses. All houses, for instance, have roofs of some kind. All houses have doors. We don’t want to know too much about the construction or size of the door, just that the door exists. If one class relies on a house with a specific attribute like a shingled roof, if that roof is changed out for a tin roof, but the reference is to a shingled roof, something is going to break. 

#### Increased Cohesion

Creating classes that are highly cohesive is another way to assist in future modification. A class that is highly cohesive has one clear duty where all of its functions are strongly related. A system that is highly cohesive contains readable code that is reusable, where complexity is well managed. 

The reason that a highly cohesive system aids in maintainability and future modification is because code is purposefully organized, so changes occurring in one module should not have much of an effect on other modules. Cohesion and coupling usually have an inverse relationship, so when code is highly cohesive, it is usually loosely coupled as well. 

### Refactoring for readability

> Readable code communicates

Saying that code communicates is saying that a reader not familiar with the code base can figure out what is going on. Readable code is clean code. It has meaningful function and variable names. It follows conventions. It is consistent. 

Refactoring for readability can start very small with changing variable and method names to express intent. Larger methods can be refactored into smaller methods that call each other. Nested logic can be pulled out into new methods to better communicate the logic. There are a ton of small things that can go into making code more readable. 

### Conclusion

Having code that is easy to change is a great asset. Code that has loose coupling, high cohesion, utilizes interfaces and abstractions, helps to ease the breakage when code does change. Refactoring to aid in change, in addition to refactoring to increase code’s readability are both ways in which the lifespan of a module can be extended. You want your code to be easily adaptable to change so that it can live past changing system requirements. 
