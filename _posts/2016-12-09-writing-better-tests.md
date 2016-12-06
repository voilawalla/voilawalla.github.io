---
layout: post-wide
title: Writing Better Tests
date: 2016-12-09
---

When I first started my apprenticeship at 8th Light, I learned very quickly that testing code was not just a _good thing to do_, but also a [published company value](https://8thlight.com/principles/). Those were the early days when I was just beginning to appreciate the many benefits of TDD, while also learning how to craft meaningful and valuable tests. Now that I am more experienced and aware of the value that testing provides, I have been able to widen my focus from writing individually effective tests to creating an efficient and effective test suite.



But before we get into that, let’s talk about the reasons why we care about testing in the first place.



### Testing: why?



In order to prevent surprises in production, we want to check that our code behaves exactly as we intend. Testing, when done correctly, grants us the confidence to know that our code works and that it is safe for use by other modules. Testing also allows us to make changes to the code without having to worry about whether or not the change affected another part of the system; the tests will let us know.

Another major benefit to testing (particularly TDD) is that it encourages your code to be simple. When you are working with complex objects, you are forced to write complex tests. If you are test driving your development, this will become obvious as you are forced to mock out dependencies or create complicated setups in order to make the tests work.

Justin Searls’s 2015 RubyConf talk entitled *[How to Stop Hating Your Test Suite](http://blog.testdouble.com/posts/2015-11-16-how-to-stop-hating-your-tests.html)* addresses common testing issues such as this, and suggests ways to make writing tests a little less painful in the process.



### Test structure - Limit the size of new objects



In his talk, Searls mentions that he strives to limit new objects to one public method and, at most, three dependencies. Limiting public methods forces you to create smaller objects. Limiting dependencies forces you to create code that is decoupled, which also promotes extensibility.



#### The Rule of Product


Searls cites *The Rule of Product*, which notes that in order to figure out the amount of test cases required to cover a method, the number of possible values per argument should be multiplied together. For example, if the method takes three boolean arguments, each has two possible values (true and false), which means that there would be eight cases that need to be tested (2 x 2 x 2). Consider the following example:

```java
public Boolean isGameOver(Boolean winner, Boolean timeUp, Boolean pressedStop) {
  return (winner && timeUp) || pressedStop
}
```

From that small bit of code, we would need to check the following conditions:

* There **is** a winner, the time **is not** up, and the player **did not** press stop
* There **is** a winner, the time **is not** up, and the player **did** press stop
* There **is** a winner, the time **is** up, and the player **did not** press stop
* There **is** a winner, the time **is** up, and the player **did** press stop
* There **is not** a winner, the time **is not** up, and the player **did not** press stop
* There **is not** a winner, the time **is not** up, and the player **did** press stop
* There **is not** a winner, the time **is** up, and the player **did not** press stop
* There **is not** a winner, the time **is** up, and the player **did** press stop

If we were to add another way that the game could be over, say, for instance, a tie, we would have to test each of the above conditions against whether that additional argument is true or false, in effect doubling the number of test cases we would have to check.Now consider the opposite effect: removing one of the arguments. This would halve the number of test cases required. Fewer arguments reduce the complexity of the object, and therefore reduce the complexity of the tests.



#### S.O.L.I.D


If you are familiar with Uncle Bob’s S.O.L.I.D principles, you can certainly consider their application towards structuring code to facilitate easier testing.

* _Single Responsible Principle_  - SRP notes that a class or module should have only one reason to change. This rule will limit the size of the objects and also increase each object’s isolation, which will make testing more streamlined.


* _Open-Closed Principle_ - OCP states that a class should be open for extension, but closed to modification. You should be able to reuse a module through subclassing or changing out its dependencies, but you should not need to go into the module to change the code once it has been written. This also means that you should not have to modify tests for the object because the base behavior should hold up. 


* _Liskov Substitution Principle_ - LSP is pretty integral with testing because it is the principle upon which mock objects take shape. Essentially, the LSP states that any class that is used as a dependency should look the same to any class that is depending on it. I can create an interface that defines a contract for a game function called `makeMove()`. I can then create concrete implementations of different objects that will also contain the `makeMove()` function, each of which can do it in a unique way, as long as the signature remains the same as in the interface. This means that I can mock out the behavior of the `makeMove()` function for my tests so that I am not actually interacting with a play field, which increases my system’s modularity. 


* _Interface Segregation Principle_ - ISP calls for smaller interfaces with fewer methods so that each interface is more focused and less likely to change. This allows interfaces to be reused throughout the system. Tests for interface implementations are more relevant because there is less of a chance that the interface contains methods not used in the implementation, but which would still need to be mocked to adhere to the interface’s contract.


* _Dependency Inversion Principle_ - This principle states that concrete and abstract classes should never depend on concrete classes; the dependency should always point to an abstraction. This goes hand in hand with LSP in that you are able to swap out classes in your test suite for the purpose of mocking objects to promote loose coupling.



### Test Isolation - Focusing the test suite



Let’s talk about the difference between unit testing and integration testing. Test Driven Development often focuses on testing small units of code, typically a single function, to ensure that the code at that level is behaving as anticipated.

Integration testing, on the other hand, deals with how the different parts of the system work together, making sure that everything is plugged in correctly. A unit test should not require integration with other parts of the system, such as a database or third party API.

Because methods often do reference other objects besides the one to which it belongs, as earlier noted, we can use mocks to stand in for the actual objects. This keeps the unit separated from the rest of the system, allowing us to focus strictly on that method’s behavior. If, when conducting unit testing, you are finding that isolating the individual tests is difficult, or if your mocks are heavily nested, it is likely that your code could use some refactoring. Small, decoupled methods should mean small, uncomplicated tests.



#### Behavior vs Implementation


Another benefit of mocking out dependencies is that mocks encourage testing behavior rather than implementation. 

```
Class A {
  public String methodA(String value) {
    String temp = classB.methodB(value)
    return temp + “ is the best thing”
  }
}
```

When we are testing a method in Class A that calls a method of Class B, we can first mock out Class B. Then, when we call Class A’s method in the test, we can simply assert that Class B’s method, as a result, was called, or that the appropriate arguments were passed along.

```
public class ClassATest extends junit.framework.TestCase {
  private MockClassB mockClassB;
  private ClassA classA;

  protected void setUp() {
    mockClassB = new MockClassB();
    classA = new ClassA();
  }


  public void testMethodA() {
    String value = “Something”;

    classA.methodA();

    assertTrue(mockedClassB.methodBCalled);
    assertEquals(mockedClassB.methodBCalledWith == value)
  }
}
```

We are not actually testing what Class B’s method did when called, because that is being tested directly when we test Class B. This also serves to prevent redundancy in the test suite, which is really just unnecessary bloat.



### Test feedback - False negatives



Another point brought up by Justin Searls in his talk regards the presence of false negatives in the test suite. We want our test feedback to be meaningful because writing tests is pointless if you are not testing correctly. A false negative occurs when there is a flaw in the test that may cause the test to pass or fail when the behavior of the code is not what is dictating that pass or fail.

There is a difference between a true negative and a false negative. A true negative means that when an error pops up, it is because the code is broken and something needs to be fixed in the code. A false negative, on the other hand, means that when the build fails, it is because a test is not updated, and the fix is to then change the test.

When searching for clarity about the difference between a false negative and a false positive, I found this great [comment](http://sqa.stackexchange.com/questions/12294/how-do-you-test-your-unit-tests-for-false-negatives) that explains the concept pretty well:

> *In medicine, the purpose of a test is to detect a disease; if it detects the disease, the outcome is positive, otherwise it is negative. Similarly, the purpose of a test is to find bugs, so FAIL is a positive outcome and PASS is a negative outcome. A false positive would be a FAIL that does not actually correspond to a bug, and a false negative would be a PASS that fails to detect a bug.*

Searls notes the top two causes of false negatives as redundant coverage, where dependencies are effected upon a change to an object, and also slow tests, where tests are not run before a push because they take too long. Skipping slow tests is often symptomatic of deeper problems within the code base. Being able to understand the difference between true negatives and false negatives will help you to analyze the root causes of issues within the system. 



#### Conclusion



These are just a few points on how to improve your test suite. It goes to show that even a fully tested system can be improved, and that even when an application has one hundred percent coverage, there are still likely ways in which the tests can be made faster and more efficient.