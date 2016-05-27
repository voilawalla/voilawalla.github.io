---
layout: post
title: A Case for Mocks
date: 2016-05-27
---

Chapter 3 of what will henceforth be known as GOOS (*Growing Object-Oriented Software, Guided by Tests*), presents a brief introduction into the testing methods to be presented in the book. One topic that was introduced was using a Java mock library called JMock. While I have not yet written a line of code in Java, I am certain it will appear soon in my apprenticeship, so I will be exploring JMock as a language infant. 

When I was first trying to figure out how to mock in Python, I Googled “Python mock” and was presented with pages of references to Python’s unittest mock framework called, intuitively, *mock*. After querying my mentors about *unittest.mock*, they urged me to attempt to write my mocks manually. This meant extending an abstract base class with both a mock object and a real object, creating the mock object for the tests and the real object for the regular code. 

I imagine that the motivation for this was to make sure I understand what is happening when a mock is standing in for a regular object. In Swift, the concept of an abstract base class is achieved through a protocol, which again creates a contract and requires all classes extending the protocol to handle its variables and methods as dictated in the protocol. For example, if my protocol requires the following, any class extending this protocol will have to follow this contract.

```
public func receiveSelectionType(options: [String]) -> Int
```

There will have to be a method called `receiveSelectionType()` which has a parameter called `options` with an argument type of an array of strings, and the method will have to return an integer. Our real object will actually make the function work, and the mock will have some stand in operations so that we are not actually communicating back and forth with a real user from the console. Easy enough. 

The reason we mock in the first place is to isolate our tests. As I mentioned just a second ago, our mock in the case of a view method communicating with the console prevents us from actually having to deal with the system’s IO functionality. We are not testing how the system collects and disseminates data, only that the data was received, and not somehow manipulated in the process. The view test is isolated from the IO because we are using a mock IO to feed it what it needs. 

Writing mocks as I have been doing, to mock dependencies, can expose some flaws in your code. For one, it brings those dependencies front and center. I have been learning to avoid dependencies as much as possible because they increase coupling between classes, which makes code harder to maintain, reuse and test. 

Also, if you are creating a mock object for every single dependency, you have to make sure that the mock is in fact acting in a manner consistent with how the real class would be acting. Mocks make sense when dealing with methods that return simple True or False values, like checking if an array contains a value, but sometimes, at least to me, a mock feels like *cheating*, or at the very least, not capturing the value of the test. 

An example of this is from my tic tac toe game. I am using a [negamax](https://en.wikipedia.org/wiki/Negamax) algorithm for my AI computer player to ensure that it always chooses the best move on the board. In the method, I have to call on board methods to check if there is a winner (True or False), return the winner’s marker (‘X’ or ‘O’), return the indices of all open spaces (array of integers representing index positions), and place a piece (takes marker and location as arguments). In this one method I am referencing four unique board methods, each returning values of different types or changing the board’s state. 

I started to use a mock board in my tests, but I eventually decided that mocking the board would be just as complicated as using the board object itself. I realize that this is not the correct decision, because this means that my AI tests are not isolated and I am essentially testing the board functionality in my AI tests. 

One thing I am going to explore over the next few months is what additional benefit I can get from using a mock framework over creating objects. The first obvious benefit to frameworks is not having to create additional objects every time you want to replicate the behavior of an object with different outcomes. Beyond that, I have to ask if the mocking should even be my responsibility as a developer. If there are tools that build mocks automatically and with added features to handle exceptions, why fight innovation?