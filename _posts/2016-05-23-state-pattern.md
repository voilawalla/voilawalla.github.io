---
layout: post
title: The State Pattern
date: 2016-05-23
---

A few weeks ago, I wrote a [post](http://nicolecarpenter.github.io/2016/03/30/whats-the-deal-with-state.html) about state in my Snowman application. In the post I noted that the state of something refers to the contents stored in memory at any given point in time. The State Pattern is a design pattern that implements a state machine in an object-oriented way. 

To demonstrate this pattern, let’s look at the states of an online purchase. To think about the different states, we would consider the status of an order from the moment you click the checkout button, until that order gets delivered to your door. The order is either in an unpaid or a paid state. The order is either shipped or received. Each of these individually is a state of which the order can occupy.

Different functions would then be associated for changing the state of an order. A user submitting credit card info, and the website verifying that info, would move the state from unpaid to paid. Packaging the and shipping it from the warehouse, would move the state of the order from paid to shipped. UPS or Fedex sending the store confirmation of delivery would move the state of an order to received.

The state pattern can be used to ensure that each state is responsible for how it handles each of these methods that can be called on an order. For instance, we don’t want to ship an order out if it is not yet paid, or for UPS to deliver the order if the customer hasn’t paid for it.
First we want to define a state interface, and then each state will implement this interface.

```
protocol State {
    func verifyCreditCard(info: String)
    func ship()
    func orderDelivered()
}
```

The unpaid state would implement each of these functions, but the only time state is going to be changed is when we can verify that customers credit card info. If it is valid then we will change the state from unpaid to paid.

```
public class UnpaidState: State {
    private var order: Order

    public func UnpaidState(order: Order) {
        self.order = order
    }

    public func verifyCreditCard(info: String) {
        if (verifyCreditCard(info)) {
            order.setState(order.getPaidState())
        }
    }

    public func ship() {
        print("Sorry can't ship an item unless it's paid")
    }

    public func orderDelivered() {
        print("Order hasn't shipped yet!")
    }

}
```

Each state will implement these methods differently, but only one method will cause the state to change. Calling `ship` will change the state from paid to shipped, and calling `orderDelivered` will change the state from shipped to delivered.

Let’s take a look at the order class.

```
public class Order {
    var unpaidState: State
    var paidState: State
    var shippedState: State
    var deliveredState: State
    var state: State = unpaidState

    public init() {
        self.order = order()
    }

    func order() {
        unpaidState = UnpaidState(this)
        paidState = PaidState(this)
        shippedState = ShippedState(this)
        deliveredState = DeliveredState(this)
    }

    public func getUnpaidState() -> State {
        return unpaidState
    }

    public func getPaidState() -> State {
        return paidState
    }

    public func getShippedState() -> State {
        return shippedState
    }

    public func getDeliveredState() -> State {
        return deliveredState
    }

    public func verifyCreditCard(info: String) {
        state.verifyCreditCard(info)
    }

    public func ship() {
        state.ship()
    }

    public func orderDelivered() {
        state.orderDelivered()
    }

    public func setState(state: State) {
        self.state = state
    }
}
```

For the last variable declaration we can see the default state of an order is unpaid, which makes sense. We then have getter methods for each state of an order, unpaid, paid, shipped and delivered. Then calling the verify credit card, ship, and order delivered methods will then call those methods on whatever the current state is.

The downsides to doing this is we end up creating a lot more classes; we are creating one for every state of an order. Also you could argue we are breaking the Interface Segregation Principle, we are implementing each function from the state interface, but simply printing that a method is not allowed seems like an empty implementation. The upside is it makes our code more extensible, if we want to add a new state to an order, we can define how it handles the different methods accordingly. 

All of these patterns we have benefits and costs. A lot of times the benefit is more readability, extensibility, and more DRY code, with the cost often being more classes, and therefore one or two more balls we have to juggle mentally to understand how objects interact.