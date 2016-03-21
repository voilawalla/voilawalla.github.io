---
layout: post
title: "Clean Code: Chapter 5 - Formatting"
date: 2016-03-13
---

Formatting, while not consequential to how the code actually works, does make a huge difference in how future user of the code will be able to navigate and understand what is going on. 

In formatting, particularly, the broken window theory applies. The broken window theory is a social science concept that looks at how a single, small act of neglect can lead to snowballing negative effects. The theory gets its name from the idea that a single neglected broken window in an abandoned building would eventually invite more acts of crime and vandalism. 

This applies to programming because a consistently and cleanly formatted application reinforces the importance of setting positive norms for future results. Lazy formatting, on the other hand, will set a precedent for those who will add to and edit the code down the line.  

There are several aspects that go into a well formatted application. Vertical and horizontal formatting are a couple of considerations to make when considering how your code and files should be organized.

### Vertical Formatting

>Smaller files are usually easier to understand than large files are. 

Vertical formatting points to a file’s overall size with regards to lines of code per file. As a general rule, you don’t want to have files over 500 lines of code, but even smaller files are easier to sort through. 

Beyond just lines of code, however, are vertical context guidelines. Code should be organized in a file in a meaningful way, with larger concepts towards the top, and smaller and smaller details as one descends down the file. Functions that call other functions should appear above the functions which they call. Variables that are used throughout the file should remain at the top of the file, and local variables should appear at the top of the function that is using them. 

With the code organized, you can make other considerations with regards to spacing. 

It is appropriate to use empty lines to separate concepts, such as functions. Within a grouped concept, however, using empty lines can draw out methods, making them more difficult to follow. 

### Horizontal Formatting

Horizontal formatting, on the other hand, deals with the smaller context of single lines. The guideline for how long your lines should be should take into consideration a reader and the required movement it would take to read from left to right. You don’t want the reader to have to scroll to read a full line, nor would you want to have to shrink the font to a tiny size to get a single line effect. Typically 100-120 characters per line are appropriate. 

> We use horizontal white space to associate things that are strongly related and dissassociate things that are more weakly related.

Spacing can have a positive effect on the readability of the code. Consider the following: 

```function area(length,width){
	return (length*width)/2
}```

Sure, the code runs and does what it is supposed to, but a user friendly refactor could be as follows:

```function area(length, width) {
	return (length * width) / 2
}```

Just adding a couple of spaces saves time in allowing yourself to separate the different actions happening in the code. 

As another consideration, it is generally not wise to separate things into a column format, as the eye tends to follow the vertical line of the column, rather than the horizontal line as intended. 

Indentation is another important horizontal formatting concept. Consider the file as an outline and indent as such. The larger concepts such as class or module declaration would appear farthest left, with smaller details within functions and loops being indented the most. This helps readers know where concepts begin and end. 

Paying attention to vertical and horizontal formatting concepts will go a long way in presenting a clean code base that others will want to work with. Keep in mind a goal that you want people to look at your code and think *”wow, this person really cares”*. 