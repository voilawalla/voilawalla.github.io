---
layout: post
title: The Visitor Pattern
date: 2016-05-19
---

The visitor pattern is applied when there is a need to perform operations on objects that do not share a common base class or conform to a common protocol. The operations do not take place in the object, but rather are performed from an external class, allowing you to even add additional functionality that the concrete class does not allow. 

That last bit is key because this pattern allows you to add methods to a series of classes without having to go through the cumbersome task of having to change the design of your program. Another scenario is if you have classes that manage several mismatched objects upon which you want to perform an operation. 

We can use this pattern by creating a visitor class that extends the behavior of a collection of classes by defining methods that handle each type of object in the collection. Let’s look at a classic [example](http://www.codeproject.com/Articles/588882/The-Visitor-Pattern-Explained) I  of a document type converter found on codeproject.com. This is a much better example than something I could have come up with on my own. 

The first thing that we are doing is establishing an interface. This is going to list the defined options for conversions.

```
public interface IVisitor {
    void Visit(PlainText docPart);
    void Visit(BoldText docPart);
    void Visit(Hyperlink docPart);
}
```

There will be a main HtmlVisitor class that will extend IVisitor. This acts like a contract stating that HtmlVisitor will contain matching methods for each of those defined in the interface.

```
public class HtmlVisitor : IVisitor {
    public string Output { 
            get { return this.m_output; }
    }
    private string m_output = "";

    public void Visit(PlainText docPart) {
            this.Output += docPart.Text;
    }

    public void Visit(BoldText docPart) {
            this.m_output += "<b>" + docPart.Text + "</b>";
    }

    public void Visit(Hyperlink docPart) {
            this.m_output += "<a href=\"" + docPart.Url + "\">" + docPart.Text + "</a>";
    }
}
```

Now each of the document classes will also have to be adjusted for the visitor pattern. 

```
public abstract class DocumentPart {
  public string Text { get; private set; }
  public abstract void Accept(IVisitor visitor);
}

public class PlainText : DocumentPart { 
  public override void Accept(IVisitor visitor) {
    visitor.Visit(this);
  }
}

public class BoldText : DocumentPart { 
  public override void Accept(IVisitor visitor) {
    visitor.Visit(this);
  }
}

public class Hyperlink : DocumentPart {
  public string Url { get; private set; }

  public override void Accept(IVisitor visitor) {
    visitor.Visit(this);
  }
}

public class Document {
  private List<DocumentPart> m_parts;

  public void Accept(IVisitor visitor) {
    foreach (DocumentPart part in this.m_parts) {
      part.Accept(visitor);
    }
  }
}
```

Designing with the visitor pattern prevents us from having to change the class any time we want to convert the document to a new type, which is a clear violation of the [open-closed principle](http://nicolecarpenter.github.io/2016/04/26/open-closed-principle.html). It also prevents each document type from having to know the details of the other document types. 

The visitor pattern separates operations from the data structures that they work on, allowing you to extend the functionality of classes that cannot be easily changed. This is a easy work-around, but not necessarily practical in a more modern language like Swift, as there are better ways to make this scenario work. 
