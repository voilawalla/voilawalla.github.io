---
layout: post
title: Issues with My Game of Life Implementation
date: 2016-07-27
---

I spent the last two and a half days working on [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) in Clojure. This was my punishment (not really) for trying to write object oriented tic tac toe. While I got clearance from my mentor to return to the Java Http Server I was working on previously, there is one nagging issue that I have with the implementation that I designed that I want to walk through my potential refactoring. 

The original code before the refactor can be found on my Github repo [here](https://github.com/NicoleCarpenter/game-of-life/tree/d6d42ec45ccc696081de330e8efe8cf8f0eb68d7).

The major thing that I want to address is how I am dealing with a statically sized world, but first, I should back up and explain the rules of Conway’s Game of Life _(please forgive the summary reuse from my repo)_.

#### What is Conway’s Game of Life?

Conway's Game of Life is a console application built with Clojure. It is a zero player game where an initial game state evolves based on the position of the cells on the board.

The game is played on a two dimensional grid where alive (populated) cells are filled and dead (non-populated) cells are blank. Each cell is surrounded by up to eight neigboring cells. The state of the board from generation to generation is determined by four rules:

Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by over-population.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

New generations continue to evolve indefinitely unless all cells die or are grouped into smaller clusters not close enough to reproduce.

#### Blinker pattern

One of the patterns that I do not currently have a problem with is the blinker pattern. In all patterns, `|` pipes represent cells that are alive, and `-` dashes represent cells that are dead.

```clojure
(def blinker [[- - -]
              [| | |]
              [- - -]])
```

The problem with the way I am storing and passing these patterns is that I am hard coding the size of the world based on the size of the original pattern. This is not really a big deal when we are dealing with small patterns, like this blinker pattern, where the patterns sticks within a specified area. 

There are only two states that this particular pattern can occupy. The second state, based on the four rules above, would look like this:

```clojure
[[- | -]
 [- | -]
 [- | -]])
```

Because this is only a two state pattern, after the world evolves a second time, it will return to the original state. Taking this into consideration, I know right away that I am dealing with a 3 x 3 world. I can pass in the original blinker state to my program and it will evolve as expected from generation to generation. But this will not be the case with every pattern. 

Let’s look at a couple of examples where I cannot make the same assumption.

#### Pentadecathlon pattern

Here is what the original state of the pentadecathlon pattern looks like:

```clojure
(def pentadecathlon [[- - | - - - - | - -]
                     [| | - | | | | - | |]
                     [- - | - - - - | - -]])
```

But wait… this is a 15 generation pattern. That means that there are 15 combinations of dead and alive cells that will occupy that space. Here is one just two generations after the original state:

```clojure
[[- - | | | | | | - -]
 [- | - - - - - - | -]
 [| - - - - - - - - |]
 [- | - - - - - - | -]
 [- - | | | | | | - -]]
```

Our original state was 3 x 10. Here we expanded by two rows and now need a 5 x 10 world to represent the pattern. With one more generation, we need an even bigger, 7 x 10 world:

```clojure
[[- - - | | | | - - -]
 [- - | | | | | | - -]
 [- | | | | | | | | -]
 [| | - - - - - - | |]
 [- | | | | | | | | -]
 [- - | | | | | | - -]
 [- - - | | | | - - -]]
```
Ultimately over the 15 unique generations, the world requires an expansion from the original 3 x 10 board to a 9 x 16 world. 

So what would happen if I did not give my pattern room to grow? Say I kept the world size at the original pattern size. Well, the way I have this programmed, the pattern would not grow as intended. This was a misinterpretation of the game on my part. 

The way I coded this, I am feeding the application one pattern at a fixed size. I am determining the evolution (how the board changes from one state to the next) based on each space’s neighbors. With a fixed width of a board, I am creating a boundary at the edge of the board. This means that if a pattern expands and there are three cells in a row on the border of the world, according to the game rules, a new living cell should be created.

```clojure
[| | |]       =>       [[  |  ]
  [| | |]
                          [  |  ]]
```

With setting a hard border, however, I am not allowing that new life to be born. Thus the pattern is not able to grow according to the rules. 

One way I am able to combat this issue in cases such as this is to artificially expand the board. So I can add a buffer to the board that will allow for the pattern to grow up to the maximum size. Since I know that the max size will be 9 x 16, I can just add padding to the original pattern.

```clojure
[[- - - - - - - - - - - - - - - -]
 [- - - - - - - - - - - - - - - -]
 [- - - - - - - - - - - - - - - -]
 [- - - - - | - - - - | - - - - -]
 [- - - | | - | | | | - | | - - -]
 [- - - - - | - - - - | - - - - -]
 [- - - - - - - - - - - - - - - -]
 [- - - - - - - - - - - - - - - -]
 [- - - - - - - - - - - - - - - -]]
```

This solves the expansion problem, but is incredibly annoying and assumes that you know the max size of the pattern.  

#### Glider Pattern

The previous hack works great with that problem, but the glider pattern brings up a whole new problem. Here is the pattern, see if you can figure out the issue.

```clojure
[[- | -]
 [- - |]
 [| | |]]
```

The glider belongs to a Game of Life category called “spaceships”. Patterns that are spaceships move in a directional fashion across the screen rather than being self contained. 

Now I can still demonstrate the glider pattern with a larger board hack. That would involve me knowing where the pattern should be placed initially, and in which direction or directions I would need to expand. In the glider’s case, I would expand the board by padding the right and bottom sides, as the pattern works perfectly southeast on the screen. 

But I am limited to the size of the board that I create for it again. Once the glider reaches the boundary, it will no longer evolve according to the rules. I don’t even want to mention how crazy the unit tests look right now.

#### The Master Plan

I have an idea about how I want to refactor this, but I will save the implementation details for another post. Basically what I am planning on doing is changing the way that my data is moving around. Instead of passing around a whole world and evaluating each cell and its neighbors, I intend on identifying the locations of living cells within the bounds of the pattern. For instance, the blinker pattern would be passed around as cell locations of the 2 dimensional vector:

```clojure
[[1 0] [1 1] [1 2]]
```

I am going to collect these and all adjacent cells and redraw the world based on that. I will have to change not only the structure of data that is being passed around, but also the way that I am ending up with a printable string for UI presentation. This should be a fun refactor. 

