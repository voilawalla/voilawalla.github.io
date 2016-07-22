---
layout: post
title: Handling Exceptions
date: 2016-07-21
---

In my [previous post](http://nicolecarpenter.github.io/2016/07/21/about-exceptions.html), I introduced you (myself) to Java exceptions including defining what an exception is, identifying some of the reasons they would occur, and noting the difference between checked and unchecked exceptions. In this post I will talk about ways to handle different types of exceptions.

First of all, an exception is not an error. An exception is a way of handling an error. Exceptions are classes, or in an object oriented language, you can consider them objects. 


#### What’s actually happening?

Once the exception object is created, it can be “thrown”, which means that the exception is handed off to the run time system. The runtime system will trace back into the call stack, which is the ordered list of all of the methods that have been called to get the program to the state it was in when the exception was thrown. 

The exception can either be handled or ignored. If it is handled, there are specific instructions on how to deal with the exception if it occurs. Unhandled exceptions, when they occur, are passed all of the way up to the top of the call stack to the originating `main()` method. If this happens, the stack trace is printed to the `stderr` (standard error channel) and the application exits abruptly. 


#### Throwing an exception

Exceptions can be thrown automatically from defined exception classes in the language, or you can make custom exceptions to be thrown from within your methods. To create an exception, you would simply define a class to extend the Exception class. To throw that exception, you would simply use the keyword `throw`, followed by the exception class name in a situation where the exception would be appropriate. 


#### Catching an exception

Catching an exception is done in the context of a try-catch block. The try part of try-catch is where we would execute code where an exception may occur. If the exception does occur, it is then handled in the catch block. A try block can have multiple catch blocks associated with it to handle different types of exceptions, as each catch block may only deal with one class of exception. The exception to that is if you are literally catching the `Exception` class, which would encompass every type of exception subclassed and handle them all with the same response. You can also handle specific types of exceptions in catch blocks that precede the `Exception` catch block. 

In my Java server, I used a try-catch block when dealing with the `fileNotFound` exception. Here I am dealing with a boolean variable called `fileFound` that I will use to decide how to handle server requests.

```
try {
          fileInStream = new FileInputStream(fileName);
} catch (FileNotFoundException e) {
          fileFound = false;
}
```

In the catch block, I am stating that if I get a `FileNotFoundException`, I am going to set the value of `fileFound` to false. Now, down the line when I am deciding what response to send back from my server, if the file exists, I will send its contents, but if the file is missing, I will send a 404 error message back to the client.


#### Finally

Finally, we are almost done with the blog post. Well, that is true, but I am actually talking about a finally code block. A finally block can be added to a try-catch block sequence at the end. Whatever code is in the finally block will execute regardless of whether or not the exception was thrown. Both catch and finally are optional, but at least one must be included after any try block. So you can have a try-catch, try-finally, or a try-catch-finally.


#### Declaring an exception

Sometimes you will see a method definition that includes after the parameters the clause **`throws`** followed by some class of exception. This would look something like this:

```
public HttpRequest(Socket socket) throws IOException {
    ...
}
```

This is what we would call declaring an exception. A method’s `throws` clause indicates what exceptions may come up as a result of running the method. In the example above, we are indicating that some piece of the `HttpRequest` method could cause an `IOException` to be thrown due to the dependent classes or methods that live within the method. 

An exception that was neither caught nor thrown would get an error from the compiler.

```
InputFile.java:11: Warning: Exception java.io.FileNotFoundException must be caught, or it must be declared in throws clause of this method.
        fis = new FileInputStream(filename);
```

The throws clause should only include exceptions that are not otherwise caught in the method. Exceptions that are not caught will abruptly abort the program while it is running, so that needs to be considered when deciding whether to declare or catch an exception. 