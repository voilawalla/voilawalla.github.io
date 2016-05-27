---
layout: post
title: The Law of Demeter
date: 2016-05-26
---

The idea behind the Law of Demeter is to reduce coupling between classes. The law states that a software unit, like a method, should only communicate with units that are closely related. That means that a method should only know about the class in which it belongs, the method’s arguments, any object created within that method, or the class’s direct component objects. 

Method calls should not be made on an object that was returned by another method call. This is commonly referred to as the *One Dot Rule*, because referencing a third depth requires a second dot. For instance, if I am doing a phone number look up in a phone book, I would not try to access the city through the number:

```
phoneBook.getNumber.lookupCity()
```

or

```
phoneNumber = phoneBook.getNumber()
phoneNumber.lookupCity()
```

Both of these examples violate the Law of Demeter because the phoneBook is not directly associated with the city, and therefore should not have access to that information. This is creating a structural coupling. Beyond that, we don’t necessarily want our units to know more than what they need to know. 

One way that we can fix this particular problem is to encapsulate the method to return a phone number with the city. We could create an adapter or wrapper to manage this information, and that is what the method could interact with, only one step away. 

This is actually a strategy that I used when communicating with my console for input and output operations. My IO class only communicates with my View class. My view is essentially a view-controller, acting as an intermediary between the user and the system. In my tic-tac-toe game, I have an IO method that wraps the system’s print function.

```
def display(self, output):
    print('{0}'.format(output))
```
My view would contain action specific methods that call the IO display method. Since the IO only speaks with the View, if I wanted to print something from, say, my Game class, I would not go through my view to do so, like `view.io.print(‘hello world)`. Instead, my view is wrapping the IO function to hide the method from the game. This would look something like this in my view class:

```
def sayHello():
    self.io.display(‘Hello World’)
```

Then I would call `view.sayHello()` to display to the console. 

The positive to maintaining the Law of Demeter is that loosely coupled code is easier to maintain and reuse. I am also only allowing my classes to use what they have, hiding information to reduce complexity. 