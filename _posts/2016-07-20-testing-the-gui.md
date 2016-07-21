---
layout: post
title: Testing the GUI
date: 2016-07-20
---

Now that I have a Clojure sprint under my belt, I am coming back to working with Object Oriented languages for my current assignment, building a Java server. So far, everything I have built during my apprenticeship has worked strictly as a terminal application, however I see an expansion on the horizon. 

Many of my cohort mates have gone on to integrate one of their apprenticeship projects with their server, whether as a mobile app or a full web application. Creating an application beyond the terminal calls for something discussed in chapter 15 of GOOS, a graphical user interface (GUI), and while I have no personal experience building applications that include GUIs, there are still some takeaways I got from this section on working with and testing the GUI.

#### MVC Pattern 

Before I came to 8th Light, I was a student at Dev Bootcamp. During my time there, we learned about the MVC pattern, which stands for model - view - controller (it actually makes more sense as MCV, but who’s counting?). This pattern encourages separating business logic from the view, or parts of the system with which the user interacts. The model is where the logic lives, and the controller passes information between the models and views. 

![MVC](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MVC-Process.svg/500px-MVC-Process.svg.png)

When you create an MVC application, the view should be responsible for nothing more than handling the presentation and acceptance of information to and from the user. Any manipulation of that information is done elsewhere.

#### Separating business logic

This idea is relevant when considering how to design the GUI. Your GUI, which will be a representation of the view, should not contain business logic. A view that does more than handling and presenting information is likely violating the single responsibility. As we recall from our dive into the SOLID principles, a class that is responsible for only one thing is less likely to break in the event that something is changed. 

The benefit to removing logic from the graphical user interface is that you are able to test that logic elsewhere in the system. Essentially this comes down to the fact that the UI in GUI stands for _user interface_, something that I have worked with on my other applications. In my tic tac toe and closure applications, my user interface methods were wrapped by methods deeper into the system, so testing those methods was separated from the user interface. 

#### Use interfaces to isolate 

Another tool that is handy when dealing with testing user interfaces is interfaces. I am certainly not an expert in interfaces, but I have used them to some success when dealing with UI testing. If we are thinking again about the MVC pattern, generally your business logic will not change from platform to platform, however an application presented on a 24” desktop screen will look different on a 3” phone screen. 

The interface would be built into the business logic so that the views are interchangeable. You can keep the logic out of the GUI because it is being handled deeper in the system by the controller layer. This means that the changing functionality from view to view is not the responsibility of the view, and thus is tested elsewhere. 

#### Theme

You are probably starting to see a theme. My experience in dealing with testing user interfaces, which I imagine will carry on to *graphical* user interfaces, is to try to avoid having to test the user interface by placing the testable logic deeper in the system. From my very limited knowledge with Swift mobile application development, I have see that there are ways to add unit tests for the UI, but I don’t know enough at this time to speak on the topic with confidence.