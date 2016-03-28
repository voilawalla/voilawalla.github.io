---
layout: post
title: "Clean Code: Chapter 14 - Successive Refinement"
date: 2016-03-26
---

While reading the first couple of chapters of *Clean Code*, I quickly realized that this book was going to be heavily laced with Java examples. The only moderate experience that I had with a programming language before joining 8th Light was with Ruby, and getting thrown into Java, while concurrently playing with Swift, was going to take a lot of slower paced reading for me to somewhat figure out what was going on in the code. 

Chapter 14 is the start of the example-heavy point of the book where Martin really dives deep into presenting a working feature and getting down into the essence of the code. Because I am not familiar with the language, I tried to follow along, but mostly I was trying to pick up on the overall design decision he was making. I also made some observations about the difference between a dynamic language like Ruby, and a static language as Java, and I am going to briefly share my research into one of those differences: modifiers. 


### Access Modifiers

There are two types of Java modifiers: access control modifiers that control the visibility of an element, and non-access modifiers that provide additional functionality. 

There are four modifiers for Java: *public*, *private*, and *protected* and non-specified (default). The top-level modifiers are *public* and no modifier specified, meaning that these elements appear outside of other classes and interfaces. Any of the four modifiers can be applied to member level elements. 

The default of not including any modifier makes that element visible to the entire package. Typically this behavior is not used in Java modules as one of the other three modifiers will usually apply. 

The *public* modifier allows the member to be seen by anywhere inside and outside of the class. Something marked as *public* may be accessed from anywhere in the program such as other classes and from different interfaces. Because of this wide access, this modifier is discouraged unless necessary for the functionality of the program. One reason for this is that because of the wide range, it can be difficult to track down where problems occur involving public methods. For this reason, it is advisable to program considering all methods private until it is determined that wider access is needed. 

An element that uses the *private* modifier can only be used from within the class in which it exists. *private* methods and variables cannot be seen from sub-classes of classes that they exist. One benefit to using *private* elements is that they eliminate dependencies in that the only reliance placed upon them is within a single class, so the effect of a change to a *private* member should be easy to predict. The intent of *public* elements, on the other hand, may need to change in one case, but if it is being used and depended on in another part of the code for the original intent, changing the element would create a problem for that second class. 

Another modifier is *protected*. Elements that are *protected* are accessible within all classes of the same package, and additionally within subclasses in other packages. This differs from the default behavior as default scope does not allow access from subclasses. It is unlike *public* because *protected* elements cannot be seen in unrelated classes and subclasses. This modifier is also not often seen in code, but it can be useful in certain circumstances.

### Non-access Modifiers

Non-access modifiers are optional and appear after the access modifier. The following would be a typical structure for a Java method that includes both:

```
accessModifier nonAccessModifier returnType elementName(optionalParameters) {
	body
}
```

Some of the modifiers that came across were *final*, *static*, *abstract*, *transient*, and *synchronized*. 

Fields and classes marked with *final* cannot be modified. If a class is marked as *final* it cannot be inherited, so there would be no subclasses. If a method is marked with *final*, while it can be inherited, it cannot be overridden. This prevents a method in a subclass being altered, which could detrimentally change the original intended functionality within the class. *final* variables are initialized only once, so they cannot be reassigned to refer to different objects. 

*static* variables are class variables in Java. Only one copy of a *static* variable exists, regardless of how many instance of the class there are, so they belong to the class, and not the instances of the class. Similarly, methods that are *static* also occur independently, so a method declared with *static* cannot use instance variables of the class in which they are defined unless they access them through an object reference (ie: `instanceOfClass.instanceField`).

The *abstract* modifier may be added to a class or a method in Java. When added to a class, the class cannot be instantiated. An abstract that contains one or more abstract methods, because no instance of the class would appear, the methods could only be accessed by subclasses. Any class that has an *abstract* method must also be declared *abstract*. *abstract* methods are declared but contain no implementation, so the format is a little different:

```
public abstract methodName(optionalParameters);
```

A variable noted as *transient* will not be serialized, which is JVM’s process of changing the state of something into bytes, so it will be intentionally dropped. This can be used for something that does not need to persist, maybe because it was derived from a parent element that is persisting.

My last [blog post](http://nicolecarpenter.github.io/2016/03/23/clean-code-chapter-13-concurrency.html) went into the *synchronized* modifier. In summary, *synchronized* is a thread-access control that prevents multiple threads from accessing an element designated with this modifier from using the element at the same time. 

That was just a quick snapshot into some of Java’s access and non-access modifiers. I know that I will be seeing these keywords throughout Java programs, so this serves as a quick reference only to concepts that can be explored even more deeply in times to come.
