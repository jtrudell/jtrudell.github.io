---
layout: post
title:  "Ruby: blocks, procs and lambdas"
date:   2015-09-06
---

####blocks

<p class="intro"><span class="dropcap">F</span>irst, the easy part: blocks! Two ways of representing the same block in Ruby are set out below. In the first case, the block is inside curly braces; in the second, the block is between the words "do" and "end". You would generally reserve use of curly braces to encapsulate blocks that can be expressed in one line or code, and do/end statements for blocks that stretch our over more than one line.</p>

{% highlight ruby %}
[1,2,3,4,5].each { |number| number * 2 }

[1,2,3,4,5].each do |number|
  number * 2
end
{% endhighlight %}

"|number| number * 2" is the block of code. It is passed to the method .each, and .each runs that block of code on each number in the array. Think of blocks as "blocks of code" and you should be ok.

####procs
Next up, procs. In the simplest terms, a proc is a block assigned to a variable, like "x = |number| number * 2", only with slightly more complicated syntax. In order to assign a code block to a variable, you have to create a new proc. Let's see how that works:

{% highlight ruby %}
some_code = Proc.new { |number| number * 2 }
[1,2,3,4,5].each(&some_code)
{% endhighlight %}

Here, we have created a variable called some_code, which is equal to a new proc. We have created the new proc by calling Proc.new and then typing the code block after it. On the next line, we have again called .each on the array, but instead of typing out the block, we have sent each an argument "&some_code". The & symbol before our some_code variable let's the .each method know to expect a proc and not give us an error. The code block is sent to the .each method the exact same way as if we had typed it out like we did in the section on blocks above.

Why use procs? Imagine that you need to pass the same bit of code over and over to different methods, and that the code block is much more complicated than just "|number| number * 2". Rather than typing the block repeatedly, you could create a proc with the code block and assign that proc to a variable. Thereafter, you could just pass the variable, preceded by an &, to the methods that need your code block. DRY!

####lambdas
Finally, lambdas. Just like procs are resuable fancy blocks, lambdas are sort of fancy procs. Lambdas are code blocks like procs, but with additional functionality. Lambdas recognize arguments; procs don't. If your method requires 2 arguments and you called it with a proc using only one argument, the proc will run. If you try that with a lambda, you'll get an argument error. Let's see how that works with the code block we have been using and a new method, .call.

{% highlight ruby %}
our_proc = Proc.new { |number| number * 2 }
our_lambda = lambda { |number| number * 2 }
our_proc.call(2, 3)
#this will ignore the 3 and multiply the first argument, 2, by 2

our_lambda.call(2, 3)
#this will raise an argument error, because our_lambda,
#unlike our_proc, knows to look for one argument for the
#variable number, and we have provided two
{% endhighlight %}

You create a lambda like your create a proc, but rather than "Proc.new" you use a lowercase "lambda" followed by the relevant block. In the above code, the method .call does what you would expect: it calls our_proc or our_lamba, and passes our_proc and/or our_lambda arguments if any are provided. In this way both the proc and the lambda are acting like methods, but the lambda is closer to a real method in that it monitors the number of arguments (and does a few other things that are beyond the scope of this blog entry).