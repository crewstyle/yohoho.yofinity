# Yofinity [![Build Status](https://travis-ci.org/crewstyle/yofinity.svg)](https://travis-ci.org/crewstyle/yofinity)

_an infinite scroll jQuery plugin_


## Summary

+ [1) What is this all about?](#1-what-is-this-all-about)
+ [2) Install](#2-install)
+ [3) How to use it](#3-how-to-use-it)
+ [4) That's all folkes!](#4-thats-all-folkes)
+ [5) Authors and Copyright](#5-authors-and-copyright)


## 1) What is this all about?

[Yofinity](https://github.com/crewstyle/yofinity) is a very light jQuery infinite scroll plugin.  


## 2) Install

If you use [Bower.io](http://bower.io), you can download *Yofinity* and use it with:

````
bower install --save jquery.yofinity
````


## 3) How to use it

It's pretty simple to use the *Yofinity* jQuery package. It's a two-steps install.  
In your HTML:

````html
<a href="http://example.com/page/2" title="Next posts" rel="next">Loading...</a>
````

In your Javascript:
````javascript
$(document).ready({
    $('body').yofinity({
        buffer: 1000,
        navSelector: 'a[rel="next"]',
        success: function ($link, response){
            $link.before(response);
            $link.attr('href', '/page/2');
        },
        error: function ($link){
            $link.remove();
        }
    });
});
````


## 4) That's all folkes!

Now let's have fun :)


## 5) Authors and Copyright

**Achraf Chouk**

+ http://fr.linkedin.com/in/achrafchouk/
+ http://twitter.com/crewstyle
+ http://github.com/crewstyle

Please, read [LICENSE](https://github.com/crewstyle/yofinity/blob/master/LICENSE "LICENSE") for more details.

Copyright 20xx [Achraf Chouk](http://github.com/crewstyle "Achraf Chouk").  
Brewed by Achraf Chouk, served by [Take a tea](http://www.takeatea.com "Take a tea") ;)
