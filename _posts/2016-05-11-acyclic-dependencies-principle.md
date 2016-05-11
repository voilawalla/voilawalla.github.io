---
layout: post
title: The Acyclic Dependencies Principle
date: 2016-05-11
---

In software development, in addition to following good organizational practices at the class level, it is also important to consider how our packages are linked. When a package relies on another package for something, we say that there is a dependency between the packages. This means that the packages have to communicate with each other. 

Every package will have at least one dependency because this is how the system is connected. The trick is to try to keep all of the dependencies *acyclic*, meaning that if package A depends on package B, and package B depends on package C, we don’t want package C to also depend on package A. 

![A-B-C Cyclic Dependency](http://www.zfdaily.com/wp-content/uploads/2012/03/CircularDependencyCED.png)

This idea comes back to the goal of maintenance. If your initial design includes circular dependencies, it becomes difficult to implement a change within one package without potentially harming the rest of the packages within the cycle. Changing one package requires all other packages with dependency links to confirm compatibility, and this is true for every single package within the chain.

Let’s take for instance an application that I built a couple of weeks ago for a hangman game. All of the logic for the game existed within the Application Package. I had a second package that was a Dictionary module which contained an array of words as well as logic to get and return a random word. 

The issue came when I was trying to establish a class to set up the game before the main game loop was run. As part of the set-up, I had to decide whether the word used for hangman was one that was given randomly from the Dictionary, or one that was input by a second player.

```
public func assignGameWord() -> Word {
  let options = ["1 - Random", "2 - Select"]
  let type = getWordSelectionType(options)
  if type == 1 {
    return wordBuilder.buildWord(wordListManager.getRandomWord())
  } else { 
    view.promptReceiveWord()
    return wordBuilder.buildWord(view.receiveWord())
  }
}
```

The problem was that my Application package in which the GameSetUp class existed, had a dependendency on the Dictionary package, when it should have been the other way around. The circular dependency arose when in addition to the Application depending on the Dictionary, the Dictionary would have to depend on the Application in the event that the user would choose to select a word. This was how my `Package.swift` file looked.

```
Target(name: "Application", dependencies: ["Dictionary"]),
Target(name: "Dictionary", dependencies: ["Application"])
```

In order to break these apart, I ended up creating a third package to connect the two. This inverted the dependency and instead of the two packaged depending on each other, the new SetUp package depended on both of these classes. 

```
Target(name: "Application", dependencies: ["Dictionary"]),
Target(name: "Dictionary", dependencies: ["Application"]),
Target(name: "SetUp", dependencies: ["Application", "WordList"])
```

In conclusion, the way that dependencies are handled should flow in one direction and not create cycles between packages. Existing cycles can be handled by using dependency inversion or creating new packages to clean up the design. 
