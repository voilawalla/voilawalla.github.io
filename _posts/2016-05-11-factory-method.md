---
layout: post
title: The Factory Method
date: 2016-05-11
---

Whenever I would hear the term **factory** tossed about the apprentice table, I would shudder a bit because my imagination paired the term with complexity. When I think factory, I think of Henry Ford’s Model T line, with hundreds of hands touching thousands of part. A factory in the programming sense does have a literal translation, but it is less about the abstract idea of complexity, and more about the literal role of a factory being a place where concrete things are created. 

The general idea with a factory is that an abstract interface should exist to delegate the creation of new objects. That interface will be extended to a subclass which will decide what object to instantiate. This pattern exists when a class from a group of classes needs to be initialized, but which class gets initialized can be determined at run time. The pool of classes from which can be initialized will all share the same base interface. 

Another way to look at a this pattern is to consider that the interface knows when an object should be created, but not what the object is that it will create. The determination of what object is created is a run time decision. 

#### Pizza Factory

Let’s take for example my favorite food group, pizza. For pizza, there are many different varieties. The idea of the factory is that instead of a class deciding what pizza to make (what class to instantiate) from within, the pizza type is passed to a factory that speaks to an abstract class, Pizza, which is subclassed by each of the varieties of pizza.

![pizza factory](http://www.javajigi.net/download/attachments/25362442/SimpleFactoryPattern_s.JPG)

The role of the pizza factory is to handle the createPizza() method. This calls to the interface to implement (bake) whatever pizza is specified. The specified pizza is then returned by the factory to whatever module called its createPizza() method. 

#### Conclusion

The factory pattern is another useful way to hide the details of your code. By creating a factory abstraction, you are able to shield the details of your implementation and dependencies. You are able to create new objects through the factory, without knowing in detail how they are created.