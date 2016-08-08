---
layout: post
title: Type Casting
date: 2016-08-05
---

One thing you discover quickly about Java is how fussy it is about the information it will handle. Java methods and constructors require things to take a specific form and won’t accept alternatives. When you send arguments to methods or use variables in expressions, you must use variables of the correct data types. If a method requires an int, the Java compiler responds with an error if you try to send a float value to the method. Likewise, if you set up one variable with the value of another, they must be of the same type.

Sometimes you’ll have a value that isn’t the right type for what you need. It might be the wrong class or the wrong data type, such as a float when you need an int. In these situations, you can use a process called casting to convert a value from one type to another.

Although the concept of casting is reasonably simple, the usage is complicated by the fact that Java has both primitive types (such as int, float, and boolean) and object types (Integer, Float, String, Point, ZipFile, and the like). When discussing casting, it can be easier to think in terms of sources and destinations. The source is the variable being cast into another type. The destination is the result.


### Casting Primitive Types


Casting between primitive types enables you to convert the value of one type to another primitive type. This most commonly occurs with the numeric types. In many casts between primitive types, the destination can hold larger values than the source, so the value is converted easily. An example would be casting a byte into an int. Because a byte holds values from –128 to 127 and an int holds from around –2,100,000 to 2,100,000, there’s more than enough room to cast a byte into an int.

Often you can automatically, use a byte or char as an int; you can use an int as a long, an int as a float, or anything as a double. This is implicit casting. In most cases, because the larger type provides more precision than the smaller, no loss of information occurs as a result. The exception is casting integers to floating-point values. Casting an int or a long to a float, or a long to a double, can cause some loss of precision.


#### Syntax


You must use an explicit cast to convert a value in a large type to a smaller type. Explicit casts take the following form:

```
(typename) value
```

Here `typename` is the name of the primitive data type to which you’re converting, such as short, int, or float. `value` is an expression that results in the value of the source type. For example, in the following statement, the value of x is divided by the value of y, and the result is cast into an int in the following expression:

```
int result = (int)(x / y);
```

Note that because the precedence of casting is higher than that of arithmetic, you have to use parentheses here. Otherwise, first the value of x would be cast into an int, and then it would be divided by y, which could easily produce a different result.


##### Note!


One primitive type can never be used in a cast. Boolean values must be either true or false and cannot be used in a casting operation. A character can be used as an int because each character has a corresponding numeric code that represents its position in the character set. If the variable i has the value 65, the cast (char) i produces the character value 'A'. The numeric code associated with a capital A is 65 in the ASCII character set, which Java adopted as part of its character support.


#### Java Primitives conversion table


![alt text](http://www.javadb.com/images/code_examples/conversions.gif
 "Java Primitives conversion table")


### Casting Objects


Objects of classes also can be cast into objects of other classes when the source and destination classes are related by inheritance and one class is a subclass of the other. So you couldn't cast sibling classes.

Some objects might not need to be cast explicitly. In particular, because a subclass contains all the same information as its superclass, you can use an object of a subclass anywhere a superclass is expected.


#### Upcasting


For example, consider a method that takes two arguments, one of type Object and another of type Component in the java.awt package.

```
public void someMethod(Object obj, Component component) {
  // some code...
}
```

You can pass an instance of any class for the Object argument because all Java classes are subclasses of Object. For the Component argument, you can pass in its subclasses, such as Button, Container, and Label (all in java.awt). This is true anywhere in a program, not just inside method calls. If you had a variable defined as class Component, you could assign objects of that class or any of its subclasses to that variable without casting.


#### Downcasting


This also is true in the reverse, so you can use a superclass when a subclass is expected. There is a catch, however: Because subclasses contain more behavior than their superclasses, a loss of precision occurs in the casting. Those superclass objects might not have all the behavior needed to act in place of a subclass object.

Consider this example: If you have an operation that calls methods in objects of the class Integer, using an object of its superclass Number won’t include many methods specified in Integer. Errors occur if you try to call methods that the destination object doesn’t have.

