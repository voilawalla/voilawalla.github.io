---
layout: post
title: The Singleton Pattern
date: 2016-05-04
---

While the singleton pattern will not be used extensively, it is important to acknowledge. The pattern allows for the creation of one and only one instance of a class. We would use this pattern if the object controls concurrent access to a shared resource, and its access will be requested from multiple, disparate parts of the system. 

In order to ensure that a class cannot be created more than once, certain checks are written into the class. 

#### Example

For instance, let’s say that I have a class that allows me to create bicycles, but I have a monopoly on the ability to do so. I have a factory that produces the parts, and I want to make sure that no other factory can be built to create bicycles. I can use the singleton pattern to protect myself from multiple bicycle factories being built.

```java
public class BicycleFactory {
    private static BicycleFactory factory
    private BicycleFactory(){};

    private static synchronize BicycleFactory getInstance() {
        if factory == null {
            factory = new BicycleFactory();
        }
    return factory;
}
```

While I do not speak java, I can generally explain what is happening here. The method `getInstance()` is checking to see if there is an already existing factory. If there is not, noted by a null factory, than a new factory is created. 

The trick about this is that the constructor `private BicycleFactory(){}` is *private*, which means that the BicycleFactory cannot be created from outside of this class. 

Another feature that is hidden in this method is protection against dual thread access through the use of the keyword synchronize. For more on this keyword, check out this [post](http://nicolecarpenter.github.io/2016/03/23/clean-code-chapter-13-concurrency.html). Quickly, this keyword prevents access to more than one thread at a time. This is especially important here because two threads having access could result in the factory being null on both sides, and consequently two new BicycleFactories being created. 

#### Uses

As I mentioned, there are very few reasons for which only one instance of an object would be appropriate. One example of an appropriate use would be an object that has a logging function. A logging object is a good candidate because it’s presence in the code base does not affect how the code works. The class is a global access point and does not need to be created each time something is logged. 

Additionally, resources that are shared, such a shared database, would fit the bill. The singleton class would manage the connections to the resource. This would also be appropriate for a file manager. 
