# Yofinity [![Build Status](https://travis-ci.org/crewstyle/yohoho.yofinity.svg)](https://travis-ci.org/crewstyle/yohoho.yofinity)

_an infinite scroll jQuery plugin_  
[![npm version](https://badge.fury.io/js/yohoho.yofinity.svg)](https://badge.fury.io/js/yohoho.yofinity)
[![GitHub version](https://badge.fury.io/gh/crewstyle%2Fyohoho.yofinity.svg)](https://badge.fury.io/gh/crewstyle%2Fyohoho.yofinity)  


## [Demo page](https://cdn.rawgit.com/crewstyle/yohoho.yofinity/72fcaab0919a797ecf55472b1f04af087af63653/demo/index.html)


## Package manager

````javascript
//bower
bower install --save yohoho.yofinity
````

````javascript
//npm
npm install yohoho.yofinity
````


## Install

````html
<!-- In your <body> HTML tag -->

<a href="http://example.com/page/2" title="Next posts" rel="next">Loading...</a>
````

````javascript
//in your main JS file
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
````


## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
ajaxUrl | string | '' | Ajax custom URL to specify if no next button is available (Usefull for WordPress sites with ajax call functions)
buffer | integer | 1000 | Number of pixels to fire infinite scroll BEFORE the node element
context | object | window | -
debug | boolean | false | Enables the debug tools when it's needed
error | function | null | Function called if script fires an error
iterator | integer | 1 | Iterator may be used for pagination, define where to start. After each success call, the iterator is autoincremented
loading | function | null | Function called when script fires loading
navSelector | string | 'a[rel="next"]' | Define node element containing AJAX request through the `href` attribute
params | object | {} | Parameters to send in POST or GET method
success | function | null | Function called when script fires success
type | string | 'get' | Method to send data with


## Dependencies

jQuery **latest version**


## Authors and Copyright

Made with ♥ by **[Achraf Chouk](http://github.com/crewstyle "Achraf Chouk")**

+ http://fr.linkedin.com/in/achrafchouk/
+ http://twitter.com/crewstyle
+ http://github.com/crewstyle

Please, read [LICENSE](https://github.com/crewstyle/yohoho.yofinity/blob/master/LICENSE "LICENSE") for more details.
