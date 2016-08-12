---
layout: post
title: IO Streams
date: 2016-08-10
---

Essentially, An input/output (IO) stream is a way for a Java program to interact with the outside world, a powerful abstraction that represents a source of continuous data entering or exiting a program. The source or destination of data can be one of a wide range of entities - such as a file on disk, a network connection, a keyboard or any peripheral device, or another program. The types of IO can be categorized three ways: console IO, file IO and network IO. In console IO, the end user usually supplies input by keyboard and receives generated output on display screen. In file IO, input is supplied from and output is redirected to a file stored on disk. In network IO, input comes from a networked resource and output is sent to the networked resource over the network.

All data is transmitted as binary data, allowing any kind of data to be sent between your program and another entity - so long as you know what kind of data to expect, so that it can be correctly interpreted from its underlying binary form. Many of the Java classes relating to IO streams are intended to make sending and receiving data of a particular type easier by handling the translation of that datatype to and from its binary from.


### Byte Streams

Java byte stream classes handle the fundamental IO of raw binary data, parsing it in increments of one byte. All Java byte stream classes inherit from the `InputStream` and `OutputStream` classes. Data is received via InputStream and its descendants by calling the read method and is sent via `OutputStream` and its descendants by calling the write method.

Both methods can raise an `IOException` in the case that an IO operation is interrupted or fails. All IO streams also require that you call the close method to signify that you are finished with IO operations and to allow the system to free up the associated resources.


### Special Streams

Some other stream classes that extend the functionality of byte streams are character streams, data streams, and object streams. These classes are wrappers for a byte stream, although you don’t always need to specify one at initialization. In each case, they offer greater functionality directed towards sending and receiving different kinds of data. Character streams read and write data in increments of one character and handle translating between character encoding and its binary form. Character streams inherit from the abstract `Reader` and `Writer` classes. Some character stream classes offer additional functionality, such as reading text a line at a time using `BufferedReader` or writing a line at a time using `PrintWriter`.

Data streams handle parsing binary data as any primitive datatype in Java and implement the `DataInput` or `DataOutput` interface. These interfaces have read and write methods for every type of data - ie `readChar`, `writeInt`, `readBoolean`, `writeDouble`, etc.

Object streams handle parsing objects to and from binary data, although they can also handle reading and writing primitive datatypes as well. The object streams are `ObjectInputStream` and `ObjectOutputStream`, which implement the `ObjectInput` and `ObjectOutput` subinterfaces of `DataInput` and `DataOutput`. `writeObject` and `readObject` are the methods used to send and receive objects. `writeObject` handles the tricky matter of determining the full chain of references from the written object to other objects, and references from those objects to other objects, and so on. All of these objects are then written to the stream. In this way, the object should behave as expected once it, and all of its referents, have been read from the stream. It is also useful to note that writing the same object to the same stream multiple times cannot result in the object being read from the stream more than once.


### Buffered Streams

Streams can also be buffered or unbuffered. Every read and write to an unbuffered stream is immediately handled by the underlying operating system, which can trigger time-consuming actions like disk or network access. Buffered streams read and write to a space allocated in system memory and only delegate to the OS when the buffer is empty (in the case of reads) or full (in the case of writes). In Java, `BufferedInputStream` and `BufferedOutputStream` are buffered byte streams and `BufferedReader` and `BufferedWriter` are buffered character streams. Each is implemented as a wrapper of the corresponding unbuffered stream.

A program can convert an unbuffered stream into a buffered stream by passing the unbuffered stream object to the constructor for a buffered stream class. For example, In Java, console input is accomplished by reading from `System.in`. To obtain a character based stream that is attached to the console, wrap `System.in` in a `BufferedReader` object. `BufferedReader` supports a buffered input stream, as in this bit from a Java Server example:

```
  BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
```

### Reading Http requests

Something I struggled with a bit yesterday was reading an Http request from a buffered stream because I did not fully understand the difference between Java's `BufferedReader` classes `readLine()` and `read()`. I was passing three different test cases of sample http requests, one with just the standard start line, one that included a header, and one that included a body with the request. The request lines, in that order looked like this:

