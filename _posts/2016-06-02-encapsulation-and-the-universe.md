---
layout: post
title: Encapsulation and the Universe
date: 2016-06-02
---

Encapsulation was one of things that I realized that I was doing already, but never associated the activity with the word. I actually thought that encapsulation was a much more complex concept until I took the time to look it up as I came across it in GOOS.

The concept of encapsulation is pretty simple: hide what you don’t want others to know about and that to which you want to restrict access. The idea is that you should only expose the code that is needed by other classes and parts of your program, and nothing more. The parts that you choose to expose are also referred to as the public interface. 

There are different ways to do this in every language. In my tic tac toe game that I submitted as part of my application, I wrote the code in Ruby, a language that makes use of a single `private` keyword to make the methods only visible to the class in which they reside. 


```
def find_winning_combinations
      find_winning_rows + find_winning_columns + find_winning_diagonals
end
  
private
  
def find_winning_rows
      grid.each_slice(3).to_a
end


def find_winning_columns
      rows.transpose
end


# etc
```

Encapsulation of the same series of methods in Python would be achieved by adding an underscore to the beginning of the method name, like `_find_winning_columns()`. In Java, we would use access modifiers, which I go into a bit deeper [in this post](http://nicolecarpenter.github.io/2016/03/26/clean-code-chapter-14-successive-refinement.html), and also getters and setters to encapsulate public variables. Consider [this example](http://www.tutorialspoint.com/java/java_encapsulation.htm) from the Java docs.

```
public class EncapTest{

   private String name;
   private String idNum;
   private int age;

   public int getAge(){
      return age;
   }

   public String getName(){
      return name;
   }

   public String getIdNum(){
      return idNum;
   }

   public void setAge( int newAge){
      age = newAge;
   }

   public void setName(String newName){
      name = newName;
   }

   public void setIdNum( String newId){
      idNum = newId;
   }
}
```

Here, creating getters and setters provide access points for the private variables. This is a way to encapsulate variables that would otherwise be public in order to hide the variable’s data type and restrict access if necessary to read-only or write-only.

So the implementation of encapsulation is pretty simple, but why is it so important?

One reason is that encapsulation allows us to modify the internals of the class without having to worry about a ripple effect across other parts of the system. Methods and variables with increased protection have limited access, reducing the number of hands in the honey jar. Using private methods makes code more flexible and easier to maintain because we can ensure that no other parts of the system are depending on these methods.

Encapsulation is an important aspect of object oriented programming as it increases cohesion within classes, therefor making the data more stable and easier to maintain. While the effects of code that have been encapsulated are more valuable than the encapsulation itself, (extensibility, maintainability, flexibility), it does not help to keep the concept of encapsulation handy as a tool to achieving these goals. 
