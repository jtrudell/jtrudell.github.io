---
layout: post
title:  "Ruby Classes: Who needs Brogrammers when you've got Bronies?"
date:   2015-08-29
---

<p class="intro"><span class="dropcap">F</span>ull disclosure: My favor MLP is Rainbow Dash. I have three little girls. I watch My Little Pony daily. My five yearold contributed to this blog post. And yes, I've seen <a href="http://www.usatoday.com/story/popcandy/2013/09/12/bronies-movie/2805503/" target="_blank">Bronies</a>.</p>

#### MyLittlePony

Let's create a class and make some ponies! Below I've made a class called MyLittlePony, so we can create our own pony objects. Each pony is initialized with three things we will specify when we call MyLittlePony.new: a name, <a href="http://mlp.wikia.com/wiki/Ponies" target="_blank">type of pony</a>, and whether the pony has a <a href="http://mlp.wikia.com/wiki/Cutie_marks" target="_blank">cutie mark</a>. Each pony object is also initialized with a default hometown set to <a href="http://mlp.wikia.com/wiki/Ponyville" target="_blank">Ponyville</a>, and an empty array to list the pony's friends. I've also created two methods: one to let our pony say hi, and the other to list our pony's friends. Since the name of our pony and the type of pony it is should never change (ok ok, so Princess Twilight used to be a Unicorn and now she's an Alicorn, but she's an outlier), I've assigned those variables to attr_reader--objects (including other ponies) outside the MyLittlePony class will be able to read each pony's name and type, but not change it. Since has_cutie_mark could change from false to true (little ponies don't start off with cutie marks, they have to earn them! Or something. Ask my daughters.), and hometown and friends can change (obviously you can add friends, but our ponies will never lose friends!), I've made those variables attr_accessor, so they are both readable and writeable outside the class if we want to change them later (say our pony moves to Canterlot, gains friends, etc.)

{% highlight ruby %}
class MyLittlePony
  attr_reader :name, :type
  attr_accessor :has_cutie_mark, :hometown, :friends

  def initialize(name, type, has_cutie_mark)
    @name = name
    @type = type
    @has_cutie_mark = has_cutie_mark
    @hometown = "Ponyville"
    @friends = []
  end

  def say_hi
    @has_cutie_mark == true ? _do = "do" : _do = "don't"
    puts "Hi! My name is #{@name} and I am an #{@type} pony.
    I live in #{@hometown}. I #{_do} have my cutie mark."
  end

  def list_friends
    @friends.each {|friend| p friend.name}
  end
end
{% endhighlight %}

Now that we've got our MyLittlePony class, let's make some ponies! I'm going to make each of the main characters from the show <a href="https://en.wikipedia.org/wiki/My_Little_Pony:_Friendship_is_Magic" target="blank">Friendship is Magic.</a>

{% highlight ruby %}
twilight = MyLittlePony.new("Twilight Sparkle", "Alicorn", true)
apple_jack = MyLittlePony.new("Applejack", "Earth Pony", true)
rainbow_dash = MyLittlePony.new("Rainbow Dash", "Pegasus", true)
pinkie_pie = MyLittlePony.new("Pinkie Pie", "Earth Pony", true)
rarity = MyLittlePony.new("Rarity", "Unicorn", true)
flutter_shy = MyLittlePony.new("Flutter Shy", "Pegasus", true)
{% endhighlight %}

Wow, that's a lot of ponies. Hey Twilight, say hi to the readers!
{% highlight ruby %}
twlight.say_hi
#=> Hi! My name is Twilight Sparkle and I am an Alicorn pony.
#=> I live in Ponyville. I do have my cutie mark.
{% endhighlight %}

Thanks Twilight! How about we give you some friends? We can do this outside the class by calling twilight.friends=[list some friends here], since we made @friends part of attr_accessor. And we can use the list_friends method to list all of Twilight's friends' names, since each pony's name variable is included in attr_reader.

{% highlight ruby %}
twilight.friends = [apple_jack, rainbow_dash, pinkie_pie,
                    rarity, flutter_shy]
twilight.list_friends

#=> "Applejack"
    "Rainbow Dash"
    "Pinkie Pie"
    "Rarity"
    "Flutter Shy"
{% endhighlight %}

There you have it, a My Little Pony Ruby lesson. Full source code for your solo pony-creating is <a href="/../assets/misc/my_little_pony.rb" target="_blank">here</a>.