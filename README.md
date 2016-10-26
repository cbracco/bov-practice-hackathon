# md-practice-hackathon

> By @cbracco and @ModernTek

## Overview

This repository contains our attempt at Project #1 of the [MD Practice Hackathon](https://study.moderndeveloper.com/new-updates/october_2016/practice-hackathon-details/). We have chosen the following four UI elements to create:

- [Accordion](http://materializecss.com/collapsible.html)
- [Modal ](http://materializecss.com/modals.html)
- [Popover  ](http://getbootstrap.com/javascript/#dismiss-on-next-click)
- [Wave ](http://materializecss.com/waves.html)

## Usage

### Accordion

The accordion UI element is useful for condensing groups of content on a website into collapsed sections that can be expanded by the user when clicking its associated toggle button.

#### Structure

The HTML for this UI element is as follows:

```html
<div class="accordion">
  <div class="accordion-panel">
    <h1 class="accordion-toggle">First</h1>
    <div class="accordion-content">...</div>
  </div>
  <div class="accordion-panel">
    <h1 class="accordion-toggle">Second</h1>
    <div class="accordion-content">...</div>
  </div>
  <div class="accordion-panel">
    <h1 class="accordion-toggle">Third</h1>
    <div class="accordion-content">...</div>
  </div>
</div>
```

#### Assets

Make sure to also include the required CSS and JS in your web page and initialize it, like so:

```html
<html>
  <head>
    <link rel="stylesheet" href="./path/to/accordion.css">
  </head>
  <body>
    <div class="accordion">...</div>
    <script src="./path/to/accordion.js"></script>
    <script>accordion.init();</script>
  </body>
</html>
```

[View the demo](https://cbracco.github.io/md-practice-hackathon/#demo-accordion)

### Modal

[Description]

[Structure]

[Assets]

[View the demo](https://cbracco.github.io/md-practice-hackathon/#demo-modal)

### Popover

Add small overlay content, like those found in iOS, to any element for housing secondary information.
This is static popover. I did not finish it. The *dismiss* should be added.

####Structure
The HTML for this UI element is as follows:

```html

<html>
  <head>
    <link rel="stylesheet" href="./path/to/popover.css">
      </head>
      <body>
        <div class="popover popover-left">
          <span class="popover-title">Popover left</span>
          <p>This is left content</p>
        </div>
        <div class="popover popover-right">
          <span class="popover-title">Popover right</span>
          <p>This is right content</p>
        </div>
        <div class="popover popover-top">
          <span class="popover-title">Popover top</span>
          <p class="popover-content">This is top content</p>
        </div>
        <div class="popover popover-bottom">
          <span class="popover-title">Popover bottom</span>
          <p>This is bottom content</p>
        </div>
      </body>
    </html>  
```


####Assets
Make sure to also include the required CSS in your web page and initialize it, like so:

```html
<html>
  <head>
    <link rel="stylesheet" href="./path/to/popover.css">
  </head>
  <body>
    <div class="popover">...</div>
  </body>
</html>
```

[View the demo](https://cbracco.github.io/md-practice-hackathon/#demo-popover)

### Wave

Wave allows to create the ink effect outlined in Material Design. This is an atempt to create waves with Material Design which allows to implement the “ripple” effect using just CSS. This work based on this [article] (https://ghinda.net/article/css-ripple-material-design/). This work is not finished, but I was able to accomplish some "ripple" effect.

####The HTML structure for this UI element as follows:

```html
<html>
  <head>
    <link rel="stylesheet" href="./path/to/wave.css">
      </head>
      <body>
        <div class="button">
          <scan class="title">wave</scan>
          <div>
            <input type="checkbox" name="r" id="r1">
              <label for="r1"></label>
          </div>
          <div></div>
          <div> 
            <input type="radio" name="r" id="r2">
              <label for="r2"></label>
          </div>
          <div></div>
          <div>
            <input type="radio" name="r" id="r3">
              <label for="r3"></label>
          </div>
          <div></div>
          <div> 
            <input type="radio" name="r" id="r4">
              <label for="r4"></label>
          </div>
        </body>
 </html>    
```

###Assets
Make sure to also include the required CSS in your web page and initialize it, like so:

```html
<html>
  <head>
    <link rel="stylesheet" href="./path/to/wave.css">
  </head>
  <body>
    <div class="button">...</div>
  </body>
</html>
```

[View the demo](https://cbracco.github.io/md-practice-hackathon/#demo-wave)

