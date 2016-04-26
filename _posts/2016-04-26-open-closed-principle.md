---
layout: post-wide
title: The Open-Closed Principle
date: 2016-04-26
---

The **Open-Closed Principle** states that *“software entities should be open for extension, but closed for modification”*. What exactly does that mean?

One way that you can think about OCP is that in order to make modifications, you are not actually changing a base class, but rather, you are adding code in the form of an abstraction to deal with the new requirements. This is easier to illustrate with an example.

In my past life, I used to work as a countertop salesperson and I would have to do in home estimates for my clients to determine the total area of granite or marble that they would be consuming for their project. Most countertops were pretty basic designs, usually an L shape or a “U”, where we had just a series of rectangles to estimate. Every once in a while, though, we had to create more contemporary designs, like this kitchen that features a circular end for seating

![circle island](http://st.hzcdn.com/simgs/3b510bb500b52422_4-8554/contemporary.jpg) that encorporates circles.

From the estimating perspective for the customer, they are going to be paying for the total rectangular enclosure of the shape, so a pentagon would really be counted as the smallest rectangle in which it could reside, and a circle would be the square of its diameter. However, when we were figuring area for our records of *actual* stone use, we needed to know how to figure the area of all kinds of shapes.

A demonstration of this principle is with figuring the total area of a countertop by adding the area of each section together. It is very easy for me to figure the area of most perimeter cabinets because they line the walls and are typically rectangular. For this I would need a rectangle object that defines two values, length and width.

```
class Rectangle
{
	var length: Float
	var width: Float

	init(length: Float, width: Float) {
		self.length = length
		self.width = width
	}
}
```

In order to figure out my total area, I just use my handy `CountertopAreaCalculator` to calculate the area of each individual rectangular section.

```
class CountertopAreaCalculator
{
	func calculateArea(rectangles: [Rectangle]) -> Float {
		area: Float = 0
		for rectangle in rectangles {
			area += rectangle.width * rectangle.height
		}
		return area
	}
}
```

But wait, I did not consider my circles. They have their own struct that considers a circle’s radius along with the constant of PI. If I want to figure in circles, I have to *modify* the `CountertopAreaCalculator` class, which is a violation of the *closed to modification* rule of OCP. I am adding methods to calculate each shape’s individual area, and changing the guts of the `calculateArea()` function entirely:

```
func calculateArea(rectangles: [Rectangle], circles: [Circle]) -> Float {
	area: Float = 0
	area += Float(calculateRectangleArea(rectangles))
	area += Float(calculateCircleArea(circles))
	return area
}
```


Now another cabinet layout design pops up. Check out this island that features six trapezoids with three piece-upper and lower sections.

![angled island](https://s-media-cache-ak0.pinimg.com/736x/4f/13/ce/4f13ce7bd2cb29b744b52318870abf7c.jpg)

Now I have to add a `Trapezoid` class, which is not a big deal, but I also have to *modify* my class by adding another method call in the `calculateArea()` method, as well as the extra method now being called.  

```
func calculateArea(rectangles: [Rectangle], circles: [Circle], trapezoids: [Trapezoid]) -> Float {
	area: Float = 0
	area += calculateRectangleArea(rectangles)
	area += calculateCircleArea(circles)
	area += calculateTrapezoidArea(trapezoids)
	return area
}
```

As you can see, modifying the class every time I need to add a new shape is not very efficient. Every time I change the class, I have to recompile, which affects other modules that depend on this class. Sure, on this scale, it may not seem like a huge deal, but no example will be this small in real life.

A way to solve this that would not be in violation of OCP would be through use of abstractions. I can create a `Shape` abstraction that each of the shape types can adopt. I am going to make a `Shape` protocol that requires the `calculateShapeArea()` function in each adopting class.

```
protocol Shape {
	func calculateShapeArea()
}
```

Now I have to redesign my rectangle, circle and trapezoid classes to adopt this protocol. In order for each to conform to the new protocol, each has to include the `calculateShapeArea()` function.

```
class Rectangle : Shape
{
	var length: Float
	var width: Float

	init(length: Float, width: Float) {
		self.length = length
		self.width = width
	}

	func calculateShapeArea() {
		return width * height;
	}
}
```

Now when I call on my `CountertopAreaCalculator` class to give me a total area, the type of shape that is being used in the `calculateArea()` method does not matter because each individual shape is handling the calculation of its own area.

```
class CountertopAreaCalculator {
	func calculateArea(rectangles: [Rectangle]) -> Float {
		area: Float = 0
	    	for shape in shapes
	    		area += shape.calculateShapeArea();
	    	}
		return area;
	}
}
```

There you have it, a very simple use of the **Open-Closed** principle, applied in a real life situation.
