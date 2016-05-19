---
layout: post
title: The Proxy Pattern
date: 2016-05-19
---

In the tech world you may hear about a _”proxy server”_, which is a middleman computer or software system that separates a client and a server. In real world terms, a proxy is a person or other entity that is given the authority to represent someone. This is typically used in the scope of voting; when a lawmaker cannot physically place a vote due to other obligations, they would assign a proxy to vote on their behalf as they would. 

In software, the Proxy pattern works the same way. As with the server, it establishes an intermediary. As with the voting proxy, the proxy object represents another object. Typically this is done in order to intercept the invocation of methods. 

![Proxy pattern](https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Proxy_pattern_diagram.svg/400px-Proxy_pattern_diagram.svg.png)

A virtual proxy is used when we want to make a method call to a remote service. A virtual proxy could be used when you want to access something from outside of the local network, like if you wanted to access inventory remotely.

There are a lot of parts to a virtual proxy pattern. The first step to our server side code is to create a remote interface that will define the methods a client will be able to call remotely. Before I do that, though, I am going to create a protocol for which the remote object will adopt. The remote will contain these methods in its interface.

```
protocol InventoryRequest {
    func getInventory() -> String
}
```

The interface will be what the user interacts with. In the case of the inventory management, I am able to view the inventory and nothing more, just as is dictated in the protocol. 

```
class InventoryManagementInterface : InventoryRequest {
    lazy private var inventory: Inventory = Inventory()

    func getInventory() -> String {
        return inventory.getInventory()
    }
}
```

One extra thing we had in there is the inventory class. We are creating an instance of this in the interface by lazily loading it on creation of the interface. Here is the actual class that also adopts the InventoryRequest protocol

```
class Inventory : InventoryRequest {
    func getInventory() -> String {
        return "The inventory is thus: . . ."
    }
}
```

So our interface is acting as a proxy for the real class and it is loading the inventory on demand. Now, each time we want to access the inventory, we do so from the interface. We are only exposing the getInventory function, so adding and removing or whatever other necessary inventory functions are not accessible to the viewer. 

The benefit to using this pattern is that it hides the complexity of the system from the user. It acts as a barrier to the system, passing in and calling out data only as is necessary. For instance, we could have added some validations for inventory viewing. Authorization, security, and simplification are three reasons that the proxy pattern could be useful. 