---
layout: post
title: "What's the deal with state?"
date: 2016-03-30
---

Prior to a couple of weeks ago, my deep understanding of state was reserved to the subject of matter: is something a solid, a liquid or a gas. In my pull request notes of my SnowMan application, however, my mentor wants me to consider another state: the state of my program's variables. Why was I holding the state variables? It was a great question that I could answer shallowly with context clues and general knowledge, but let’s get into that a little deeper. 

The state of something in computer science terms speaks to the contents of data stored in memory at any point in the program’s execution. The data on the program’s end are the values stored within its variables. 

Let’s walk through one of the “state” comments from my pull request and the code that prompted it:

> Why does this state need to exist on the Game, and why does it need to be mutated?

``` swift
public class Game {
	var word: String
	var guessManager: GuessManager
	var view: View
	var guess: String

	public init(word: String, guessManager: GuessManager, view: View) {
		self.word = word
		self.guessManager = guessManager
		self.view = View
		guess = “” 	// PROBLEM
	}
}
```

There are three issues going on here. First, I am holding onto the state of the guess. Second, I am holding onto the state of the guess in the `Game` class rather than the `GuessManager` class. Third, that the state of the guess is mutable.

The reason that I thought that I needed a state was because I was changing the value of the guess during the game, and then using that updated value in multiple different methods. Consider the following functions from my `Game` class:

``` swift 
public func playGame() {
	while (!isGameOver()) {
		playerTurn()
	}
	displayResults()
}

public func isGameOver() {
	return guessManager.hasNoGuessesRemaining() || isWinner(guess)
}

public func isWinner() -> Bool {
	let letters = separateLetters()
	return guessManager.determineUnguessedLetters(letters).isEmpty || guessManager.correctlyGuessedFullWord(word, guess: guess)

}

private func playerTurn() {		
	guess = guessManager.assignGuess(view)
		
	if (guessManager.isGuessingFullWord(guess)) {
		guessManager.appendGuess(word, guess: "#")
	} else {
		guessManager.appendGuess(word, guess: guess)
	}

	isGameOver()
}
```
Here is how my walkthrough of the game and why I thought I needed an initial state in the `Game` class

1- My `playGame()` loop plays until the game is over. 

2- In order to determine whether or not the game is over, one consideration is whether or not there is a winner. 

3- In order to check if there is a winner, one thing I am checking is whether the current guess would correctly guess the full word. My thought process for having an initial state of guess as an empty string is that there needs to be a current guess, even before the player has input his first guess. The `playGame()` loop is going to call methods that will evaluate a guess, so even if there has not been a guess yet, it will need something to evaluate.
 
4- If the game is not over, I am assigning a new guess.

5 - The guess is evaluated. I check again whether the game is over. 

As I mentioned in the third item, if my determining whether or not the game was over involved me evaluating a guess. I needed a guess even if a guess had not been made. Obviously there had to be a better way.

The better way was re-evaluating how I determined my game was over. Zack made a suggestion that I use a boolean variable to track this, and so my new game class started like this:

``` swift
public class Game {
	var word: String
	let guessManager: GuessManager
	var view: Viewable
	public var gameOver: Bool

	public init(word: String, guessManager: GuessManager, view: Viewable) {
		self.word = word
		self.guessManager = guessManager
		self.view = view
		gameOver = false
	}

	public func playGame() {
		while (!gameOver) {
			playerTurn()
		}
		displayResults()
	}
}
```

Now, instead of relying on a function that called another function that did some calculations and evaluations, I am simply relying on a single boolean variable, initially set to false, whose value will change once the game over conditions have been met. 

While I am no longer calling my `isGameOver()` method as part of my game loop, I do see utility in keeping the method to evaluate whether or not the game is over after a player turn has been made, and to change the value of my `gameOver` variable if indeed the game over conditions have been met. Here is the new `isGameOver()` method:

``` swift
public func isGameOver(guess: String) {
	gameOver = guessManager.hasNoGuessesRemaining() || isWinner(guess)
}
```

I can pass the guess to this function from where I will be calling it, which is within the `playerTurn()` private method below. The guess that is being passed in will be the guess that the player is being prompted for. That guess is then passed into the `isWinner()` function to decide whether or not there is a winner.

``` swift
public func isWinner(guess: String) -> Bool {
	let letters = separateLetters()
	guessManager.determineUnguessedLetters(letters).isEmpty || guessManager.correctlyGuessedFullWord(word, guess: guess)
}
```

Let’s take a look at the new `playerTurn()` function. 

``` swift
private func playerTurn() {		
	let guess = view.receiveGuess()
	
	if (guessManager.isGuessingFullWord(guess)) {
		guessManager.appendWordPlaceholder(word, guess: guess)
	} else {
		guessManager.appendGuess(word, guess: guess)
	}

	isGameOver(guess)
}
```
Here is where we are assigning the value of guess, but instead of holding its state in `Game`, we are passing the guess around only when and where we need it. Once we have evaluated the guess, if it does not tip to end the game, then a new player turn is taken with a new guess to receive and evaluate. 

I do want to admit that I did also see a need to keep the state of the guess with the `GuessManager` class. But as I came to realize working through this `Game` class, that was not necessary either because anywhere I needed the guess, I could pass it in as an argument to the method where I needed. Everything came back to this one guess that I was creating and recreating within my `playerTurn()` function, so there was no need to hold the state.

In conclusion, try to follow the rule that your classes should not be creating their own instance variable. If you are finding that you want a variable to persist, figure out if there is some way you could inject the value of the variable as a dependency instead. 
