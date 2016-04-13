---
layout: post
title: Improving Your Test Suite
date: 2016-04-12
---

In John Searls’s 2015 RubyConf talk entitled [How to Stop Hating Your Test Suite](http://blog.testdouble.com/posts/2015-11-16-how-to-stop-hating-your-tests.html)*, he describes 15 pointers to designing an effective and efficient test suite based on three general principles: test structure, test isolation, and test feedback. I am going to outline one pointer from each area. 

#### Test structure - Limit the size of new objects

John Searls, in his talk, mentions that he likes to limit new objects to 1 public method and at most 3 dependencies. He cites *The Rule of Product*, which notes that in order to figure out the amount of test cases required to cover a method, the number of possible values per argument should be multiplied together. For example, if the method takes three boolean arguments, each has two possible values (true and false), which means that there would be 8 cases that need to be tested (2 x 2 x 2). One fewer argument halves the number of test cases needed to test that object, so having smaller objects means that they tests are consequently easier to test. 

I looked ahead into the chapters I am about to read in *Agile Software Development - Principles, Patterns and Practices* so I will reserve the SOLID spiel for then, however from my current knowledge, a firm understanding of single responsibility, Liskov substitution, and interface segregation would help with keeping objects focused and small. 

I was previously rigorously applying the single responsibility to my thinking about function creation, which I have been corrected as this not being the intent of the principle, but I do still find it helpful to consider methods in that mindset. Like classes, I don’t want my methods to depend too heavily on outside information being passed in or used because it clouds up the true functionality of the method. In terms of testing, this makes the tests depend heavily on the “given” part of my given-when-then pattern, which I have to ensure that all cases are covered in all possible combinations of ways. 

#### Test Isolation - Focusing the test suite

Let’s first talk about the difference between unit testing and integration testing. Test Driven Development involves a unit testing approach, where the unit being tested is a small piece of code, typically a single function, to ensure that the code is behaving as anticipated. One reason as to why many people choose to take a unit testing approach (TDD) is that it forces you to write better code. More manageable code is more manageably tested. 

Integration testing, on the other hand, deals with how the different parts of the system work together, making sure that everything is plugged in correctly. A unit test should not require integration with other parts of the system, like a database or third party API. 

Because methods often require input arguments that may be coming from other parts of the system, a mock would be used to, as the name suggests, mock the data so that you are not actually talking to the other sources. Heavily nested mocks may be a sign of unnessarily coupled code. If when conducting unit testing you are finding that isolating the individual tests is difficult, or if your mocks are several dots deep, it is likely that your code could use some refactoring. Small, decoupled methods should mean small, uncomplicated tests. 

#### Test feedback - False negatives

Before I go any further, just for clarity abour the difference between a false negative and a false positive, I found this great [comment](http://sqa.stackexchange.com/questions/12294/how-do-you-test-your-unit-tests-for-false-negatives) that explains the difference:

*In medicine, the purpose of a test is to detect a disease; if it detects the disease, the outcome is positive, otherwise it is negative. Similarly, the purpose of a test is to find bugs, so FAIL is a positive outcome and PASS is a negative outcome. A false positive would be a FAIL that does not actually correspond to a bug, and a false negative would be a PASS that fails to detect a bug.*

There is, besides that, a difference between a true negative and a false negative. A true negative means that when an error pops up, it is because the code is broken and something needs to be fixed in the code. A false negative, on the other hand, means that when the build fails, it is because a test is not updated, and the fix is to then change the test. 

Searls notes the top two causes of false negatives as redundant coverage, where dependencies are effected upon a change to an object, and slow tests, where tests are not run before a push because they take too long. Being able to understand the difference between true negatives and false negatives will help you to analyze the root causes of issues within the system. 

#### Conclusion

These are just three points in how to improve your test suite. This goes to show that even a fully tested system can be improved, and that just because an application has one hundred percent coverage, there is likely ways in which the tests can be made faster and more efficient.
