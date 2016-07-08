---
layout: post
title:  "Ruby: Permissions when writing to files"
date:   2015-10-06
---


#### File Permissions
Understanding file permissions when you write to files is important, because if you use the wrong permission, you could have unintended consequences (overwriting an entire file when you only meant to add something to the existing content, for example). Of course file permissions aren't unique to ruby, and they aren't unique to writing to files (there are permissions for reading and executing files as well, among others) but since I'm spending a lot of my time writing ruby and writing to files, you are going to get ruby examples of writing to files.

In ruby, we can use the File class to open and write to files. For example:

{% highlight ruby %}

  my_file = 'my_little_pony.txt'

  File.open(my_file, 'w') do |file|
    file.write("Rainbow Dash")
  end

{% endhighlight %}

The above code will open a file called 'my_little_pony.txt' (note: File.open will create the file if it doesn't already exist, and then open it), and write "Rainbow Dash" to that file. When using File.open, the first argument is the name of the file you are opening and the second argument, the 'w', is the file permission. 'w' is shorthand for 'write' and indeed that's what happened. If you open my_little_pony.txt you will see a single line of text, "Rainbow Dash". But what if we want to add Pinkie Pie to my_little_pony.txt?

{% highlight ruby %}

  File.open(my_file, 'w') do |file|
    file.write("Pinkie Pie")
  end

{% endhighlight %}

Awesome, now we have Pinkie Pie in our file of ponies! Let's check it out. Open my_little_pony.txt and...hey! Where did Rainbow Dash go? Now our file only includes Pinkie Pie.

#### the thing about 'w' is that it is kind of overzealous

So it's true, the 'w' argument will write to the file. Unfortunately, it will also overwrite the entire file. If we want to just add on to the existing file, and not overwrite the entire thing, we can use 'a' for append. Let's rewind our last code and assume our file still has Rainbow Dash in it.

{% highlight ruby %}

  File.open(my_file, 'a') do |file|
    file.write("Pinkie Pie")
  end

{% endhighlight %}

That one little letter did it. Now we have Rainbow Dash and Pinkie Pie in our file, but they are all smooshed together on one line. Let's rewind that last code too and add a new line character (and let's also use the shorthand curly braces rather than do/end since our code block is only one line).

{% highlight ruby %}

  File.open(my_file, 'a') {|file| file.write("\n Pinkie Pie")}

{% endhighlight %}

And there you have it, Rainbow Dash and Pinkie Pie, written to a file on separate lines. There's a lot more you can do with file permissions, but the difference between 'w' and 'a' trip a lot of people up -- keep them in mind when you decide how you want to write to your file.
