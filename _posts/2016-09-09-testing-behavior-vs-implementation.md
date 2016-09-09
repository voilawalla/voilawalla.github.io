---
layout: post
title: Testing Behavior vs Implementation
date: 2016-08-10
---

I sent my mentors a message last night, several hours past when the last dev left the building, proclaming that finally, 6 months into my apprenticeship, I was able to understand the value and meaning behind the idea of testing `behavior vs implementation`. 

If you are a regular consumer of my blog, you probably recognize this topic. This is something that I have struggled to grasp because I had a hard time differentiating the difference between the two words. In my mind, behavior and implementation were interchangable, because if something is implemented correctly, then it is behaving correctly and if something displays the correct behavior, than it was implemented correctly, right? What finally brought me to understand what was happening was my failed attempts at TDD'ing my `FileHandler` for my [Java Http Server](https://github.com/NicoleCarpenter/JavaHttpServer).

On this project I tried to TDD as much as possible, but there was one silly Java thing that was holding me up with the `FileHandlerTest`. The `FileHandler` class had dependencies on three classes: `HttpResponseBuilder`, `FileSystem` and `FileIO`. `HttpResponseBuilder` was the only of the three dependencies that was a concrete class, the other two being interfaces for interchangable mock methods in my tests. `FileSystem` had a `HttpFileSystem` class for the production code and a `MockHttpFileSystem` for testing. `FileIO` classes followed the same pattern.

This is all made possible by Java interfaces. I have spoken previously about interfaces (or protocols in Swift), so I will not get into that here. I pretty much know that any time I am in a situation where I want to mock a dependency, I will need an interface to link the mock to the production class. 


### Example: HttpServerRunner

One example of this is in my `HttpServerRunner` class. In this class, the behavior that I want to test is whether the classes that the server runner depends on are operating as expected. This is where we start to see the point of this blog. I am not actually testing whether the server is actually taking a real request, handling it, formulating a real response, and printing it out to a client browser. The only thing that I should care about here is that the classes that I am depending on, and the appropriate methods in those classes, are being called. Let's take a look at the server runner so that you can see what I mean.

```
public class HttpServerRunner implements Runnable {
  private SocketConnection socketConnection;
  private RequestParser requestParser;
  private Router router;
  private ServerIO serverIO;

  public HttpServerRunner(SocketConnection socketConnection, RequestParser requestParser, Router router, ServerIO serverIO) {
    this.socketConnection = socketConnection;
    this.requestParser = requestParser;
    this.router = router;
    this.serverIO = serverIO;
  }

  public void run() {
    try {
      HttpRequest request = requestParser.parseRequest(socketConnection);
      Handler handler = router.getRoute(request);
      Response response = handler.handleRoute(request);
      serverIO.writeResponse(response.getFormattedResponse(), socketConnection.getOutputStream());
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

As you can see, I am only working with one public method here, `run()`. This method does not return anything, hence the `void` return type, so I know already that I am not testing a return value. I also see that within my `run()` method, I am calling methods from each of three other classes: `requestParser`, `router`, `handler`, and `serverIO`. These are all classes that my `HttpServerRunner` depends on. These are also all interfaces. 

My goal in this situation is to test the behavior. Let's pretend that we are doing this in a non-TDD manner (I would never do that, this is just pretend). I see that each of the first three classes calls a single method and returns an object. I would be tempted to test that the object returned from each of these method calls is what I would expect it to be, however, that would be me testing implementation rather than behavior. Testing implementation would require me to work with a fake or stubbed request, which is a step that could harm the integrity of the test. Actually, I did make that mistake when I was testing based on an improperly formatted request in my `HttpRequestParser` test, but that's for another thread. 

Now to the `HttpServerRunnerTest`. It is pretty basic, but it gets the job done. Here is the set up  

```
public class HttpServerRunnerTest extends junit.framework.TestCase {
  private MockHttpSocketConnection socketConnection;
  private MockHttpRequestParser requestParser;
  private MockHttpRouter router;
  private MockHttpServerIO serverIO;
  private HttpServerRunner server;

