---
layout: post
title: Pairing Tour Day 8
date: 2016-11-07
---

Finally, on one of the last days of pairing, I got a chance to pair on a Clojure project. Mike D had been on this particular project for two years, so he was a great person to sit next to for the day.

I really like functional programming for the fact that it forces you to handle data without the overhead of OO structure.

Let me start by noting that the application we worked on is way bigger than it looks on the outside. I don't know why I always let myself get surprised by this. I always and consistently underestimate the massive undertaking that is application development. Even today, I hear of software teams that are dozens, hundreds or even thousands of people and I wonder how everyone could stay busy without everyone stepping on eachother's toes.

I was a little surprised about the extent of the duplication I saw in the code. There were different categories of users, and every time we added a small bit of functionality, the code had to be changed in 6 different places. That seemed excessive and I brought this up during our pairing session. Duplication is a code smell, as Zack would probably say. I don't know, maybe not, he just says that sometimes. I shoud probably get better at smelling code.

Today went pretty quickly and we actually had to wrap up early because the team had a demo the next day. We did a few quick scripts to import some CSV files, but besides that, the day was spent in more of a QA role. I was able to get a good insight into Aviva, the QA person's, role on the team. Her role is to exclusively deal with QA issues, including bugs and suggestions from active users. She gets to communicate both directly and indirectly with actual human beings using the application. I imagine it is extremely effective to have someone in that role on the team, as it quickens the user feedback cycle for the developers, especially considering how young the application is.

We spent the afternoon going through pull requests and I was able to ask Mike what his flow is for this. He had a half dozen pull requests waiting for review, and he prioritized those that could be released into production immediately, followed by those that were needed for the demo the following day.

I always feel weird looking at other people's code and being critical in code reviews, which is something I need to get over. Obviously, a stray comment or formatting issues that are obvious are fine, but this gets into my discomfort in dealing with "legacy" code. I have broadened that definition to include any code that I myself have not written. That's another of those things I think will improve with experience.

I only have a couple of pairings left, and then off to my challenges.