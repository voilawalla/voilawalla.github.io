---
layout: post
title: The Template Method Pattern
date: 2016-05-02
---

The *Template Method* pattern offers a very simple way to reuse code and reduce duplication by defining invariant behaviors within an abstract class, and then having concrete subclasses implement the abstract methods.

![template method]( https://www.safaribooksonline.com/library/view/swift-2-design/9781785887611/graphics/4582_05_07.jpg)

 A class marked *abstract* in Java is the same as a protocol in Swift. The protocol acts as a contract, specifying the functions or variables that an adopting class would need to include, in the protocol, they will not contain logic. For the last couple of months I have been working in Swift, so here is a basic example that I have been playing with for a barista scenario. 

``` swift
protocol Drink {
    var ingredients: [String] { get }
func selectCup(size: String)
        func makeDrink(ingredients: [String])
        func deliverDrink() -> Drink
}
```

Here we are dealing with a Drink protocol in a cafe setting. Consider going to Starbucks and the choices that you have to make as a consumer. You will need to decide on the size of the cup, what kind of drink it is, and what you want in the drink as add ons like cream and sugar. For the barista, that drink will always follow a specific set of rules, regardless of what the drink is. For example, a coffee, a tea, or a lemonade all require getting a cup, steps and ingredients to make the drink, and delivering the completed drink to the customer. That means that a coffee, a tea or a lemonade can all adopt a protocol that requires these steps. 

Obviously there will be differences between the drinks. A lemonade requires ice. A coffee has to be brewed. But at the essence, each a coffee, a tea, and a lemonade needs that which is defined in the Drink protocol. 

``` swift 
class Coffee : Drink {
    var ingredients: [String]

    init(ingredients: [String]) {
        self.ingredients = ingredients      
// coffee grounds, hot water, cream, sugar
    }

    func selectCup(size: String) {
        // logic to select hot cup for coffee
    }

func makeDrink(ingredients: [String]) {
// logic to make coffee (grind beans, brew)
}


func deliverDrink() -> Drink {
    // logic to deliver coffee
}

private func grindBeans() {
    // logic to grind beans
}

. . .
```

``` swift 
class Tea : Drink {
    var ingredients: [String]

    init(ingredients: [String]) {
        self.ingredients = ingredients      
// tea bag, hot water, lemon
    }

    func selectCup(size: String) {
        // logic to select hot cup for tea
    }

func makeDrink(ingredients: [String]) {
// logic to make tea (steep tea bag, squeeze lemon)
}


func deliverDrink() -> Drink {
    // logic to deliver tea
}

. . .
```

``` swift 
class Lemonade : Drink {
    var ingredients: [String]

    init(ingredients: [String]) {
        self.ingredients = ingredients      
// lemons, cold water, sugar
    }

    func selectCup(size: String) {
        // logic to select cold cup for lemonade
    }

func makeDrink(ingredients: [String]) {
// logic to make lemonade (squeeze lemons, add sugar)
}


func deliverDrink() -> Drink {
    // logic to deliver lemonade
}

private func squeezeLemons() {
    // logic to squeeze lemons
}

. . .
```

So there we have three separate classes that all use the *template* Drink. Drink is a contract by which Coffee, Tea and Lemonade all must abide. The generic Drink pattern allows for many detailed implementations of drinks. The protocol is a high level plan that can be reused independently over low level details. 
