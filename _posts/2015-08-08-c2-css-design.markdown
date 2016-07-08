---
layout: post
title:  "CSS: How the Block and Inline Display Properties Work"
date:   2015-08-08
---

### Block Elements are Bullies and Inline Elements are Good at Sharing

#### display:block

<p class="intro"><span class="dropcap">A</span> webpage is made up of different elements. The date of this entry above (August 8, 2015) is a <a href="http://www.w3schools.com/html/html_headings.asp">heading element</a> (h4, to be precise). This paragraph you are reading right now is a <a href="http://www.w3schools.com/html/html_paragraphs.asp">paragraph element</a>. The icons at the bottom of this page for my Twitter etc. accounts are separate <a href="http://www.w3schools.com/html/html_images.asp">image elements</a>. Elements of a webpage are, by default, displayed in a certain manner on a website. Two comment default display values for elements are "inline" and "block". Block elements form a block that takes up the entire width of the browser window (i.e., the block stretches from the left all the way to the right of the window and no other elements sit on the same line this block occupies). The paragraph element and the heading elements are, by default, block elements.</p>

#### Digression: bullies and sharers

This whole block thing is a little confusing, because the date heading above is really short. What do you mean it takes up the entire width of the window? The content of a block element does not effect the width of the element. Think of the date heading as having an invisible bar running horizantally from from "2015" to the right edge of the window. That invisible bar doesn't care that it is invisible, and is keeping all other elements out of its turf. Here is the invisible bar, highlighted:

![screenshot](/../assets/img/h3screenshot.png)

#### display:inline

"Inline" elements only take up the width they need (unless you add to their width with different CSS properties), and thus do not need to start on a new line all their own (they also don't force the elements that come after them to start on a new line). Block elements do force any element that comes after them to start on a new line. Why? That's right: block elements take up the whole line! They are line bullies. The social media icon images at the bottom of this page are by default inline elements. Inline elements are not surrounded by invisible no-go zones to their left and right, and you can place other elements on the same line as an inline element (assuming that they too are inline elements). Inline elements are line sharers. Awwww, inline elements!

#### You Can Change Display Values Using CSS

While HTML elements have a default display value, you can use <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/What_is_CSS">CSS</a> to change this value. Want to line up a paragraph and an image next to eachother, maybe so the text of the paragraph can wrap around the image? This wouldn't be possible if the default values were in place, because the paragraph element, no matter how wide the actual text of the paragraph, must take up the whole line and an image couldn't sit next to it. With CSS, we can fix this problem, and simply change the display for the paragraph (by default a block element) to display:inline. The image is by default already an inline element, so nothing to do there. Your text and image should (fingers crossed!) now be able to occupy the same lines on your webpage, so the text can fill in where the image does not.

#### Want more CSS?

The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">Mozilla Developer Network</a> is a great resource, as is <a href="http://www.w3schools.com/css/default.asp">W3Schools</a>.
