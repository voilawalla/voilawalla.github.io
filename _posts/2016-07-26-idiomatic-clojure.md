---
layout: post
title: Idiomatic Clojure
date: 2016-07-26
---

I just received my last bit of feedback from my [Clojure tic tac toe application](https://github.com/NicoleCarpenter/tic-tac-toe-clojure). There were a few nit-picky things that I should have caught, but besides those, the major theme was that my Clojure was not Clojure enough. Sure, I was using Clojure constructs, and everything worked and was tested, but it was very obvious that I was trying to force a functional programming peg into a object oriented programming hole. 

One term that came up repeatedly during my reviews was “idiomatic Clojure”. When we are talking about idiomatic programming, we are generally talking about best practices and characteristics unique to the language. I found this helpful [style guide](https://github.com/bbatsov/clojure-style-guide) that identifies everything from standard spacing to language naming conventions. 

Just to be clear, you can write code that is not idiomatic to a language and still have a successfully working application. In fact, my code for my tic tac toe application worked perfectly as designed. I was not surprised to get this feedback, but I was a little surprised as to how much importance was placed on it.

So what is the reasoning behind writing idiomatic code?

Idiomatic code is consistent. Developers writing code in the same language should follow the same base rules regardless of the type of application. You can sort of think of it like a generic and wide implementation of a design pattern. Those familiar with the language should be able to look at your application, understand it, and add to it in a way that is consistent with the rest of the application.

One example of an idiom in Clojure is how collection items are separated. In most languages, an item in a collection is separated by a comma:

```ruby
my_array = [1, 2, 3]
```

In Clojure, on the other hand, the idiomatic way is to not include commas. The same structure in Clojure would look like this:

```clojure
(def my-vector [1 2 3])
```

Obviously there are also differences in the language besides the lack of comments. When we are talking about requirements of the language, such as the parentheses around the declaration, these are not idioms because if we did not write the code as such, something will break. Not writing idiomatic code will not break anything.

The major reason that was brought to my attention as the why my code was not idiomatic was due to my use of the language’s `defprotocol` and `defrecord` constructs. Again, these are included in Clojure’s standard library, yet the way I used them is what drew the critique. Let me give you an example.

It is debatable as to whether or not I would need to represent a board as an interface. An interface in an object oriented language allows you the flexibility to be able to define the requirements of a class while being able to switch out different implementations. This works best for strong typed languages as you are able to define the type of data that the methods and data structures contain. In Clojure, this is where the `defprotocol` comes in.

```clojure
(defprotocol Board
  (place-piece [x board space marker])
  (find-open-spaces [x board])
  (row-count [x board])
  (depth [x board]))
```

Here I am defining Board and suggesting methods that could be used across any type of board, like a chess board, or even Chutes and Ladders. Obviously these games have different rules than tic tac toe, but the general idea of a 2D board apply to all. 

In order to implement this protocol I would need a `defrecord`. I am not going to go into how this works extensively in this post, but this is how I defined the record in my code:

```clojure
(defrecord TTTBoard []
  b/Board
  (place-piece [x board space marker]
    (assoc board (read-string space) marker))

  (find-open-spaces [x board]
    (keep-indexed #(if (not (string? %2)) %1) board))

  (row-count [x board]
    (int (Math/sqrt (count board))))

  (depth [x board] 
    (count (b/find-open-spaces x board))))

(defn create-ttt-board []
  (map->TTTBoard {}))
```

While I received marks for creatively finding and using these constructs (shout out to Geoff for the Zagaku), reviewers of my code suggested that this was not the Clojure way of doing things. 

Clojure is a functional programming language, caring more about passing around data with the absence of state rather than the rules that apply to object oriented programming. While the rules in [PPP](https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/0135974445) for abstractions and interfaces apply firmly to OO languages, they are not steadfast rules here.

A lot of the reason that this code drew the criticism was because the readers had to look up what was going on with the code, or I, as someone who has known Clojure for fewer than 3 weeks, had to explain to more seasoned Clojure devs what my code was actually doing. While my use of `defprotocol` was clever, it was not necessarily better. 

There are definitely plusses and minuses to both functional programming and object oriented programming; the trick is understanding the nuances of each and writing to the language’s strengths. I have quite a bit to explore on that front, but I have time.
