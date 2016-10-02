---
layout: post
title:  "Structs: Some more Ruby (and a little C)"
date:   2016-10-02
---

<p class="intro"><span class="dropcap">I</span> had a dream the other night about structs. I was a struct master (this is like being a ninja, only dorky). Are you relatively new to Ruby, but have a good handle on classes? Are you afraid of Structs, or haven't heard of them? This post is for you.</p>

## What's a Ruby struct?

Struct is a class in Ruby. Just like Hash is a class in Ruby and you can use Hash.new, you can use Struct.new. Hash.new without any arguments creates a new, empty hash; Struct.new creates a new struct (you do have to pass at least one argument to it; more on that below). You know what a hash is (a data structure that stores key value pairs), but what on earth is a struct?
A "struct" in programming is a type of data structure; in fact, it just means "structure". It initially came from the C programming language, where everything is "typed". In C if you want to declare a variable, you have to tell it what type of thing it is going to hold.

For example, in ruby we can do this:

{% highlight ruby %}

x = 3 # an integer, or int in C
y = 'Aruba' # a string, or 5 chars (characters) in C
z = 3.14 # a float with 2 decimal points, or a double in C

{% endhighlight %}

In C we would have to do this:

{% highlight c %}

int x = 3; /* Hey program, x is an int! */
char y[5]  = 'Aruba'; /* Hey program, y is 5 chars! */
double z = 3.14; /* Hey program, z is a double! */

{% endhighlight %}

Typing in C applies to everything, not just simple data structures. Got an array in C? You couldn't put x, y and z in it, because they hold 3 different data types. If you want to hold data of different types in C, you have to get creative and use a more complex data structure. And that's where structs come in.

Our array in ruby: 

{% highlight ruby %}

w = [x, y, z] # An integer, a string and a float in one array? A-ok!

{% endhighlight %}

Our array in C:

{% highlight c %}

int, char, double w[] = {x, y, z}; /* nope, will break */
int w[] = [x, 2, 3]; /* ok, an array of type int */

{% endhighlight %}

We can't use an array to hold different types in C, but we could use a struct: 

{% highlight c %}

/* define a variable 'our_struct', of type struct */
struct our_struct
{
  int x;
  char y[5];
  double z;
};

{% endhighlight %}

The above C struct is a "structured data type": you can reuse it, much like a class, as long as it has the same "structure": x has to be an integer, y has to be an array of 5 chars, and z has to be a double.

For example:

{% highlight c %}

/* Declare an empty variable, w, which is a struct of the type our_struct */

struct our_struct w;

/* start assigning values to it */

w.x = 3;
w.y = 'Aruba';
w.z = 3.14;

{% endhighlight %}

### Ok, great, but why do we care about structs in Ruby?
In ruby we can throw all different types of data into an array, or a hash, or any other data structure. Ruby doesn't care about types in the same way that a strictly typed language like C does.

Ruby doesn't *generally* care about types, until it does. For example:

{% highlight ruby %}

class ThreeThings
  attr_accessor :num1, :num2, :word

  def initialize(num1, num2, word)
    @num1 = num1
    @num2 = num2
    @word = word
  end

  def add
    num1 + num2
  end

  def say
    word
  end
end

x = ThreeThings.new(1, 2, 'hi')

x.add
=> 3

x.say
=> 'Hi'

y = ThreeThings.new(3,'yo', 4)

y.add
=> TypeError: String can't be coerced into Fixnum

y.say
=> 4

{% endhighlight %}

