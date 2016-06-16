---
layout: post
title: Future Requirement Creep
date: 2016-06-15
---

For almost four years throughout college I worked for a local granite company in Richmond, VA. One of my responsibilities as a salesperson was to go to my clients’ homes for in-home estimates. Estimating granite was a pretty simple process; you measure the cabinet bases and add the appropriate overhang. Sure, sometimes the final estimate would differ from the original for a change in plan like moving the seams or a change in design, but overall, the final price was generally predictable. 

Software projects, on the other hand, not so predictable. As an apprentice I am asked to estimate how projects will progress and also my personal ability to deliver. Sometimes it works out. Sometimes it is a little more difficult. I assume that one of the goals of the apprenticeship is to increase my comfortability level with making these types of decisions, 

One of the things that I have tried to negotiate, though sometimes poorly, is deciding where I need to plan ahead. Most of the time I think I am making a wise decision about a certain future requirement, I am warned that I should only be designing for the requirements that I have, but I am having a hard time understanding that line. 

One of core tenants of extreme programming is to [never add functionality early](http://www.extremeprogramming.org/rules/early.html). Developers should work in small iterations, have constant communication with their client, and keep adding features as needed to the application.

Let’s look at the scenario in GOOS where they are building a system that automatically increments your bid amount if someone outbids you. You have the requirements for the system, but then you have a brilliant idea to add an email alert every time your bid is incremented. This seems like a great idea, as it is a constant reminder to appreciate small victories.  

There are a couple of issues with this scenario. First, none of the stakeholders asked for this feature. Although you thought it might be cool and even necessary to have email alerts, what about the features your stakeholders asked for? The second problem is that you’ve added unneeded complexity to your code. Now there is a cost to maintain that code, test that code, and understand how that code works. Another problem is that you have spent all this time building this email alert feature. All of your time and effort put into your bonus requirement is time not spent on other features for the software. That time could have been time spent on improving performance of our database, making the user experience of the application better, or anything that adds value to our application today.

Another scenario, closer to home, is what if your client wanted you to build an unbeatable AI for a command line Tic Tac Toe application? We should then do the simplest thing that could possibly work, which in our case is probably some variation of the minimax algorithm. What if we built some type of Alpha Go type AI instead, that learned how to play Tic Tac Toe until it was unbeatable. We are still satisfying the requirements of the feature, but now we are building something much more complex. This could take many many months to build, instead of a few days.

The purpose of building what we need, instead of building what we think we need means more accurate estimates, happier customers, and building only what is absolutely needed in the simplest way possible.