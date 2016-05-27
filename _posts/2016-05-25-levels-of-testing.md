---
layout: post
title: Levels of Testing
date: 2016-05-25
---

Yesterday we apprentices spent time with Mike Jansen of 8th Light’s Chicago office talking about testing, and different levels of the so called “testing pyramid”. I began reading *Growing Object-Oriented Software, Guided by Tests* by Steve Freeman and Nat Pryce, and the concept was raised again in the first chapter. 

Freeman and Pryce talk about unit tests and acceptance tests, briefly glossing over the fact that acceptance tests live somewhere in between. Mike’s pyramid looks like it was [borrowed from Uncle Bob](https://codingjourneyman.com/tag/uncle-bob/page/2/).

![testing pyramid](https://jfiaffe.files.wordpress.com/2014/09/tests-pyramid.png) 

#### Unit tests

The simplest ground level test is the unit test, which will check that the code is doing what we expect it to do at the very lowest level. For instance, in my tic-tac-toe game that I am building as a console application, I have a class called ttt_board which handles board functionality. I have a method called place piece that I created to handle an input value and change the value of my active board. 

My unit test, using Python’s unittest library, will help me design the code. Before I even write a line of production code, I am going to write my test with the expectations above guiding the test creation.

```
def test_place_piece(self):
    marker = 'X'
    space = 2
    self.board.place_piece(marker, space)
    self.assertEqual(self.board.active_board[1], marker)
```

The first thing I would do is my assertion statement. I have a method that is placing a piece, so I am expecting to take as an input the piece that I want to place, and where I want to place it. Placing the piece does not return anything or print anything, but it does change the state of the board. I am checking in my assertion that the board, at a specific index, contains the piece.

The great thing about unit tests is that I can specify the inputs without having to interact with my other classes. Normally in my game I would need to get user input to figure out where the piece should go. I would have to access a player to know what piece is associated with that player. That means that three classes, the View, IO, and Player classes are potentially involved in this operation. With a unit test, since I am not testing the interaction between these classes for this goal, but rather the action of this single test, I can specify the input locally in the test. It does not matter where the input comes from for the unit test, as long as it is in the required format that the normal method would be receiving it. 

For example, my marker is a string. My marker will only ever be a string because it is assigned to the player as a string, so I do not have to worry about testing for non-string markers. The space, when it comes from the console, will be in the form of a string, but before it even gets to the placePiece() method, it will be converted to an integer. Therefor, again, I don’t have to worry about testing for other types. 

From this test, I can design my code, after, of course, I have ran the test and seen it fail. The ensuing code looks like this:

```
def place_piece(self, marker, space):
    self.active_board[space-1] = (str(marker))
```

#### Component Tests

A *Component* in the scope of component testing can be any grouping of cohesive functions. This could be something like a class, a module, or even a more physical representation like a specific web page. This blog is part of a larger website where each single blog post can be considered a component, as could the [blog index](http://nicolecarpenter.github.io/blog/index.html) or the [about me](http://nicolecarpenter.github.io/blog/index.html). 

A component should be isolated, like a unit test. If code is loosely coupled, which is the goal, then components should be easy to separate. 

In the scope of my tic tac toe game, one component is a setup class that handles receiving all of the information necessary to determine how the game is played before the game actually starts. The component test will check to see that everything is handled correctly, from determining the play mode (player vs player or player vs computer), to getting the player names, and determining in what order they will play. A passing component test will return all of the necessary inputs for the game, in the correct form. 

#### Integration Tests

Remember a couple of paragraphs ago where I mentioned that unit tests can use local variables to stand in for inputs from other sources? In integration testing, we would actually incorporate those additional integration steps to make sure that everything is wired up correctly. 

We would not want to be pulling data from a database and realize that our values do not line up properly with their headers in the program. For instance, if we are getting an address from a CSV, and the document has a second line for street address but the table we are loading it into in our program does not, we are likely to mess something up. This is also where we would check if we are dealing with a third party API, that the communication is working as expected and the data is being sent and received in the correct form. Integration testing tests for interface defects.

#### System Tests

System Tests are the end-to-end tests that Freeman and Pryce refer to in chapter 1. System tests are exhaustive, time consuming and costly. They are high level tests that not only check that components are interacting correctly, but also that the user interface is behaving as designed. It tests that all system requirements have been met to specification.

This is a little more difficult with a command line application like my tic tac toe. To test at this level, I would essentially build a run through test, or several, really, testing a game from start to finish, including any set up and tear down. Because the game requires communication with the user through the console, I would have to write scripts to feed input to the application. 

#### Manual Tests

The most expensive and time consuming tests are manual tests because they involve humans actually using the application as an end user would. They follow guidelines for testing to make sure that every edge case is explored.

For example, in my tic-tac-toe, I am performing a manual test when I am running `python ttt.py` and operating the game. I can check for unacceptable inputs, or really any way that I think would break the system. Because this is a terminal application, there is less to test, but a web application, for instance, would have to check browser compatibility, browser versions, etc. Part of manual testing is also making sure that the application appearance is consistent with the design. 