Well, that's no good! We can't add the integer 3 and the string 'yo' (in Ruby speak, we can't coerce 'yo' into being a number). How could we prevent that from happening? We could always check is @num1 and @num2 are numbers, and if they are not try to call .to_i or .to_f on them, but that's cumbersome. We can do better.

First, notice that a lot of the ThreeThings class declaration is taken up by declaring instance variables and attr_accessor methods. One reason people like Structs in ruby is that they can behave as mini classes. So we can do this:

{% highlight ruby %}

ThreeThings = Struct.new(:num1, :num2, :word)
z = ThreeThings.new(6, 11, 'cowabunga!')

z.num1
=> 6

z.word
=> cowabunga

{% endhighlight %}

That's pretty convenient, we got our attr_accessors and instance variables all defined in one line of code by passing them as arguments to Struct.new. That alone is a good reason to use a struct (and more on this reason below)--you need to create multiple collections of data that all share similar characteristics, but don't need the overhead of a class.

But what if we wanted to define our own instance methods? Can we combine a Struct and a class? Yes! (Should we? Eh...)

{% highlight ruby %}

class ThreeThingsAgain < Struct.new(:num1, :num2, :word)
  def add_it_again
    num1 + num2
  end

  def say_it_again
    word
  end
end

{% endhighlight %}

Class ThreeThingsAgain works mostly like class ThreeThings, only it inherits from a struct so we don't need to use the initialize method, or define attr_accessors--the Struct class in Ruby does that for us.
Caveat: inheriting from structs, while convenient, isn't ideal (for one thing, do you REALLY want to initialize your class with public instance variables that can be read and written to all over the place? Read <a href="http://thepugautomatic.com/2013/08/struct-inheritance-is-overused/" target="_blank">this</a>). 

Inheriting from a struct is clever, but probably the best use of structs in Ruby is as a plain grouping of data.

Which leads us back to this:

{% highlight ruby %}

class ThreeThingsThree
  attr_accessor :a_struct

  def initialize(a_struct)
    @a_struct = a_struct
  end

  def add
    a_struct.num1 + a_struct.num2
  end

  def say
    a_struct.word
  end
end

MyStruct = Struct.new(:num1, :num2, :word)
justin_for_lyfe = MyStruct.new(1, 2, 'Justin Bieber')
belieber = ThreeThingsThree.new(justin_for_lyfe)

belieber.add
=> 3

belieber.say
=> Justin Bieber

{% endhighlight %}

So, we initialized a class with a struct. We don't have to worry about variable order when creating instances of our class since we only use one argument in the initialize method, but we still need to worry about order when creating new MyStruct objects. Because new instances of MyStruct don't require arguments when they are initialized (unlike new instances of ThreeThingsThree, which would break if we tried to create a new instance without one argument), we can mitigate the argument order issue by using good naming conventions in our when we create a new Struct:

{% highlight ruby %}

# we could do this
selena_rules = MyStruct.new(6, 8, 'Selena Gomez')

# But we could also just do this:
selena_still_rules = MyStruct.new

selena_still_rules.num1 = 6 # num1? Must be a number!
selena_still_rules.num2 = 8 # ditto
selena_still_rules.word = 'Selena Gomez' # word? Must be a string!

selena = ThreeThingsThree.new(selena_still_rules) # yahoo!!

{% endhighlight %}

As long as we have used descriptive names for our instance variables when we define our struct, we have a road map for what data type goes where. If we had instead defined MyStruct as Struct.new(:x, :y, :z), we'd be in trouble (much like Justin Bieber)

## Structs are cool

Not as cool as ninjas, but still pretty cool. Questions, comments, corrections to my C syntax? All welcome. Leave a comment!

### Further reading:
- <a href="https://pythonconquerstheuniverse.wordpress.com/2009/10/03/static-vs-dynamic-typing-of-programming-languages/" target="_blank">Static vs. dynamic typing of programming languages</a>
- <a href="https://www.youtube.com/watch?v=6RLxPdZ59y0" target="_blank">Harvard CS50 Video on Structures</a> (Entire <a href="https://www.edx.org/course/introduction-computer-science-harvardx-cs50x" target="_blank">Harvard CS50 intro to CS class</a> is free online and highly recommended)
- <a href="https://ruby-doc.org/core-2.2.0/Struct.html" target="_blank">Go to the source: Ruby Struct Documentation</a>