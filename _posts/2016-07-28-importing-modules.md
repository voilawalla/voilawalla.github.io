---
layout: post
title: Importing Modules
date: 2016-07-28
---

Many languages have the ability to import modules. The syntax for importing varies slightly, but a common convenience is the wildcard import. This allows you to import everything that is housed within a namespace. Lets at look two examples of this.

```java
import java.io.*;
```
_Translation: Import every class or interface in the java.io package_

```python
from functools import *
```
_Translation: Import every function, class, and module level variable from the functools module_

You might already be aware that this is an anti-pattern in many circles. The common argument against using wildcard imports is that it pollutes the namespace and can lead to ambiguity. I will leave it to some other articles to discuss that specific argument.

* [Import * Considered Harmful](http://seanmonstar.com/post/708954358/import-star-considered-harmful)
* [Code Like a Pythonista: Idomatic Python](http://python.net/~goodger/projects/pycon/2007/idiomatic/handout.html#importing)

There is another reason not to use wildcard imports. Wildcard imports obfuscate the dependencies of your modules and hide potential design flaws. The list of imports at the top of a module can tell the reader a lot about what lays below. This can be a really great tool when auditing the design of a module or class.

When you see a long list of imports, this can be an indicator that the module is doing too much. When you use wildcard imports that indicator not present. Here is an example:

```java
import java.io.*;
``` 

Versus

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
```

This is an example of several imports that could be used in a test case to mock the behaviour of reading lines from System.in. Converting the wild card import to a list of explicit imports makes some of the flaws in the tests more concrete. Making the imports explicit encourages you to deal with that problem. For instance, you could reduce the dependencies by half by adding a fake reader and writer to pass to the tests. Being explicit with dependencies encourages you to deal with the flaws in your design.