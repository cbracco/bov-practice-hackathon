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

[Description]

[Structure]

[Assets]

[View the demo](https://cbracco.github.io/md-practice-hackathon/#demo-popover)

### Wave

[Description]

[Structure]

[Assets]

[View the demo](https://cbracco.github.io/md-practice-hackathon/#demo-wave)
