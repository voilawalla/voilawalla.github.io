---
layout: post-wide
title: Mocking HTTP Server Sockets for Tests
date: 2016-08-10
---

I have been picking away at my Java HTTP server for the past few weeks, but the bulk of my time has been spent writing and unwriting the part where I open the socket connections. My first solution on my spike worked great, but then when I tried to apply TDD and reimplement the same design, I quickly realized that it just was not going to work out. Here is a simplified version of where I started.

```java
import java.net.ServerSocket;
import java.net.Socket;

public class HttpServer {
  public static void main(String args[]) {
    ServerSocket serverSocket;
    int port = 1111;

    try {
      serverSocket = new ServerSocket(port);
      Socket clientSocket = serverSocket.accept();
      HttpRequestHandler request = new HttpRequestHandler(clientSocket);
      request.process();

    } catch (IOException e) {
      System.out.println(e);
    }
  }
}
```

If you are not familiar with how HTTP works, check out my [earlier blog](http://nicolecarpenter.github.io/2016/08/04/http.html) about the basics of HTTP. To summarize, HTTP is a protocol by which information is passed between computers over the web. There is a lot more detail in between, but for now I will just talk about the basics of how that connection is actually established. 

In the code above, you see that I am importing two classes: `ServerSocket` and `Socket`. These are both classes in Java's [java.net](https://docs.oracle.com/javase/7/docs/api/java/net/package-summary.html) package, which is comprised of _"classes for implementing network applications"_. The `ServerSocket`, as you can probably guess, is established on the server side. The `Socket` class applies to sockets on the client's end. But let's back up just a bit and answer this preliminary question: _what is a socket_?


### _"What is a socket"?_


A socket is an endpoint for a connection over the Internet. In order for one computer to connect to another, there has to be a socket established on each end. Multiple client sockets can connect to a server socket, however only one server socket can be established at a given port. In order for the connection to be established, the server socket is opened at a port, and then the client socket is created when the server socket accepts the client's connection.

The client to server connection is not automatic. Often times servers will have limits to the number of threads that they can accept. Additionally, if the port that is being requested is in use for another runnning application, or if it is not an available port for the existance of a firewall or another reason, the connection can be refused. 


### The problem

The problem that I face when trying to test my server is that a real socket is going to open a real socket connection with real input and output streams. This is problematic when testing because I don't want my unit tests to have to rely on anything outside of the application to be able to test if the server is working as intended. What I want to do is mock the input that would be received through a server connection. In order to do that, I would have to mock the socket, but because the Java.net classes are riddled with the `final` keyword, I cannot actually extend the classes to implement a protocol. 

This leaves me with two options. I can either use a mocking library, such as [JMock](http://www.jmock.org/) or [Mockito](http://mockito.org/), or, as my mentors would have me do it, I can create my own mocks and interfaces. 

Let's take a look at the end result that I am trying to achieve.


#### UML

The following diagram demonstrates the relationships between classes.

_(I would like to preface this UML diagram by noting that I just Googled how to write a UML diagram)_

![Socket UML](./images/socketUML.png)

Just as a quick aside, you should not name your interfaces _ISomething_, so don't do that. 

As noted in the spike code above, the clientSocket is created by the serverSocket calling its `accept()` method. My goal is to remove this method from the server class in order to not have to rely on Java.net classes in my server. This allows me greater flexibility in testing because I can inject an interface instead of creating a hard dependency on the Java.net class. 

This diagram shows that we are also inverting dependencies. Concrete classes depend on abstractions. We also have a special nested interface, so the IServerSocket depends on the ISocketConnection. 


#### The role of interfaces

If you are not familiar with interfaces, an interface is essentially a contract by which any implementing class must abide. The methods in a interface are abstract, meaning that they cannot be implemented. The interface will contain just method signatures, and then any concrete class implementing the interface must include methods with the same signature. 

To demonstrate, check out the first entity in the UML diagram, IServerSocket. The IServerSocket interface specifies that we need any class that implements the IServerSocket interface to include a public method called `acceptConnection()` that returns a ISocketConnection object. I have two classes that implement IServerSocket: HttpServerSocket and MockServerSocket. Both of these classes include the required method with the correct return type. If the method required an argument, the argument name and type would also have to match the interface.

A major benefit of using an interface in this scenario is that I am able to create concrete mock implementations of these classes. This solves my original problem because I am able to send into the tests a mock implementation rather than a real implementation that actually opens a socket connection. 


### The Code

I am working across several different classes, and I have separated the main method so that I can use dependency injection. I am going to omit some of the dependencies for the sake of this walkthrough, but if you want to see the actual classes, check out the repo [here](https://github.com/NicoleCarpenter/JavaHttpServer).

Here in the main class, I am using an argument parser to find the port to which the ServerSocket should listen. I could just say `port = 5000` or any arbitrary port, but this is allowing me flexiblity to accept a command line port argument.


__Main__

```
public class Main {

  public static void main(String args[]) {
    ArgumentParser argParser = new ArgumentParser(args);
    Integer port = argParser.getPort();
    ServerSocket serverSocket;

    try {
      serverSocket = new ServerSocket(port);
    } catch (IOException e) {
      e.printStackTrace();
      return;
    }

    HttpServerSocket httpServerSocket = new HttpServerSocket(serverSocket);
    HttpServer httpServer = new HttpServer(httpServerSocket);

    httpServer.run();
  }
}

From there, I am using the Java.net ServerSocket class to create a server socket. This is the server socket that I am going to pass into an instantiation of an HttpServerObject, which is the concrete implementation of the IServerSocket interface. 

__IServerSocket (interface)__

```
public interface IServerSocket {
  public ISocketConnection acceptConnection() throws IOException;
}
```


__HttpServerSocket__

```
public class HttpServerSocket implements IServerSocket {

  private ServerSocket serverSocket;

  public HttpServerSocket(ServerSocket serverSocket) {
    this.serverSocket = serverSocket;  
  }

  public ISocketConnection acceptConnection() throws IOException {
    Socket socket = serverSocket.accept();
    InputStream inputStream = socket.getInputStream();
    OutputStream outputStream = socket.getOutputStream();
    return new HttpSocketConnection(socket, inputStream, outputStream);
  }
}
```

You can see in the second code snippet where we are relying on the Java.net ServerSocket and Socket classes. This is exactly what we want in the concrete implementation that will actually be used in the application. But what about when we are trying to test the server? In the main class, after we are creating the HttpServerSocket object, we are injecting it into the HttpServer class.


__HttpServer__

```
public class HttpServer {

  private Integer port;
  private IServerSocket serverSocket;

  public HttpServer(IServerSocket serverSocket) {
    this.serverSocket = serverSocket;
  }

  public void run() {
    try {

      ISocketConnection socketConnection = serverSocket.acceptConnection();
      HttpRequest httpRequest = requestParser.parseRequest(socketConnection);
      handler.handleRequest(httpRequest);

    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

Take a look at how we are using the interface. I am declaring in the constructor that the type of the serverSocket is IServerSocket. But wait, in Main, we said that the type is HttpServerSocket. What this allows us to do is any time we create an implementation of HttpServer, we can inject any class that implements this interface. This comes in handy when we test because we can send in the MockServerSocket implementation instead of the HttpServerSocket. In this server class, we are calling the `acceptConnection()` method which creates a socket and returns a HttpSocketConnection. We will get to another interface that deals with that in a minute, but first, let's see what is happening in the MockServerSocket.


__MockServerSocket__

```
public class MockServerSocket implements IServerSocket {
  boolean acceptConnectionCalled = false;

  public ISocketConnection acceptConnection() throws IOException {
    acceptConnectionCalled = true;
    return new MockSocketConnection();
  }

  public boolean acceptConnectionCalled() {
    return acceptConnectionCalled;
  }
}
```

The MockServerSocket still has the `acceptConnection()` method, which still returns an ISocketInterface object, but the guts are completely different. First of all, we are not depending on any Java.net classes here, nor are we returning a HttpSocketConnection object. We have created, by specifying that the return value will be the interface type, the flexibility to return a different concrete implementation of the same interface.

This all brings us to the ultimate goal of testing the server. 


__HttpServerTest__

```
public class HttpServerTest extends junit.framework.TestCase {

  MockServerSocket serverSocket;

  protected void setUp() {
    serverSocket = new MockServerSocket();
    
    HttpServer server = new HttpServer(serverSocket);

    server.run();
  }

  public void testAcceptConnectionCalled() {
    assertTrue(serverSocket.acceptConnectionCalled());
  }
}
```

In the mock I have a method that allows me to return a Boolean flag that is set to false initially, but reset to true when the method is called. In my server, I don't actually care if the sockets were created; that's a test for the HttpServerSocket class. The only thing I care about from my socket's perspective is that this method was actually touched. If I was passing the method a value, that the value was handled correctly.

I mentioned that I was dealing with a nested interface. This means that a method in my interface (`acceptConnection()`) is returning a interface type (ISocketConnection).


__ISocketConnection__

```
public interface IConnection {
  public InputStream getInputStream();
  public OutputStream getOutputStream();
  public void closeConnection() throws IOException;  
}
```

In the application, I am returning a HTTPSocketConnection


__HttpSocketConnection__

```
public class HttpSocketConnection implements ISocketConnection {

  private Socket socket;
  private InputStream inputStream;
  private OutputStream outputStream;

  public HttpSocketConnection(Socket socket, InputStream inputStream, OutputStream outputStream) {
    this.socket = socket;
    this.inputStream = inputStream;
    this.outputStream = outputStream;
  }

  public InputStream getInputStream() {
    return this.inputStream;
  }

  public OutputStream getOutputStream() {
    return this.outputStream;
  }

  public void closeConnection() throws IOException {
    inputStream.close();
    outputStream.close();
    socket.close();
  }
}
```

In the tests, I will opt to return a MockServerConnection. 


__MockServerConnection__

```
public class MockSocketConnection implements ISocketConnection {
  boolean getInputStreamCalled = false;
  boolean getOutputStreamCalled = false;
  boolean closeConnectionCalled = false;
  String stubbedInputStream = "";

  public InputStream getInputStream() {
    InputStream mockInputStream = new ByteArrayInputStream(stubbedInputStream.getBytes());
    getInputStreamCalled = true;
    return mockInputStream;
  }

  public OutputStream getOutputStream() {
    OutputStream mockOutputStream = new ByteArrayOutputStream();
    getOutputStreamCalled = true;
    return mockOutputStream;
  }  

  public void closeConnection() throws IOException {
    closeConnectionCalled = true;
  }

  public void stubInputStream(String inputStream) {
    stubbedInputStream = inputStream;
  }

  public boolean getInputStreamCalled() {
    return getInputStreamCalled;
  }

  public boolean getOutputStreamCalled() {
    return getOutputStreamCalled;
  }

  public boolean closeConnectionCalled() {
    return closeConnectionCalled;
  }
}
```

By using the mock, I am able to stub the input and output streams, items that are associated with the Java.net socket class. This means that in my test when I want to check an input stream for whatever reason, I can stub a fake input stream rather than requiring connectivity over a browser. I am using this capability in my request parser tests becauase there I am injecting a MockServerSocket which depends on a MockSocketConnection, giving me the ability to stub the value of the input stream. 

Using interfaces allows a lot more flexibility to mock interactions that you otherwise have no control over or exist outside of your application. Nested interfaces can be used when there is a need to return different types from an interface method. 