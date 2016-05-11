---
layout: post
title: Designing Through Tests
date: 2016-05-10
---

I would like to pause momentarily to pat myself on the back for how steadfast I have been up to this point in my commitment to test driven development for my [Tic Tac Toe](https://github.com/NicoleCarpenter/tic-tac-toe-python) application. In my previous application, a hangman console application in Swift, I was supposed to be test driving the application, but really that just turned into me “spiking” functionality, refactoring, and testing the working code. That is far from the Red-Green-Refactor approach I am supposed to follow. Sure, I tested everything, but I lost the value that true test driven development provides.

![Red Green Refactor](http://marcabraham.files.wordpress.com/2012/04/06_red_green_refactor.jpg)

#### Rethinking heavy up front design

TDD stands for **Test Driven Development* but I am coming to realize that that last **D** can also apply to **Design**. This is a realization I came to while reading chapter 19 of Uncle Bob’s *Agile Software Development - Principles, Patterns and Practices*, which is where he walks through the process of creating a payroll system. 

One thing of note is his deliberate lack of attention paid to UML design. Had this chapter been my first of Martin’s writing, I would have been surprised about this. It would have been completely counterintuitive for me to want to jump directly into coding without having a concrete plan. I would have spent a significant amount of time and consideration as to how the application would be laid out, what all connected to what, how everything related. I would sketch and revise, sketch and revise until I decided on my interpretation of the perfect system. 

Martin suggests that this way of thinking is wrong, and for good reason. Trying to create a concrete up front design is a waste of time because systems change. It is very unlikely that an initial design stays the same after programmers attempt to implement it because there is always going to be better or different ways to interpret the requirements. 

#### Test Driven Design

Test Driven Development is a tool for approaching design from a different perspective. You can design your code based on the cases presented in the tests. From your test you can decide what requirements that you need to meet, what additional data is needed, and whether the requirements require you to communicate with another part of the system. You can decide if something is too complicated, or a violation of one of our beloved solid principles, by seeing what dependencies your tests require. 

I mentioned that I am working on a Tic Tac Toe application. Let’s break down a specific test case for selecting a spot for a move. 

The first thing that I thought about before even writing code was the relationship between the player and the move. Part of the design is that I have two types of players, a computer and a human player. A human player will select a space differently than a computer player. Let’s say for now that we are just considering a human player. 

In order for a (human) player to make a move, there are a few steps that have to be made.

The player will input a move and the input will be sent back to be processed
The move will be validated
An invalid move will be rejected by displaying another prompt and receiving another input to be validated. This will be repeated until a valid move is given
A valid move will be returned and processed (display, save to board array)

We have all of these steps just for making a move, not even including the logic that makes the steps work. Let’s try to break this down into a test.

```python
  def test_get_player_move(self):
    move = io.get_user_input()’
    self.assertEquals(self.view.get_player_move(), move)
```

This is the basis of what we need to test in our *TestView.py* file. We are saying if the move that the person makes is ‘2’, then we are expecting a method called `get_player_move()` to return that value. But we have a few steps in between that we need to address. 

The first thing that we have to consider is where is this move coming from? Sure, in the application we will be talking to a real person through the console, but for the tests, we don’t actually want to deal with the console. This is where a MockIO class will come in handy. Instead of passing in an instance of the real IO that actually talks to the console, our View class will be initialized with a MockIO that does what we tell it to do. We can also create a stub variable to stand in for what would have been an input coming from the console. 

I am initializing a variable flag for my `get_user_input()` method that will change from False to True when the method is called. I am calling the method in the test, so when I run the test, I can check that the value of `get_user_input_called` is true. I can now also return the value that I am stubbing to represent a value from the user. 

```python
def test_get_player_move(self):
    self.io.stubbed_user_input = '2'
    self.assertEquals(self.view.get_player_move(), '2')
    self.assertEquals(self.io.get_user_input_called, True)
```


Once I have my move, I have to validate it. This brings up a fun challenge. How can I test the view validating the move? I have to be able to stub valid and invalid moves, but if I stub an invalid move, how would the program handle that. 

In our bullets above, we mentioned that an invalid move would not get processed, and that the user would be asked for another move. This would continue *until* a valid move. The until suggests that we are in a loop of some sort. This creates a problem because our stubbed value is not going to change while we are in the loop, so we will have created an infinite loop. 

The solution that I came up with before was to allow the MockIO to accept an array of values, first invalid and then valid. Then I had a counter to increment the index of the array to evaluate a different value until eventually it met a valid value. This is a bad decision for two reasons: first, the mock has too much logic, and second, we are just bending the code to solve the wrong problem. 

A better solution is to have an outside Validator. When the View is evaluating whether or not an input is valid, we are violating the single responsibility principle because we are asking our View to do to much. Now I can have the validator test for valid or invalid input, and I can just worry about what my `get_player_move()` method does with a valid move. 

I will still be calling my validator from this method so I have to consider what information the validator will need in order for it to return a valid move back.

It will check if the move is within the range of available spaces. If I have a 3 x 3 board with 9 spaces, I know that I can only select moves from 1 to 9
It checks if the space is available. I cannot select a space that is already taken.
It checks if the input is a valid number. Letters, symbols, or empty strings will be rejected. 

From these requirements I conclude that my validator needs to know the board size to determine the range of spaces and it needs to know the current picture of the board to know what spaces are taken. I would obviously also pass in the move to be checked against these conditions. 

In the tests, I make up the parameters in the test rather than relying on concrete classes. I am dictating the board size and active board, because the test is about the View function, not how it relates to other classes. 

```python
def test_get_player_move(self):
    self.io.stubbed_user_input = '2'
    active_board = ['  '] * 9
    board_size = 9
    self.assertEquals(self.view.get_player_move(board_size, active_board), '2')
    self.assertEquals(self.io.get_user_input_called, True)
```

Finally, I am ready to write code. From this test I have decided for my design that I will interact with a MockIO, I will need an abstraction to connect my IO to my MockIO, that my MockIO will accept a stubbed user input and return whether the method to get user input was called, that I will have a Validator class to validate the input, and that the validator will need to know about the board size and the current state of the board. All of this comes from testing one function of the view. 

```python
  def get_player_move(self, board_size, active_board):
    move = self.io.get_user_input('Select a position for your move: ')
    while not self.move_validator.is_valid(move, board_size, active_board):
      self.io.display('Invalid move')
      move = self.io.get_user_input('Select an open space from 1 to {0}: '.format(board_size))
    return move
```

#### Conclusion

It is not always necessary or prudent to spend a lot of time writing a detailed plan before you code. Typically the code will not end up in the same shape for which it was designed. Testing can be a way to approach the design of an application, as putting thought into crafting a meaningful test will often bring up system architecture requirements. 