To use superclass objects where subclass objects are expected, you must cast them explicitly. You won’t lose any information in the cast, but you gain all the methods and variables that the subclass defines. To cast an object to another class, you use the same operation as for primitive types, which takes this form:

```
(classname) object
```

In this template, `classname` is the name of the destination class, and `object` is a reference to the source object. 


##### Note!


Casting creates a reference to the old object of the type classname; the old object continues to exist as it did before. The following example casts an instance of the class VicePresident to an instance of the class Employee. VicePresident is a subclass of Employee with more information:

```
Employee emp = new Employee();
VicePresident veep = new VicePresident();
emp = veep; // no cast needed for upward use
veep = (VicePresident) emp; // must cast explicitly
```

In addition to casting objects to classes, it is possible to cast objects to interfaces, but only if an object’s class or one of its superclasses actually implements the interface. Casting an object to an interface means that you can call one of that interface’s methods even if that object’s class does not actually implement that interface.


### Converting Primitive Types to Objects and Vice Versa


One thing you can’t do under any circumstance is cast from an object to a primitive data type, or vice versa. Primitive types and objects are very different things in Java, and you can’t automatically cast between the two.


#### Converting numeric types


As an alternative, the java.lang package includes classes that correspond to each primitive data type: Float, Boolean, Byte, and so on. Most of these classes have the same names as the data types, except that the class names begin with a capital letter (Short instead of short, Double instead of double, and the like). Also, two classes have names that differ from the corresponding data type: Character is used for char variables, and Integer is used for int variables.

Using the classes that correspond to each primitive type, you can create an object that holds the same value. The following statement creates an instance of the Integer class with the integer value 7801:

```
Integer data = new Integer(7801);
```
After you have created an object in this manner, you can use it as you would any object (although you cannot change its value). When you want to use that value again as a primitive value, there are methods for that as well. For example, if you wanted to get an int value from a `data` object, the following statement shows how that would work:

```
int newCount = dataCount.intValue(); // returns 7801
```


#### String to number


A common translation you need in programs is converting a String to a numeric type, such as an integer. When you need an int as the result, this can be done by using the parseInt() class method of the Integer class. The String to convert is the only argument sent to the method, as in the following example:

```
String lights = "8";
int lightCount = Integer.parseInt(lights);
```

The following classes can be used to work with objects instead of primitive data types:

- Boolean, 
- Byte,
- Character,
- Double,
- Float,
- Integer,
- Long,
- Short,
- Void

These classes are commonly called object wrappers because they provide an object representation that contains a primitive value.


#### Autoboxing and Unboxing


Working with primitive types and objects that represent the same values is made easier through autoboxing and unboxing, an automatic conversion process. Autoboxing automatically converts a primitive type to an object, and unboxing converts in the other direction. If you write a statement that uses an object where a primitive type is expected, or vice versa, the value is converted so that the statement executes successfully. This feature was unavailable in the first several versions of the language.

Here’s an example of autoboxing and unboxing:

```
Float f1 = new Float(12.5F);
Float f2 = new Float(27.2F);
System.out.println("Lower number: " + Math.min(f1, f2));
```

The Math.min() method takes two float values as arguments, but the preceding example sends the method two Float objects as arguments instead. The compiler does not report an error over this discrepancy. Instead, the Float objects automatically are unboxed into float values before being sent to the min() method.


##### Caution!


Unboxing an object works only if the object has a value. If no constructor has been called to set up the object, compilation fails with an error.


#### Concatenation


There is one area where Java’s compiler is decidedly flexible: the String object. String handling in println() methods, assignment statements, and method arguments is simplified by the + concatenation operator. If any variable in a group of concatenated variables is a string, Java treats the whole thing as a String. This makes the following possible:

```
  float age = 20.25F;
    System.out.println("Honest, my age is " + (age + 1.5));
```

Using the concatenation operator, a single string can hold the text representation of multiple objects and primitive data in Java.