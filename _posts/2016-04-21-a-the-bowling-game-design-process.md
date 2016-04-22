---
layout: post
title: The Bowling Game Design Process
date: 2016-04-21
---

Chapter 6 of Robert C. Martin’s *Agile Software Development: Principles, Patterns and Practices* walks through his process pairing with Robert S. Koss on a Java bowling game scoring application. This chapter was very enlightening for me because it helped me witness the TDD process in action. Because there were no new technical concepts brought up in this chapter, I am just going to highlight some of the process that really surprised me as a junior developer witnessing two senior developers at work. 

#### Up-Front design is quick and efficient

Bob and Bob spent a very short time at the beginning of the application deciding on the design of the application. It was clear that both Bobs had been bowling before and understood that the dependency chain would flow from a game to a frame to a throw, but that is about as much up front design as the considered, beyond on which end of the chain to start. They did not discuss the way that each of these would connect, or details about how to keep score. They did not discuss how many total throws there would be or how to score the final frame. They figured out these details as the process progressed. 

#### Logic is figured out along the way

A couple of moments during the process I got to see the Bobs putting their logic caps on, and it was not always a quick and easy path to the algorithm. Surprisingly, the try-fail-try again approach was used on a few occasions, which reinforces the idea that sometimes what seems like the obvious answer is just plain wrong. 

One instance where this came up was when figuring out how to handle strikes and spares in the final frame. There are three rolls in this frame and they were working out the logic of both ending the game that had previously operated on two throw frames, and calculating the score for marks that depend on future throws that would never come. 

You saw the assertion that a perfect game score is 300. Prior to the 10th frame, a strike would push the game into the start of a new frame. At the 10th frame, however, if you get a first throw strike, you would still be working within the same frame. Before the logic was changed, the game was creating two extra frames, and the `currentFrame` was incremented to 12 with a score of 330. To fix that, they limited the frames to 10, but the way that the logic worked, the current frame was the frame after the last scored frame. 

#### Plans are not concrete
As part of figuring out the problem with scoring a perfect game from the 10th frame, the Bob and Bob pairing went back and forth about a concept that they previously decided on: what constitutes a current frame. This definition, if changed, would mean that they would have to change the logic of things that depended on the current definition. It would also affect the game and how the game ends. They were willing to make the change because they saw past their initial design into how this aspect of the game should be interpreted, and they would have been completely fine making the change if that was the best avenue. This shows a lack of ego on the part of two seasoned devs. 

#### Tests can outlive their usefulness

At one point in the process, both Bobs decided that a test that they had written as one of the first in the suite was no longer useful. This came after more logic was added to the application and the test was failing because the test covered a scenario where only half of the information needed for implementation of the logic was provided. Their reasoning for doing this was that the test was written when the logic was simple. Added complexity was given to the application, which was of course tested. Because the tests covered the more complex logic, the broader scope, they decided that the smaller scope test could be eliminated. 

#### It is ok to make something work before making it right

Several times the Bobs decided to leave the code in, by their standards, not optimal form. They did not need to make everything perfect the first time around. That’s not to say that they just slapped logic together. If they felt that a function that logically worked but could be improved, if they did not immediate idea, they opted to leave the code in its current working state and to revisit it while refactoring. They were committing to the working code temporarily in the hopes that time and future work on the module would reveal a better solution. 

An example of this was when they were working on how to figure out the end of the game. They decided that the definition of a current frame is the frame after the last completed frame. Being that there are 10 frames, this would mean that the value for the current frame at the end of the game would be 11. Obviously there is no 11th frame, but this was something they decided to sit on until they figured out a better approach to ending the game.