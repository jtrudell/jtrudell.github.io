---
layout: post
title:  "JavaScript Objects Look Suspiciously Similar to Ruby Hashes"
date:   2015-09-12
---

### Ruby vs. JavaScript

#### JavaScript Objects Look Suspiciously Similar to Ruby Hashes

<p class="intro"><span class="dropcap">C</span>ertain JavaScript objects, Javascript object literals (there are also JavaScript prototype objects, which are similar to Ruby classes, just not as inuitive. Because, JavaScript!), look identical to hashes in Ruby which use symbols as keys (as opposed to hash rockets following a string or integer as a key, ala "key_1" => 1, which are also kosher for use in hashes in Ruby). Here's a hash in Ruby:</p>


{% highlight ruby %}
pony = {color: "yellow", type: "earth pony", cutie_mark: false}
{% endhighlight %}

And here is an object literal in JavaScript:

{% highlight javascript %}
var pony = {
  color: "yellow",
  type: "earth pony",
  cutieMark: false
};
{% endhighlight %}

Other than the certain syntax differences in the JS version (variable begins with "var". semi-colon after the closing brace and the camelcase in "cutie mark"), they are identical. You would call the properties slightly differently, however. In Ruby, if you want to know what color the pony is, you would use pony[:color], because the word "color" in this case is a symbol (denoted by a semi-colon), not a string; in JavaScript, it is pony.color or pony\["color"] (the latter would also work with a Ruby hash, if instead of a symbol for color you used "color" => as the key). These differences are largely cosmetic. Both a Ruby hash and a JavaScript object literal let you define a set of key/value pairs associated and assign that set of pairs to a variable. You can even add key/value pairs to existing JavaScript objects and Ruby hashes in a similar way (in JS, pony.name = "Applejack" or pony["name"] = "Applejack" and in Ruby, pony[:name] = "Applejack" or pony["name"] = "Applejack").

The underlying difference is in how Ruby and Javascript use objects. In Ruby everything (or almost everything, I'm told) is an object. A string is an object, a symbol is an object, a hash is an object, an integer is an object, and yes, an object is an object. In JavaScript, not everything is an object--booleans, strings, and numbers are not objects. A string literal, Like var x = "earth pony" (which is different from an actual String object in JS, created by declaring var x = newString("earth pony")), in JavaScript is a primitive value, and not an object. Objects are groupings of properties and respond to certain methods, and "earth pony" and the number 4, in Javascript, technically do not have properties and methods--they are just the space taken up by the bits necessary to create the values "earth pony" and 4. The reason that you can use methods on string literals is that Javascript coerces them into String (note the capital "S") objects, much like it can coerce the string "4" into the number 4 (which is something Ruby would not do).