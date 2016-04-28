---
layout: post
title: The Liskov Substitution Principle
date: 2016-04-27
---

> Let q(x) be a property provable about objects x of type T. Then q(y) should be provable for objects y of type S,where S is a subtype of T.

I want to start off by recounting the shock and joy that I experienced when reading that the author of the Liskov Substitution Principle is a *woman*. Cheers, Barbara Liskov! 

I never was that great at math. Thankfully, there is this alternative definition:

> If a program module is using a Base class, then the reference to the Base class can be replaced with a Derived class without affecting the functionality of the program module

Essentially what this means is that *subtypes* must be substitutable for their *base types*. 

When I first came across this definition, I had a hard time understanding the difference between a sub-type and a base type. A sub-type is the class or object that inherits from the base class. A base is the original and the sub is what is derived from the base. You can also say that the sub extends the base.

Let’s consider a car as a base type. We know that the vehicle has an engine, a battery, and that it drives. We also know that it accepts fuel of some type. 

```
class Car {
    var hasEngine: Bool
    var hasBattery: Bool

    func Drive() {
        // code to make it drive
    }

    func refuel() {
        // code to refuel
    }
}
```

Now let’s say that we are working with a fancy future car that is a subtype of vehicle. This car still has an engine and a battery, still drives. The future car still needs fuel. Therefor we can safely say that a `FutureCar` is a subtype of `Car`. Right?

Not so fast. Let’s think about one aspect of a car, refueling. For the base class of `Car`, the fuel is given in terms of a liquid to a fuel tank from which the engine feeds. But with `FutureCar`, the fuel that it is receiving is in the form of solar rays converted to energy. 

![Solar Powered Vehicle](http://sunwindsolar.com/wp-content/uploads/2013/01/SOLARCAR.jpg)

The `refuel()` function in both classes is not, in fact the same. A future car could not be substituted for a Car because neither would not satisfy the other’s energy acquisition requirements. 

Another problem that we face is that there is also a violation of the [Open-Closed Principle](http://nicolecarpenter.github.io/2016/04/26/open-closed-principle.html) because our base class, car, cannot be extended. When we specified the method of refueling, we broke that.

One thing that we could do in order to ensure that we are not violating the Liskov Substitution Principle is to use interfaces and protocols as contracts. This is a pattern called, not coincidentally, design by contract. It is a way of determining formal specifications by which types adopting the “contract” must abide. 

In the case of the Car and FutureCar, this would not have helped exactly because both instances use an interpretation of the `refuel()` function. We could, however, bind the two more securely by specifying the type of fuel as an input for the function.

The bottom line is, sometimes when we think that something passes the **ISA** test in real life (*a future car **is a** car, a square **is a** rectangle*), consider whether the design of your code complements that reality. Many times things hold true in the real world, but those ideas fall apart when broken down in code. 
