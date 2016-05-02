---
layout: post
title: The Facade Pattern
date: 2016-05-02
---

The word facade comes from the French word meaning “face”. When someone refers to a facade in the physical sense, they are typically referring to the face, or any exterior wall, of a building. Additionally, a person can be giving off a certain facade, where they are portraying something superficial, often with hidden emotions or intent beneath. 

In the context of design patterns, the **Facade** pattern follows a similar path. In all cases, we are given a simple, generally pleasant view of something without knowing the complexity that lies behind. 

![The facade pattern](https://www.packtpub.com/sites/default/files/Article-Images/B05180_01.png)

A facade in programming terms is an interface, something that a user must interact with instead of having direct access to the private pieces of the system. 

A real life example of this type of pattern would be like a customer service agent for a travel agency. The agent has knowledge of how to book each part of a trip. They have to book a flight, arrange for a hotel, and plan the activities. The client is just given a packaged trip. Sure, the client can get details about the parts of the trip, but everything must go through the agent. The client does not have direct access to the vendors. 

Another example we can use is with our familiar shapes from [Java2s](http://www.java2s.com/Tutorials/Java/Java_Design_Patterns/0120__Java_Facade_Pattern.htm):

``` java
class ShapeFacade {
    
    interface Shape {
        void draw();  
    }

    class Rectangle implements Shape {
        @Override
        
        public void draw() {
            System.out.println("Rectangle::draw()");
        }
    }
  
    class Square implements Shape {
        @Override
            public void draw() {
                System.out.println("Square::draw()");
            }   
    }
  
    class Circle implements Shape {
        @Override
        public void draw() {
            System.out.println("Circle::draw()");
        }
    }

    private Shape circle = new Circle();
    private Shape rectangle = new Rectangle();
    private Shape square = new Square();

    public ShapeFacade() {
    }

    public void drawCircle() {
        circle.draw();
    }

    public void drawRectangle() {
        rectangle.draw();
    }

    public void drawSquare() {
        square.draw();
    }
}

public class Main {
    public static void main(String[] args) {
        ShapeFacade shapeFacade = new ShapeFacade();
        shapeFacade.drawCircle();
        shapeFacade.drawRectangle();
        shapeFacade.drawSquare();
    }
}
```

Here, the shape facade is created through which all access to the shapes is given. This interface hides the implementation details in each of the shape classes. The user does not have direct access to the shapes; it is given indirectly through the interface. 

The facade pattern is appropriate when you want to hide the complexity of your system. The use of a simple interface makes this possible. 
