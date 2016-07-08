---
layout: post
title:  "Enumerable: group_by"
date:   2015-08-20
---

#### group_by

<p class="intro"><span class="dropcap">S</span>ince Dev Bootcamp wouldn't let me write about my favorite enumerable method of all time, inject, you are getting group_by, which is also pretty useful (just not as awesome as inject). What does group_by do? If you don't include a block of code after you call the method (blocks are the code wrapped in braces include after calling a method (you can also wrap the code in "do" and "end", instead of braces) it returns an enumerator, which I'm not going to address here. If you include a block, according to <a href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-group_by" target="_blank">Ruby Docs</a>, group_by:</p>

<blockquote>"Groups the collection by result of the block. Returns a hash where the keys are the evaluated result from the block and the values are arrays of elements in the collection that correspond to the key."</blockquote>

Yeah, so, in english, it groups a "collection" (range, array, hash) by iterating through each item of the collection and applying the code block to it. The keys are the result of running that block on each item of the collection; the values associated with that key are the items themselves that return that result. So if the block is {|x| x/4}, and the first item in the array group_by has been called on is 8, the key will be 2, and at least one of the values will be 8 (any other item in the array that results in 2 when run through the block would also be a value the key 2 points to). In short, group_by returns the results of calculations as keys, and the items that supply that result as values.

Say, for example, you wanted to split up an array of numbers into two groups: one set even numbers, one set odd. You could do this:

{% highlight ruby %}
[1,2,3,4,5].group_by {|number| number.even? }
#=> {false=>[1, 3, 5], true=>[2, 4]}
{% endhighlight %}

In the above example, you are asking each number in the array if it is even. If it is even, it returns true, which is the key, and that number is a value associated with the true key. If it isn't even it returns false, which is then a key, and that value is associated with the false key. Pretty easy. You don't have to return true or false as keys, you can return as keys anything your code block returns:

{% highlight ruby %}
(1..20).group_by {|number| number % 3.5}
#=> {1.0=>[1, 8, 15], 2.0=>[2, 9, 16], 3.0=>[3, 10, 17],
#    0.5=>[4, 11, 18], 1.5=>[5, 12, 19], 2.5=>[6, 13, 20],
#    0.0=>[7, 14]}
{% endhighlight %}

The above code takes all integers between 1 and 20, and groups them by the remainder they return when divided by 3.5. The numbers 1,8, and 15 return a remainder of 1.0 when divided by 3.5; the numbers 2, 9 and 16 return a remainder of 2.0; etc. And that's a simple explanation of group_by.