```
"GET / HTTP/1.0\r\n\r\n"
"POST /index.html HTTP/1.0\r\nAccept: text/plain\r\n\r\n"
"GET /index.html HTTP/1.0\r\n\r\nHello World\r\n\r\n"
```

I was testing these requests in the context of a request parser. In case you are not familiar with an http request format, check out my [previous post](http://nicolecarpenter.github.io/2016/08/04/http.html) on the topic. Basically what I am trying to accomplish here is to split up the request into five parts: method, uri, httpVersion, headers and body. The last two items, header and body, are optional. What I want is to parse a request, as one of those above, and return an http object with each of those items as attributes. Let's take a look at the test for the first request string.


```
  socketConnection.stubInputStream("GET / HTTP/1.0\r\n\r\n");
  HttpRequest request = requestParser.parseRequest(socketConnection);

  public void testParseRequest() throws IOException {
    socketConnection.stubInputStream("GET / HTTP/1.0\r\n\r\n");
    HttpRequest request = requestParser.parseRequest(socketConnection);

    assertEquals("GET", request.getMethod());
    assertEquals("/", request.getUri());
    assertEquals("HTTP/1.0", request.getHttpVersion());
    assertEquals(new HashMap<>(), request.getHeaderLines());
    assertEquals("", request.getBody());
  }
```

I am returning a HttpRequest object and I am expecting the method to be "GET", the uri route to be "/", the httpVersion to be "HTTP/1.0" and the headers and body to be empty. This test actually passed perfectly with my code as it was, so I wrote a test to check for headers.

The second http string included a header "Accept: text". The content of the header is inconsequential; I just wanted to make sure that the request was being parsed into the appropriate pieces. But that was not the case, and I was getting a null pointer exception. When I figured out that my while loop where I was reading from the buffer was wrong, I made some minor adjustments. I was using `readLine()` to read from the buffer, and the error was popping up that here:

```
HttpRequestParserTest > testParseRequest FAILED
  junit.framework.ComparisonFailure: expected:<HTTP/1.0Accept: text> but was:<HTTP/1.0>
```

I had created a split function that would use Java's `split` function to separate on a delimeter. In order to split the request, I was first splitting on `\r\n\r\n`, so that would separate the head (start line and headers) from body. Then I was splitting the head by `\r\n`, which would split on newlines. From there, I was splitting the start on spaces to separate the method | uri | httpVersion. I was also splitting the headers on `\n` and then into key value pairs. 

So why was the header melting into the start line? When I tried this with the body, the same thing happened. It was brought to my attention that I was not fully understanding what `readLine()` was doing when reading from the buffer. `readLine()` does exactly what it says, it reads line by line from the buffer. I was going to loop through all lines and save all concatinated as a single string, and then split the string in the ways I just described. But alas, a fatal flaw.

According to the docs, `readLine()` pulls down chunks of code separated by newlines, carraige returns, or blank spaces, but then it drops those characters. That means that the final string I was getting did not have any `\r` or `\n` characters remaining. 

My first attempt to fix this was by adding a newline after each readline. This did solve the problem in some areas, but it did not allow me to maintain the original blank line between the head and body. It also gave me a useless newline at the end that I would have had to deal with. This strategy also posed another problem in that when I was splitting on delimeters, I was having to escape backslashes. Oh, and the worst problem, I could no longer differentiate between a `\r\n\r\n` and `\r\n` to split the request. 

The final solution was to use `read()` instead of `readLine()`.


```
private static String readFromBuffer(BufferedReader bufferedReader) throws IOException {
  StringBuilder rawRequest = new StringBuilder();
  int value;
  while ((value = bufferedReader.read()) != -1) {
    char c = (char)value;
    rawRequest.append(c);
  }
  return rawRequest.toString();
}
```

`read()` works differently from `readLine()` in that read returns the int value of each character. That means that you can capture slashes and newline characters the same way as letters and numbers because each is read individually. I am not losing these extra characters. 