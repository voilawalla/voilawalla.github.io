---
layout: post
title: Payroll Case Study - Abstractions
date: 2016-05-06
---

I am presently going through chapter 19 of Robert C. Martin’s *Agile Software Design- Principles, Patterns and Practices. In this chapter, he starts into the payroll case study that was introduced during the earlier discussion of the SOLID principles. 

The chapter walks through some use cases that would come up during an initial iteration for this type of system. From my perspective, the most important part of the chapter was the process of coming up with abstractions from these use cases. That was one of those lightbulb moments for me. 

The system is a payroll manager. Employees receive their pay at a particular schedule, by a particular schedule, according to particular agreed upon terms. It is these particularities that should jump out. For example, employees can be paid by the hour, salaried, or based on commission. All employees are paid, but the terms of the payment is different, and as such, an overarching `PaymentClassification` can be abstracted from which each separate and concrete class would derive. 

Presently, I am working on tic-tac-toe, which is a right of passage here at [8th Light](www.8thlight.com). I have a couple of months of experience now with abstractions, but by no means am I an expert. I am going to go through the process of one of my abstraction, and how everything comes together in python. 

#### IO

This being a console application, I have a couple of functions that handle the input and output. In python, `raw_input` will read from the console and save the input as a string. You can add an optional parameter as a prompt for the input. `print` displays a message to the console. The reason that I need an abstraction for these two methods is because, like all good 8th Light developers, I test drive my application. 

Now because printing and getting input are system functions, I don’t need to test them. However, what about when I have a function that requires me to print something to the console? I am not going to print to my test output. The answer is to have a `MockIO` class that relies on an abstraction and is therefore substitutable for my regularly functioning IO. 

```python
import abc
from source.interactable import Interactable

class MockIO(Interactable):

  def __init__(self):
    self.get_user_input_called = False
    self.display_called = False
    self.stubbed_user_input = ''
    self.output_stream = ''

  def get_user_input(self, prompt):
    self.get_user_input_called = True
    return self.stubbed_user_input

  def display(self, output):
    self.display_called = True
    self.output_stream = output
```

Here I am setting boolean variables to `False`, and changing the value when the method is called to `True`. Now, when I have a method that requires calling the method, the value will be true, and I can test the boolean value that notes that the method was called, rather than relying on data being passed to and from the console. 

Additionally, I can verify the argument passed into the method was handled. To do this I am simply saving the output to another instance variable that I can test in my suite. 


#### View

The view in my application does nothing more than wrap the IO functions, returning validated information. Take for example the following method that receives and returns a valid user_input.

```python
  def get_play_mode(self):
    user_input = self.io.get_user_input('')
    while (not self.__is_valid_number(user_input)):
      self.io.display('Invalid selection')
      user_input = self.io.get_user_input('')
    return user_input
```

Note that we are relying on both a `self.io.get_user_input()` method, and a `self.io.display()` method. When we run the tests and call `get_play_mode()` in the process, we don’t really want these functions to talk to the console. This is where the IO abstraction comes in. 

We are injecting an IO into the view. When we are in the regular application, it will look like this.

```python
io = IO()
view = View(io)
```

Whereas in my tests, I will be passing a mock.

```python
io = MockIO()
view = View(io)
```

This is possible because I am creating an abstract base class that makes the IO and the MockIO both derive from the abstraction. They both extend the abstract base class. 

#### Interactable

Here you have the abstract base class Interactable.

```python
import abc

class Interactable(object):
  __metaclass__ = abc.ABCMeta

  @abc.abstractmethod
  def get_user_input(self, prompt):
    pass

  @abc.abstractmethod
  def display(self, output):
    pass
```

We are importing the **abc** python module, which stands for *abstract base class*. This works like Swift’s protocol tag. By declaring the class as an abstract class, as we do with the line `__metaclass__ = abc.ABCMeta`, we are stating that
We will not be creating an instance of this class
Any class that extends this base class must implement the methods in the class

Not only must the methods be implemented in the IO, but they must also share the same structure, meaning if the method in the abstract class requires an argument, so too must the extended class’s method. 

#### Conclusion

Just as with Swift protocols, we can create abstract base classes in Python using the **abc** module. Abstract methods are created in this base class, but the class will not be instantiated and the methods must be implemented in its extensions. By using this method, we are ensuring that we are adhering to the open-closed principle. 
