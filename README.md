# qToggle

a simple jQuery plugin for toggling DOM elements with HTML5 data attributes.
Pull requests, unit tests, and better documentation welcome.

You should use this in HTML5 projects as it is made for browsers that make use of data attributes. Though jQuery does a fair amount of work to make the native .data() function backward compatible. There is no warrenting that this works well on classic browsers.

## Install

First, load the plugin script after you've loaded core jQuery on your page:

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="./jquery.qtoggle.js"></script>
```


Second, activate the plugin on some portion of your DOM:

`<script>jQuery('#main-content').qToggle();</script>`

## Demo
load demo.html locally for instructions for use.

## License

This code is copyright 2012 by Nathan Letsinger and licensed under the MIT License. See the LICENSE file for details.
