---
layout: post
title: TDD - Driving the Application Design
date: 2016-04-15
---

> The act of writing a unit test is more an act of design than of verification. It is also more of an act of documentation than verification. The act of writing a unit test closes a remarkable number of feedback loops, the least of which is the one pertaining to verification of function.

This note opens Robert C. Martin’s *Agile Software Development: Principles, Patterns and Practices*, my current daily reader. It particularly stuck with me because I was not thinking about TDD from a design standpoint, but rather solely from a verification standpoint.

The apprenticeship that I am a part of stresses TDD as a top priority, and both of my mentors are great examples for this practice. This week I paired with one of my mentors on a simple Coffee Shop application. 

### Requirements Gathering

We started the application with a broad definition of roles and requirements. Who are the players and how do they interact? In our example, to simplify things, we were omitting the customer as a party, so in the most simplistic sense, we are dealing with a Barista and how she interacts with a drink. What does a barista need to be able to do? What attributes define a drink? We started off with these requirements:

```
Barista
  - Take Orders
    - Receive Order
    - Process the Order
      - translate order for processing
      - performing transaction
    - Delegate Drink Making
  - Deliver Order

Drinks
  - Types
  - Sizes
  - Sweeteners
  - Additions
```

Our barista will be *taking an order*. The order will be *received* and *processed*, which means that the order will have to be translated, or parsed, for information required to create the order. The *perform transaction* requirement could speak to an eventual extension with money or between the barista and a customer. Also part of taking the order would be *delegating* the drink making, deciding how the drink will be made, with what equipment, and requiring what connections.

The barista will be handling an order. In the smallest case, we are talking about a single drink. All drinks will have a *type* (coffee, tea, cappuccino), a *size* (small, medium, large), whether they want sweetener (yes or no), and whether or not they want extras (yes or no, for now). 

### Writing the tests

So now that we have the general requirements in place, we can write our first unit test to guide the logic. We looked at the barista and her responsibilities. A barista will take an order, so we know that somewhere along the line we will have a barista class, and that class will have a take order method. Thinking about the outcome of taking an order, we write our first test:

```
expect(makesDrinks.makeDrinkWasCalledWith).to.equal(drinkOrder)
```

Ok, I have to admit that here, at the very first line of code, I was a little lost as to how my mentor came up with this test. Let’s break this down a bit:

The assertion is that something is receiving a drink order. The something in this case is `makesDrinks`. Why are we delegating this to a protocol (I assume by the name) rather than as an action of the barista herself? This action of making drinks is more responsibility than the Barista should be responsible for. Creating the protocol extends functionality of the barista class, which also gives us the ability to mock the act of making drinks. 

I understand, by the syntax, that `makeDrinkWasCalledWith` needs to have a value. At some point, there is an assignment to this variable, and what is being assigned is `drinkOrder`. We can assume that this behavior will occur in a function called `makeDrink` because the variable is telling us so. We can also assume that this variable lives in the mock.

Also, what is a `drinkOrder`? What composes a `drinkOrder`? We already know from our requirements that a Drink has attributes like size and type. We can assume that a drink order will be a drink with the attributes assigned.

So now that we have all of these things in mind, we have a basic idea of the structure of the application so far. The test is driving the development, true, but also the design. We have decided that we need two classes (`Barista`, `MockMakesDrinks`), a protocol (‘MakesDrinks’), and functions for each (`takeOrder()`, `makeDrink`). This is the test helping us design the architecture. 

Step 2 for me personally is getting to the point where I can write tests as meaningful as these. 
