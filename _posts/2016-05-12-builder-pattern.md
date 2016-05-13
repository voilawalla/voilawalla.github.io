---
layout: post
title: The Builder Pattern
date: 2016-05-12
---

The builder pattern was something that came up during my last project when I was making a Hangman application because I was creating a new instance of one class from a method in my other class, creating a hard dependency. This problem caused a violation of the Dependency Inversion Principle (DIP). 

Incidentally, the same problem came up on my Tic Tac Toe application, through essentially the same place in my View class. My View was wired to an IO class, and at some part of the set up, we were getting information from the user to instantiate another class, creating a new object. I would not be injecting the class into the View because I did not have the appropriate information to create the object. 

In my Hangman application, this was happening when we created a new instance of a Guess. The user would, from the UI, return a Guess as a string, and I would have to make that guess into a Guess object to return to the Game class.

```
public func receiveGuess() -> Guess {
    var currentGuess = io.getUserInput()
    while !(validator.hasOnlyLetters(guess)) || validator.isCarraigeReturnOrSpace(guess) {
        io.display("Invalid guess. Please enter a letter or word.")
        guess = io.getUserInput()
    }
    return Guess(currentGuess: currentGuess)
}
```

In my Tic Tac Toe game, the same thing was happening, with the View creating an object, but this time, I was creating a player, with specific information about the player passing from the console through the View into my SetUp class. Brace yourself for a quick switch from Swift to Python.

```
# View.py

  def get_player_name(self, order):
    return self.io.get_user_input('{0} player, what is your name?'.format(order))

# SetUp.py

  def assign_player_names(self, play_mode):
    players = [Player(self.view.get_player_name('First'), 'X')]
    if play_mode == '1':
      players.append(Player(self.view.get_player_name('Second'), 'O'))
    else:
      players.append(Player('Computer', 'O'))
    return players
```

The solution to this problem was to create a PlayerBuilder class. This would be passed into the Setup class when I created it. 

```
  player_builder = PlayerBuilder()
  tttsetUp = TTTSetup(view, player_builder)
```

Now, instead of my Setup class depending on my Player class, I have a PlayerBuilder class depending on the SetUp class. Dependency inverted. Now, in order to create the new player, I will call on my PlayerBuilder instance in the SetUp class to run a buildPlayer method. Because I have two types of players, a human player and a computer player, I am specifying which method I am calling to create the player. 

```
# SetUp.py

  def assign_player_names(self, play_mode):
    players = [self.player_builder.build_human_player(self.view.get_player_name('First'), 'X')]
    if play_mode == '1':
      players.append(self.player_builder.build_human_player(self.view.get_player_name('Second'), 'O'))
    else:
      players.append(self.player_builder.build_computer_player('Computer', 'O'))
    return players
```

Behind the scenes, when build the appropriate player type in the PlayerBuilder class.

```
# PlayerBuilder.py

  def build_human_player(self, name, marker):
    return HumanPlayer(name, marker, self.human_move_generator)

  def build_computer_player(self, name, marker):
    return ComputerPlayer(name, marker, self.computer_move_generator)
```


#### Conclusion

The builder pattern is a great way to eliminate hard dependencies in your classes and to abide by the dependency inversion principle. By removing that dependency, the class will become less coupled, making it easier to maintain and reuse.