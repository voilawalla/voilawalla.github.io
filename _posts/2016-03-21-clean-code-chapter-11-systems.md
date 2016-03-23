---
layout: post
title: "Clean Code: Chapter 11 - Systems"
date: 2016-03-21
---

Chapter 11 covers the higher level system design. One of the concepts that is discussed in this chapter is dependency injection, so I will go into my learning example on an application I am currently working on in Swift. 

The application is a hangman (Snowman) game that displays letter blanks to a player and the player guesses the letters until either they guess the word, or they run out of guesses.

In Swift, the application’s entry point and top-level code is contained in a file called `main.swift`. I also had another file called `Game.swift` where my game logic, and another called `Words.swift` where I kept an array of words to use for the game. I was using swift package manager, so my document tree was as follows: 

```
├── Package.swift
├── README.md
└── Sources
    ├── Application
    │   └── main.swift
    ├── Dictionary
    │   ├── DictionaryManager.swift
    │   └── Words.swift
    └── Game
        └── Game.swift
```

My game needed to access the array in my dictionary file, so my first attempt (without dependency injection) looked like this: 

*main.swift*

```
import Game

let game = Game()
```

*Words.swift*

```
public let words = [“some”, “words”, “that”, “were”, “in”, “an”, “array”]
```

*DictionaryManager.swift*

```
public class DictionaryManager {
	let gameWords = words

	public init() {
	}

	public func getRandomWord() -> String {
		// logic to get a random word
	}
}
```


*Game.swift*

```
import Dictionary

public class Game {
	let dictionaryManager = DictionaryManager()

	public init() {
	}
}
```

By creating the `dictionaryManager` variable in my `Game.swift` file that created a reference to the `DictionaryManager` class, I was able to access the array in my `Words.swift` file. The problem with this, though, is that now my `Game` class knows everything about all of the other classes. How could this improve?

One step I could take would be to inject an instance of `DictionaryManager` into my `Game` instance when I create it. That would change the `main.swift` and `Game.swift` files as such:

*main.swift*

```
import Game
import Dictionary

let dictionaryManager = DictionaryManager()
let game = Game(dictionaryManager: DictionaryManager)
```

*Game.swift*

```
import Dictionary

public class Game {
	var dictionaryManager: DictionaryManager()

	public init(dictionaryManager: DictionaryManager) {
		self.dictionaryManager = dictionaryManager
	}
}
```

This gives me access to the instance of the `DictionaryManager` class instead of the class itself. How can this be improved?

Well, I really only needed one word per game from the dictionary. I did not actually need to access the whole array of words or even the whole `DictionaryManager` class. My final iteration allowed me to get a random word and then inject that word into the instance of the `Game` class when it is created. 

*main.swift*

```
import Game
import Dictionary

let dictionaryManager = DictionaryManager() 
let word = dictionaryManager.getRandomWord()

let game = Game(word: word)
```

*Game.swift*

```
public class Game {
	var word: String

	public init(word: String) {
		self.word = word
	}
}
```

Now my game has a word. In a single game I will never need more than one word, nor will that word change in any way, so this perfectly satisfies the requirements of my `Game` class. I don’t have to import my Dictionary. I don’t have to access my `DictionaryManager` class. 

In conclusion, try to evaluate what your classes need to access and instead of giving full access to other classes, you can probably give access to an instance of a class. Even farther, if you only need a piece of a class, try to pull that piece out to give to the instance of the class that needs it. 