  protected void setUp() {
    OutputStream outputStream = new ByteArrayOutputStream();
    InputStream inputStream = new ByteArrayInputStream("anything".getBytes());
    socketConnection = new MockHttpSocketConnection(inputStream, outputStream);
    requestParser = new MockHttpRequestParser();
    router = new MockHttpRouter();
    serverIO = new MockHttpServerIO();
    server = new HttpServerRunner(socketConnection, requestParser, router, serverIO);
    server.run();
  }

  . . .

```

You will note here that the set up of the class is almost exactly the same, save for a couple of extra elements to make my mocks adhere to their interface signatures. Here, I am using the Mock classes where I would have used production classes, all except for the class that I am testing. Now let's look at the tests.

```
  . . .

  public void testParseRequestCalled() {
    assertTrue(requestParser.parseRequestCalled());
  }

  public void testGetRouteCalled() {
    assertTrue(router.getRouteCalled());
  }

  public void testWriteResponseCalled() {
    assertTrue(serverIO.writeResponseCalled());
  }
}
```

I am running the `run()` method in the setup. In these tests I am checking the behavior that the method being run in the server runner is indeed being run. The reason for this is because from a unit test stand point, the unit that I am testing is the `run()` method. I am checking that it is behaving properly, reaching the methods in the dependent classes.


### Example: FileHandler

The aha moment last night came while working with the `FileHandler`. The file handler manages all file requests that come into the server and deals with reading the file or directory and returning a response to be sent back to the client. I was having a hard time testing this class because I don't know how to Java. I was trying to figure out how to create a mock directory and supply mock files for the `FileHandler` to display and link.

I was able to test a file response by mocking the `FileIO.getFileContents(file)` method to return stubbed file contents. This is what my original test class looked like.

```
public void testHandleRouteIsFile() {
  responseBody = "This is a file";
  fileIO = new MockHttpFileIO();
  fileIO.stubResponseBody(responseBody);
  responseBuilder = new HttpResponseBuilder();

  String path = "/Users/foo/application/public/file";
  String uri = "/file";
  fileSystem = new MockHttpFileSystem();
  fileSystem.stubIsFile(true);

  Handler handler = new FileHandler(responseBuilder, fileSystem, fileIO);
  HttpRequest request = new HttpRequest("GET", uri, "", "HTTP/1.1", new HashMap<String, String>(), "");

  response = handler.handleRoute(request);
  HashMap<String, String> testHeaders = new HashMap<>();
  testHeaders.put("Server", "Nicole's HTTP server");

  assertEquals("HTTP/1.1", response.getHttpVersion());
  assertEquals("200", response.getStatusCode());
  assertEquals("OK", response.getStatusMessage());
  assertEquals(testHeaders, response.getHeaderLines());
  assertEquals(responseBody, formatter.bodyToString(response));
}
```

So there are a couple of things going on. Obviously there is a lot of set up for these tests. The `FileHandler` class has dependencies on `HttpResponseBuilder`, `FileIO` and `FileSystem`. I am stubbing the response body, so again I am trying to test for implementation. Also, I am creating a `path` variable that I never actually use. All of my asserts are assuming that I am taking a correctly formatted Http Request and checking that what the request is returning is actually what I should be getting back.

Now, using this method, if I want to create a response for a directory response, instead of returning file contents as a string, I have to disect the directory into the files contained within and then create links to each of the files. Here is what that process looks in the `FileHandler` class.

```
. . .

private HttpResponse buildDirectoryResponse() {
  byte[] directoryContents = new String(htmlHead + buildFileLinks() + htmlFoot).getBytes();
  responseBuilder.buildOkResponse();
  responseBuilder.setBody(directoryContents);
  return responseBuilder.getResponse();
}

private String buildFileLinks() {
  String[] files = fileSystem.list(path);
  StringBuilder directoryContents = new StringBuilder();
  for (String file : files) {
    directoryContents.append(buildLink(file));
  }
  return directoryContents.toString();
}

private String buildLink(String file) {
  String pathSlash = "";
  if (!uri.endsWith("/")) {
    pathSlash = "/";
  }
  return "<a href=\"" + uri + pathSlash + file + "\">" + file + "</a><br>";
}

