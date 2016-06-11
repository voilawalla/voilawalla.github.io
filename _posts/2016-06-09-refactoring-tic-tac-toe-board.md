---
layout: post
title: Refactoring Tic Tac Toe Board
date: 2016-06-09
---

During my tic tac toe application review, two points were brought to my attention regarding my handling of the tic tac toe board. I had taken the appropriate first step in designing the tic tac toe board to be an extension of an abstract board object, but how I was using that abstraction, and for what my tic tac toe board was responsible, fell a little short in the implementation.


#### Abstract Board

I created an abstract board from which I would derive my tic tac toe board. Implementing an abstract class in a language like Python is different from doing so in a language like Swift or Java because the concept of an interface in those statically typed languages is more concrete. In Python, the Abstract Base Class (abc) module indeed allows you to create abstract classes, but the “contract” is not as strict because type checking is deferred to run time. 

The original idea of this board was that there would be actions for which I could conceive all boards would require. I decided that all boards would need to be able to return itself in string form. I also decided that because regardless of whether you are playing tic tac toe, checkers, or Life, there will always be a need to take a specific player and move it to a specific location. 


```python
import abc

class Board(object):

  def __init__(self):
    __metaclass__ = abc.ABCMeta

  @abc.abstractmethod
  def format_board_to_string(self, board):
    pass

  @abc.abstractmethod
  def place_piece(self, marker, space):
    pass
```

Two problems were pointed out with this implementation. The first problem is that I am saying that the board or any extension thereof should handle presentation concerns. I will get to that soon. The second problem was that my board abstraction was a little flat, very close to useless. 

My mentor suggested that my board methods to place a piece and find open spaces were generic enough that the functionality could be handled in the board abstraction. This would actually work as an abstraction rather than as strict subclassing because with Python’s abc module, as specified in the module [documentation](https://docs.python.org/2/library/abc.html), abstract methods can in fact be implemented. This would be accomplished through the use of `super()`.


```python
import abc

class Board(object):

  def __init__(self):
    __metaclass__ = abc.ABCMeta

  @abc.abstractmethod
  def place_piece(self, marker, space):
    self.active_board[space-1] = marker

  @abc.abstractmethod
  def find_open_spaces(self, board):
    return [i for i, x in enumerate(board) if x == '  ']
```

So, knowing this, the board class that I created is able to specify the implementation of these two methods. This is how I would implement the methods.


```python
  def place_piece(self, marker, space):
    super(TTTBoard, self).place_piece(marker, space)

  def find_open_spaces(self):
    return super(TTTBoard, self).find_open_spaces(self.active_board)
```

You can actually override the functionality of the abstract methods, but for my needs, that was not necessary.

#### Board Presentation

In [GOOS](https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627?ie=UTF8&*Version*=1&*entries*=0), the authors recommend splitting large objects into collaborating objects when the objects become too big to handle, like in cases where it is too big to test easily, or failures are not easily interpreted. Based on previous study, this also could indicated a violation of SOLID principles like the [Single Responsibility Principle](http://nicolecarpenter.github.io/2016/04/22/single-responsibility-principle.html) or the [Open-Closed Principle](http://nicolecarpenter.github.io/2016/04/26/open-closed-principle.html).

My board, as I mentioned earlier, was dealing with presentation responsibilities. There were two methods that I had in this class that were eating up over 60% of the file, those being my earlier mentioned `format_board_to_string()` method, and another to `find_printable_board_positions()`. Per outside advice by everyone who reviewed my code, I created a `TTTBoardPresenter` class to handle these responsibilities. 

This accomplished a few things. First, it decluttered my tic tac toe board so that its responsibility was more clear. It grouped together similar functionality into a separate class, increasing the cohesion in both classes. Finally, it allowed me to handle the presentation responsibilities more intuitively, in the View. The board presenter is now injected into the view as a dependency. 
