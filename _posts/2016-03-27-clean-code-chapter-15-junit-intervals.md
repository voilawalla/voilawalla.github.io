---
layout: post
title: "Clean Code: Chapter 15 - JUnit Intervals"
date: 2016-03-27
---

Chapter 15 talks about the Java testing frame JUnit and ways in which the framework can be improved and refactored. Because the book does such a great job at showing how even professional level code can be improved, I am not going to try to re-explain the author’s work. Instead, I am going to talk about the subject of unit testing and why we take the time to test our code. 

Unit testing is a way to test the smallest chunks of code to make sure that the behavior expected by that function is indeed achieved. There are several reasons why developers take the time to unit test, but principly among them is the idea that taking the time up front will save time in the future. 

I spoke in my chapter 12 [blog](http://nicolecarpenter.github.io/2016/03/22/clean-code-chapter-12-emergence.html) about my first experience with TDD during my 8th Light apprenticeship. I can tell you from my limited practice with coding that learning the opposite way, code first, test later, is a difficult habit to break. I do understand that the reason that I am being broken of this habit, however, is because if I write the test after the code, I can manipulate the test to work with the code that I wrote, which may mean that the test is not actually valuable in the way that it should be. 

I never had a problem with the time that it takes to write tests because I love the rush that comes from testing. I am realizing that learning how and what to test is like learning a language in itself, but I also know that the more practice I get in this arena, the easier and more naturally TDD will come to me.

I hear a lot the phrase *”Test the logic, not the implementation”*, and at first, I had a hard time separating the two ideas. It helped me to put myself into the perspective of the user and determine, beyond the intricacies of the actual code, what my end result will be. I had to consider what was important for the end user and break down the steps that I would need to take to get to that goal. Unit testing is the breaking down of those goals and determining what the behavior of each part of the code is actually performing. 

A very basic example of a tiny unit would be testing the incrementation of a variable. I would write my test first. 

If I was testing implementation instead of behavior, my test may look something like this:

```ruby
describe(“#age”) do 
	it(“should change the dog’s age to 1”) do
		fido = Dog.new(fido)
		expect(fido.age).to equal(1)
	end
end
```

I am making assumptions about the starting age of Fido as 0 and that the age function counts by year. What if the method was aging by dog years? What if Fido was already 2 years old?

If I want to test the behavior, I would want to assert that, after running the method to change the variable, the value of the variable would have changed. One quick change I would make to this method to make more clear the behavior would be to change the method name to something like `ageDogByOneYear` or something more specific about how the method behaves. 


```ruby
describe(“#ageDogByOneYear”) do 
	it(“should add one year to the dog’s age”) do
		fido = Dog.new(fido)
		fido.age = 0
		fido.ageDogByOneYear
		expect(fido.age).to equal(1)
	end
end
```

Here I am creating a scenario, feeding the test the surrounding details, and checking that the test, given these details, behaves as expected. 

This unit test is doing several things for me. First, it is checking that the behavior of the *ageDogByOneYear* is behaving like I expected it to behave. If the result of the test was `7`, I would know that the code is not wired up like I expect, and I can adjust the code to pass the test. It also provides documentation into what the method does (as if the method name was not descriptive enough). It also allows me to make changes to other areas of my code while having knowledge if those changes break my tested method. 

Unit testing may seem daunting, but once you realize the value, it becomes just another part of writing the application. Getting into the habit of writing tests is a valuable practice that you and future authors of your code base will thank you for in the future. 