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
    puts "Hi! My name is #{@name} and I am an #{@type} pony. I live in #{@hometown}. I #{_do} have my cutie mark."
  end

  def list_friends
    @friends.each {|friend| p friend.name}
  end
end

twilight = MyLittlePony.new("Twilight Sparkle", "Alicorn", true)

apple_jack = MyLittlePony.new("Applejack", "Earth Pony", true)

rainbow_dash = MyLittlePony.new("Rainbow Dash", "Pegasus", true)

pinkie_pie = MyLittlePony.new("Pinkie Pie", "Earth Pony", true)

rarity = MyLittlePony.new("Rarity", "Unicorn", true)

flutter_shy = MyLittlePony.new("Flutter Shy", "Pegasus", true)

twilight.say_hi

twilight.friends = [apple_jack, rainbow_dash, pinkie_pie, rarity, flutter_shy]
twilight.list_friends