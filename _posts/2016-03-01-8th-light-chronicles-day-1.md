---
layout: post
title: "8th Light Chronicles: Day 1"
date: 2016-03-01
---

I realize that day 1 at a new job in a new industry is probably not the most accurate way to gauge the direction of your future, but man, do I have some observations. Before I get into the technical content that shall be the focus of this blog, I want to point out how huge of a change this new world seems to be.

I cannot separate my decision to get into consulting from my decision to get into tech, because they were the same decision. Tech consulting was always what I wanted to do. I knew I wanted to be client facing, I wanted to participate in more of the business aspects besides straight coding, I wanted to learn new technologies and have constantly changing requirements, I wanted to build something meaningful to help businesses meet actual needs.

That being said, I don't know where 8th Light will fit in with all of that. It is only my first day.

Culturally, this company is probably as close to Dev Bootcamp as I will get from a real-world company. It is completely illogical how everyone here is so cool. Like, everyone. There seems to be a ton of support. There are snacks! I worked the entire day on a couch.

I would say that the only thing that I am not sure I can quickly adapt to is that there seems to be a lack of structure. People come in late and everyone seems to be gone by 5. There is a fluidity with which people operate here that I am not used to in a business setting. I think that this will likely be the biggest adjustment for me here. That and the daily blogging. So let’s get to it.

Day 1 was a working out the kinks day.

I started on a new machine, so the majority of the morning was spent customizing and downloading. Eventually I started to get into Xcode and a [Swift tutorial](https://github.com/nettlep/learn-swift) given to my by my mentor Zach.

Some quick observations about Xcode. Most glaringly, it has a 2 star rating in the App Store, but since I have not gotten very deep into it, I can only report the weaknesses of the platform that I have experienced.

I got about 6 lessons into the tutorial and quickly realized that the version for which the tutorial was written and my current version of Xcode were not compatable. I was getting errors for even a `println` call. That error in itself is not too awful, however if there are any issues in the file at all, it will not compile so nothing else can be tested. I had to do a lot of commenting out of non-compatable code in order to get just a few lines to run. I have to look more into setting breakpoints and the developer tools offered in the suite.

Another issue I came across was how looped behavior was outputted. Instead of being able to see the output of each iteration, a chunk of code like

```swift
for index in 1...5
{
  "This will print 5 times"
}
```

yielded an output of `(5 times)` rather than

```swift
This will print 5 times
This will print 5 times
This will print 5 times
This will print 5 times
This will print 5 times
```

As far as Swift itself, the language has a lot of similarities to other languages that I have seen and worked with. I am quickly realizing that all programming languages have the same basic elements. They all have attributes and functions. Collections and "dictionaries" exist in all languages that I have seen.

To be continued...