. . . 
```

Now if I wanted to test a directory response the same way that I am testing the file response, I have to account for a few more things. First, and not really a big deal, the differentiating factor between whether the request is for a file or a directory is a method from Java's `File` io class. I am calling a method called `isFile()`, which if it returns true, I am dealing with a file, otherwise I can assume I am dealing with a directory. A good decision that I have already made is to wrap the `File` methods that I am using in my application with a new interface called `FileSystem`, which means that I can stub the return value of this method. In fact, in the File tests, I am doing just that, stubbing the `isFile()` method to return true. For a directory, I would just have to stub false here instead. 

I am building file links, which involves another wrapped `File` method, `list`. This method, according to the [Java documentation](https://docs.oracle.com/javase/7/docs/api/java/io/File.html#list()), this method, when given a directory path, _"returns an array of strings naming the files and directories in the directory denoted by this abstract pathname."_ There is another similar method, `listFiles` which returns the same objects as `File` objects. Considering that, besides mocking my `isFile()` wrapped method, I will also have to return a String array of files that I am making up when I call this method. 

This smells bad. 

Because I am building a real response with the response builder, I need to make sure that my response will have all of the same elements as would my production code yield. This is making my tests too complicated. My solution: test the behavior instead of the implementation! This only required a bit more code, but less in the tests themselves. 

The first thing I did was to create a `ResponseBuilder` so that I can make a `MockHttpResponseBuilder`. That's pretty much the only change that I made, besides what I am actually testing. Previously I was testing a specific response. Now I am testing the behavior of the methods that lead me to getting that response. I also refactored the tests to make a helper method. 

```
. . .

  protected void setUp() {
    formatter = new Formatter();
    responseBuilder = new MockHttpResponseBuilder();
    fileSystem = new MockHttpFileSystem();
    fileIO = new MockHttpFileIO();
    handler = new FileHandler(responseBuilder, fileSystem, fileIO);
  }

  private HttpResponse testHandleRouteResponse(String uri, boolean isFile, HashMap<String, String> requestHeaders, String responseBody) {
    request = new HttpRequest("GET", uri, "", "HTTP/1.1", requestHeaders, "");
    fileSystem.stubIsFile(isFile);
    fileIO.stubResponseBody(responseBody);
    return handler.handleRoute(request);
  }

  public void testHandleRouteFileFull() {
    String uri = "/file";
    boolean isFile = true;
    HashMap<String, String> requestHeaders = new HashMap<>();
    String responseBody = "this is a file";
    
    HttpResponse response = testHandleRouteResponse(uri, isFile, requestHeaders, responseBody);

    assertTrue(fileSystem.isFileCalled);
    assertTrue(fileIO.getFileContentsCalled);
    assertTrue(responseBuilder.buildOkResponseCalled);
    assertFalse(responseBuilder.setHeaderCalled);
    assertTrue(responseBuilder.setBodyCalled);
    assertTrue(responseBuilder.getResponseCalled);
  }

. . .
```

I can test handling the directory the same way.

```
public void testHandleRouteDirectory() {
  HttpRequest request = new HttpRequest("GET", "/directory", "", "HTTP/1.1", new HashMap<>(), "");

  fileSystem.stubIsFile(false);
  String[] directoryFiles = {"File1", "File2", "File3"};
  fileSystem.stubList(directoryFiles);
  
  response = handler.handleRoute(request);

  assertTrue(fileSystem.isFileCalled);
  assertTrue(fileSystem.listCalled);
  assertTrue(responseBuilder.buildOkResponseCalled);
  assertFalse(responseBuilder.setHeaderCalled);
  assertTrue(responseBuilder.setBodyCalled);
  assertTrue(responseBuilder.getResponseCalled);
}
```

In both of these cases, I am not dealing with actual values, besides those tht are required for the test to run, like the request. I am no longer testing to see if a return value is what I am expecting it to be, but rather whether or not the method behaved as I expected it to, flowing through the correct methods. This is testing behavior vs implementation.