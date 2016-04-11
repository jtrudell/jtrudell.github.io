---
layout: post
title:  "Return Values in Ruby: implicit, explicit, and puts, print, p"
date:   2016-04-10
---

<p class="intro"><span class="dropcap">I</span>'ve been working a lot with people who are new to Ruby (and new to programming altogether), and a common theme is not understanding the values that are returned from Ruby methods, or that anything is returned at all, and what all this "return" business is all about. I sort of blame this on beginner tutorials that make it seem like the only way to use Ruby is by printing to the console, and here's why:

####What does this return?
Say you've got a method that says hello.

{% highlight ruby %}

def hello
  "Why hello there!"
end

{% endhighlight %}

What does that method return? Most of the people I've been working with lately would answer that it returns absolutely nothing. It does nothing, because it doesn't puts or print anything. But of course it has a return value, the string "Why hello there!" 

"But it doesn't do anythign when I run it in IRB."

"No, that's right, it doesn't print anything to the screen."

"So it's not doing anything."

"Yes it is, it's just not doing anything you can see. It is returning a string."

"Why, if it isn't being printed out?"

####And this is why it is really hard to teach people how to use the return values of methods, which is a really important leap to be able to make (how many times can I use "really" here?)

Yeah, that. REALLY IMPORTANT. You can't start doing amazing things with Ruby until you start using, really using, not just printing to screen using, the return values of methods. And when you've been led to believe that the whole point of Ruby is writing simple programs that interact with the user at the console, then this of course makes no sense at all:

{% highlight ruby %}

def add(x, y)
  x + y
end

def subtract(a, b)
  a - b
end

z = add(subtract(2,1), subtract(4,3))

puts z
2
 => nil

{% endhighlight %}

**WHAT IS HAPPENING!** So many things. Add and subtract are methods with return values. They are one line methods, so the last line is the only line, and the last line of a method in Ruby returns without you telling it to return (this is called an "implicit return"). So when you call subtract(2, 1), 1 is returned. This return value can then be passed around anywere, include into another method (like add), or assigned to a variable. 

####So what is the deal with puts, print and p?

puts and print are both methods that generally do the same thing, print strings to the console. puts also adds a keyboard enter/return (a "\n" newline character), so it will end on a newline; print does not. They each have return values of nil. What they print to the console is NOT their return value. So had we done this with our add method above:

{% highlight ruby %}

def add(x, y)
  puts x + y
end

z = add(2, 1)

3
 => nil

z == 3
 => false

z == nil
 => true

{% endhighlight %}

We would get the rather unexpected result of z being nil instead of 3. This is because we aren't returning x + y in our add method, we are returning puts x + y, and puts and print always returns nil. (p is a little different. It both prints to the screen and returns, because it is shorthand for the inspect method. Use p to debug, but then pull it out of your methods.) This can and has caused hours of confusion and head-banging-against-wall for beginners, who can't figure out why everything is suddenly nil.

###$Explicit return

You don't have to return the last line of a method. Ruby will do that automatically as mentioned above, but if you'd rather return line 1 of a 2 line method, you could.

{% highlight ruby %}

def add(x, y)
  return "Why hello there!"
  x + y
end

add(2, 6)
 => "Why hello there!"

{% endhighlight %}

In the above example, 2 + 6 would never happen, because "Why hello there!" is returned first, and you can only return once in a method. (Remember "Why hello there!" would be returned, but not printed to the screen, because we didn't print, puts or p "Why hello there!" or puts/print/p add(2, 6) directly.) Why would you want to return before the last line of a method? Error handling, mostly. Returning exits your method. 

{% highlight ruby %}

def hello(name)
  return "Cat got your tongue?" if name.empty?
  "Why hello there!"
end

puts hello("")
"Cat got your tongue?"
=> nil

puts hello("Ruby")
"Why hello there!"
=> nil

{% endhighlight %}

In the first example, "Why hello there!" never happens because the name is an empty string, and "Cat got your tongue?" is returned, immediately exiting the method. We don't want to say "Why hello there!" to someone who won't even bother to give us their name.

###Back to those tutorials and what to do about them
I don't know what the answer is. I'm complaining, but I did those same tutorials. I puts'd a ton of stuff to the console. I struggled with all of the above. Is there a better way to teach beginners? Seeing something printed to the console IS totally satisfying, and provides immediate feedback, but then again, so do error messages. Ideas? Anything alternatives that you've seen work?
