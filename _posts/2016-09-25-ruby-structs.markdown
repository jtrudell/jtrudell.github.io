---
layout: post
title:  "Structs: Some more Ruby (and a little C)"
date:   2016-09-25
---

<p class="intro"><span class="dropcap">I</span> had a dream the other night about Structs. I was a struct master. I'm not in real life, so let's fix that!</p>

### What's a struct ?

Struct is a class in Ruby. Just like you can use Hash.new in Ruby, you can use  Struct.new. Hash.new creates a new hash; Struct.new creates a new struct...so what is a struct?
A "struct" in programming is a type of data structure. It initially came from the C programming language, where everything is "typed". In C if you want to declare a variable, you have to tell it what type of thing it is going to hold.
So in ruby we can just do this:

{% highlight ruby %}

x = 3 # integer, or int in C
y = 'Aruba' # string, or 5 chars (characters) in C
z = 3.14 # float with 2 decimal points, or a double in C

{% endhighlight %}

In C we would have to do this:

{% highlight c %}

int x = 3;
char y[5]  = 'Aruba';
double z = 3.14;

{% endhighlight %}

Typing in C applies to everything, not just simple data structures. Got an array in C? You couldn't put x, y and z in it, because they are 3 different data structures. If you want to hold data of different types in C, you have to get creative. And that's where structs come in.

{% highlight ruby %}

w = [x, y, z] # A ok!

{% endhighlight %}

{% highlight c %}

insert_data_type w[] = {x, y, z}; /* nope */
int w[] = [x, 2, 3]; /* ok */

struct our_struct
{
  int x;
  char y[5];
  double z;
};

{% endhighlight}

The above C struct is a "structured data type": you can reuse it, much like a class, as long as it has the same "structure": x is an integer, y is an array of 5 chars, and z is a double.

{% highlight c %}

struct our_struct w; /* Make an empty variable, w, which is type our_struct */

/* start assigning values to it */

w.x = 3;
w.y = 'Aruba';
w.z = 3.14;

{% endhighlight %}

### Ok, great, but why do we care about structs in Ruby?
In ruby we can throw all different types of things into an array, or a hash, or any other data structure. Ruby doesn't (generally) care about types.

Ruby doesn't *generally* care about types, until it does. For example:

{% hightlight ruby %}

class ThreeThings
  attr_accessor :num1, :num2, :word

  def initialize(num1, num2, word)
    @num1 = num1
    @num2 = num2
    @word = word
  end

  def add
    puts num1 + num2
  end

  def say
    puts word
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

{% endhightlight %}

Well, that's no good! How could we prevent that from happening?

First, notice that a lot of that class declaration is taken up by declaring instance variables and attr_accessor. One reason people like Structs in ruby is that they can behave as mini classes. So we can do this:

{% highlight ruby %}

three_things = Struct.new(:num1, :num2, :word)
z = three_things.new(6, 11, 'cowabunga!')

z.num1
=> 6

z.word
=> cowabunga

{% endhighlight %}

That's pretty convenient, we did care about instance methods. But can we combine a Struct and a class? Yes!

{% hightlight ruby %}

class ThreeThingsAgain < Struct.new(:num1, :num2, :word)
  def add_it_again
    puts num1 + num2
  end

  def say_it_again
    puts word
  end
end

{% endhighlight %}

Class ThreeThingsAgain works mostly like class ThreeThings, only it inherits from the struct so we don't need to use the initialize method, or attr_accessor--the Struct class in Ruby does that for us.
But inheriting from structs, while convenient, isn't ideal (for one thing, do you really want to initialize your class with public instance variables that can be read and written to? Read this <link to blog post>). Struct is better as a plaing grouping of data.
Which leads us back to this:

{% highlight ruby %}

class ThreeThingsThree
  def initialize(a_struct)
    @astruct = a_struct
  end

  def add
    puts a_struct.num1 + a_struct.num2
  end

  def say
    puts a_struct.word
  end
end

my_struct = Struct.new(:num1, :num2, :word)
x = my_struct(1, 2, 'Justin Bieber')
z = ThreeThingsThree(x)

z.add
=> 3

z.say
=> Justin Bieber

{% endhighlight %}

So, we initialized a class with a struct. We don't have to worry about variable order when initializing our class (granted, we do need to worry about it in our struct). But we can solve that, because Structs don't require arguments:

{% highlight ruby %}

f = my_struct

f.num1 = 6 # num1? Must be a number!
f.num2 = 8 # ditto
f.word = 'Selna Gomez' # word? Must be a string!

g = ThreeThingsThree.new(f) # yahoo!!

{% endhighlight %}

