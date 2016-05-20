---
layout: post
title: On the Edge of the Minimax Cliff
date: 2016-05-20
---

I have been working on my minimax algorithm for a solid three business days. In fact, were I not assigned a pretty ridiculous blogging requirement, that would have probably been three entire days. That is three days of cursing the Internet, three days of throwing books, three days of drowning in my own tears. 

Well, it has not really been that bad. I still don’t have a working solution so I am a little bummed about that, but overall, I have learned a ton about trees, recursion, and my design choices. 

After banging my head against the wall for several days, I decided that I need to sit back, calm down, and reevaluate my approach. I am going to try to free myself of frantic thoughts and rash assumptions about my personal insecurities, at least for the duration of this problem space. Here are some of the approaches I am going to suggest when learning something new like this, which is realistically advice that I am laying out for myself. 

#### Get to know the problem, but don’t burn yourself out
I think information gathering is a crucial first step. I spent the entire first two days without writing any code, making sure I fully understood the way that minimax was working. Overall I found [this video](https://youtu.be/6ELUvkSkCts) and [this article](http://neverstopbuilding.com/minimax) critical to my understanding. The problem was that besides a few key sources, and probably long after I had a basic understanding of the problem, I diluted that knowledge with scores of other sources, which paralyzed my ability to move forward. I feel like in a case like this, too much information is probably not a great move. 

#### Whiteboarding
Use a whiteboard or a piece of paper and use a simple case for your tic tac toe board. For instance if there is only one move left in the game how and the game is won, what happens? What if the game is tied? Once you are confident you can explain how minimax applies to a board with one move left, then try a board with two moves left. I think it’s important not to cloud your thoughts of how it works using code, at least for now. This is more about a deeper understanding of how minimax works.

#### Explain it to someone
Better if you explain it to someone that has done it before. They can probably tell you if you are right or where the holes in your thinking are. If you haven’t done it correctly, keep on whiteboarding it with the feedback you’ve been given until you can explain exactly what is going on.
#### Test for obvious cases first
You should test for the easiest board states to start. What are some easy ways to test if the AI you’ve built is giving you the right moves? It should win if it can win, and block if it can block. Or even more obvious, does it move in the last spot on the board if it is its turn? Once you get these simple tests passing, then you can move on to more difficult cases.

#### Trust in your brain
This is the most difficult piece of advice I can give because I am completely hypocritical here. I have had a tremendously difficult time trying to get over the barrier of just not thinking I am smart enough to solve this. That puts my brain into a panic spiral that is hard to escape. I have to constantly remind myself that every single apprentice here has gone through this. Everyone here has had the same struggle. My mentor is really great at reminding me that I am here for a reason. It is my responsibility to take that and prove I can hack it, rather than shoving my head in the sand when things get tough. I think that telling yourself that you _can’t_ has an alarmingly strong effect on your actual capabilities. 