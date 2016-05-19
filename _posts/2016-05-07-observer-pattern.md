---
layout: post
title: The Observer Pattern
date: 2016-05-17
---

The observer pattern is one that considers a one to many relationship with one single object and its many dependents. When the object changes its state, its dependants are made aware of the change. The object is the subject and its dependents are the observers, because they are observing the subject for a change. 

![The observer pattern](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/500px-Observer.svg.png)

A real world application of this pattern would be an auction. The bid is the subject and its state changes when the price changes, which is communicated to all of the other bidders, who are observers. 

Another application, closer to tech, would be with RSS feeds. RSS stands for real simple syndication, and it is a way to publish a constant stream of something to subscribers, like a blog series or podcasts. The one to many relationship comes into play because there is one publisher and many subscribers.

In this case, the subscribers are the observers, who automatically get updated when the publisher posts new information. 

```
protocol Observer {  
    func update(text: String)
}
```

The subscribers are listening for a change, which is the publishing of a new post. 

```
public class Subscriber : Observer {
    public func update(text: String) {
        // logic
    }
}
```

The publisher is the subject. We would create another interface to detail its interaction with the observers. The benefit to using an interface is loose coupling. Loose coupling means these two components, the Subject interface and the Publisher, know as little as possible about each other.


```
protocol Subject {  
    func createObserver(subscriber: Subscriber)
    func removeObserver(subscriber: Subscriber)
    func notifyObservers(text: String)
}
```

```
 public class Publisher : Subject {
    private subscribers: [Subscriber]


    public registerObserver(subscriber: Subscriber {
        subscribers.append(subscriber)
    }

    public removeObserver(subscriber: Subscriber) {
        subscribers.delete(subscriber)
    }

    public notifyObservers(text: String) {
        for subscriber in subscribers {
            subscriber.update(text))        
        }
    }

    public publish() {
        notifyObservers(“New blog post coming”)
    }
}
```

This notes different ways that the subject is managing how they add and delete subscribers. The createObserver method adds that subscriber to the end of our list, and Remove removes that subscriber from the list. The publish method goes through the list of subscribers, and then call the update method on each subscriber.

One negative to this pattern is we are creating two levels of abstraction, so we are adding some complexity with how an observer might interact with a subject. On the other hand, the pattern is simple enough to understand with little outside information. Also because we have loose coupling, we have interchangeable components. 