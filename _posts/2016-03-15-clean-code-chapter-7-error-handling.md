---
layout: post
title: "Clean Code: Chapter 7 - Error Handling"
date: 2016-03-15
---

> Error handling is important, *but if it obscures logic, it's wrong*

As can be interpreted from the quote, error handling can become a nuisance to writing clean code. You want the logic of the code to be able to shine, and not get bogged down with error handling and interpretation. There are a few general guidelines to follow when deciding how to handle errors. 

One consideration is to use exceptions rather than return codes. Coding exceptions is cleaner because it separates the concerns of device shutdown and error handling. 

A good practice to get in would be to write your try-catch-finally statements first when writing code that could throw exceptions. This basically sets the stage for what will occur if an error is encountered on the try. This is also a good habit for TDD because it makes you consider the failure that will occur and code for that thrown exception. Once the error is handled, the rest of the code can be written knowing that the exception was considered. 

It is important to provide context with exception to determine the source and location of an error. You want to mention the operation that failed and what caused the failure. This will help users trace the error much better than trying to interpret the stack trace. 

When considering how to define exception classes in an application, the most important factor should be how the errors are caught. In most exception handling situations, the work that we do is relatively standard regardless of the actual cause. So we can simplify our code considerably by wrapping the third-party APIs. Generally, one exception class is fine for each area of the code.

You can clean up the flow of the code by following the *Special Case Pattern* where you are creating a class or configuring an object so that it handles a special case for you. When you do, the client code doesn't have to deal with exceptional behavior. That behavior is encapsulated in the special case object.

One last important note is that you want to use null sparingly. You generally should neither return nor pass null so as to avoid errors that may be beyond the intent of the code. 