---
layout: post
title: Pairing Tour Day 9
date: 2016-11-15
---

If you have not yet noticed, the dates of my "pairing tour" blogs have been relatively spread out. This is because I am not taking the typical 2 week block at the end of my apprenticeship for pairing, but rather picking one person per week to work with during the couple of months leading up to my challenges. This allows both me and my pairs more flexibility in planning a productive day with actual coding. At least, this is the idea. In reality, it does not always work out that way.

Today I paired with Kevin L. When I first started reaching out to pair with my board members, he was just rolling off of a client, and then he had about a week in between projects before he picked up with his new client. For this reason, I scheduled pairing weeks with others, planning to circle back with Kevin in November after he had gotten settled in with his new client. When I finally did get to pair with Kevin, however, the day did not turn out to be the most productive pairing day, but I did, however, get a chance to see more of the unglamorous side of consulting.

What we were working on today would be considered "toil", as defined in the book _Site Reliability Engineering_, which is operational work, or work that is not directly tied to software engineering. In fact, his entire time at this particular client, I would come to find out, has been pretty regularly spent working on toil.

> Toil is the kind of work tied to running a production service that tends to be manual, repetative, automatable, tactical, devoid of engineering value, and that scales linearly as a service grows.

I was a little bit surprised that a client would hire us to do such work, assuming that bringing in a consultant is probably not the cheapest route to take. Now, I understand that these tasks often do provide value to the organization, but because they do not directly provide enginering value, I would think that these types of activities would be delegated elsewhere.

Our task for the day was to comb through the couple of thousand programs that the client had on file to see if the program had any Java dependencies, and then to see what version of Java each was dependant upon. The reason that this was considered toil was because it was a manual and repetative task that did not provide direct engineering value. Kevin had been working on this for the two days prior to me coming and would probably be working on it for the following few days as well considering the snails pace it took to manually check each file for hints of Java or JDK or anything similar. 

In order to speed up the process, Kevin attempted to make a script that would capture any occurances of key Java words. This worked to a certain extent, however we soon realized, while manually going through the files that were captured, that some of the instances were false flags and those programs did not actually have Java dependencies. We also went through files that were rejected that actually did need to be included because the programs were hosted on a different platform for which the search query did not reach. We also had to be careful about programs that used a particular interop adapter that itself had an inconspicuous Java dependency.

I noted that this is the unglamorous side of software consulting, but I actually have no idea whether work like this is common. Besides pairing with my other board members, I have never worked on code for projects that were not my own. I actually imagine that today is much of what it is like to be a new person on a product team, which also lends to my disconnect from the reality of developer hours consumed on software projects.

To be fair, I don't quite mind the repetative processes. To me, these things represent a quantifiable goal for which progress and success is easy to track. As a junior developer, I tend to derive more of my job satisfaction from these quantitative measures, which I imagine will change once I understand the complexity of systems and face larger problems than creating an unbeatable tic-tac-toe.