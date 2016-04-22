---
layout: post-wide
title: 
date: 2016-04-22
---

The **Single Responsibility Principle** highlights the idea that a class should, as the name suggests, be responsible for one thing only. Modules that follow this principle have code that is highly cohesive, meaning the behaviors are highly related and strongly focused. 

A good barometer as to whether a class is following this principle is if, when describing the functionality of the class, you say “and”, it probably is not following the single responsibility. For instance, a class should not both read from an input source and write to an output source. These responsibilities should be split into two separate classes. A class called LightSwitch should be able to go from on to off. It shouldn’t be able to change the bulbs or control electricity. Alternatively, a class that is getting user input should not do anything with that input. 

One of the benefits of keeping highly cohesive, single responsibility classes is that when alteration happens, the class that needs to be changed is isolated, decreasing the likelihood that breakage would occur in other unrelated parts of the code. Additionally, SRP classes are usually easier to understand because there are usually fewer methods that are self explanatory. Also, single responsibility classes are reusable in that, if a class does multiple things, but only one of the things is necessary in another part of the software, than the extra responsibilities are going to be a hinderance. 

> A class or module should have one, and only one, reason to change

Besides talking about classes doing one thing, you should also consider the definition of the single responsibility, in that the class should only have one reason to change. A reason to change is the responsibility. 

Let’s look at an example of a single responsibility principle violation:

```
class Person { 
    let firstName: String 
    let lastName: String 
    let email: String

    init(firstName: String, lastName: String, email: String) {
        self.firstName = firstName
        self.lastName = lastName
        self.email = validateEmail(email)
    }

    func validateEmail(email : string) -> String { 
        let regex = NSRegularExpression(pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", options: .CaseInsensitive, error: nil)
        if (return regex?.firstMatchInString(self, options: nil, range: NSMakeRange(0, countElements(self))) != nil) {
            return email
        } else {
            // handle invalid email
        }
    }

    func sayHi() {
        print(“Well hello there, \(firstName) \(lastName). I am sending you an email to \(email).”)
    }
}
```
Here there is a person class, but in addition to the person class having the responsibility of greeting a person, it is also validating the email. These are two distinct responsibilities. To fix this, we can pull the functionality of the email validation into an email class:

```
extension String { 
    func isValidEmail() -> Bool { 
        let regex = NSRegularExpression(pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", options: .CaseInsensitive, error: nil)
        return regex?.firstMatchInString(self, options: nil, range: NSMakeRange(0, countElements(self))) != nil 
    } 
}

class Email { 
    var email: String

    init(email: String) {
        self.email = validateEmail(email)
    }

    func validateEmail(email: String) -> String { 
        if email.isValid? {
            return email 
        } else {
            // handle invalid email
        }
    }
}
```

We have removed the responsibility of the `Person` class to validate the email address by creating a new `Email` class that knows how to validate itself. Now we can use dependency injection to supply the `Person` class with a valid email. Now, if for some reason we have to change the way that the email is handled or input, we only have to change the `Email` class and not the `Person` class. Similarly, changes to the `Person` class should not handle the way that `Email` works.
