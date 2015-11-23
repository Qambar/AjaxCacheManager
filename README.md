# AjaxCacheManager

Plugin to cache repeated calls to server for fetching HTML. Perfect for paginations.

Installation:
------------

```
npm install ajaxcachemanager
```
or using package.json

```
{
  "name": "my-app",
  ..
  "devDependencies": {
    ..
    "ajaxcachemanager": "0.3.3"
  }
}
```
Then do `npm install`

Usage:
-----

```
var cacheManager = new AjaxCacheManager({
  'cache_container' : '#my-container' 
});

//To load the url in a particular div
cacheManager.load("http://www.google.com");

```

When you load it first time it sends the request to the server to GET the html for the page and caches it so that next time you call, it will just load the previous HTML. 

The best use case scenario is the pagination, where you want to go from page 1->2->3 and then come back to page 1 or any cached page. It will not send multiple requests to server and will load very quickly for user.


```
var cacheManager = new AjaxCacheManager({
  'cache_container' : '#my-container' 
});

//First time calling will request pages from server
cacheManager.load("http://www.google.com?pg=1");
cacheManager.load("http://www.google.com?pg=2");
cacheManager.load("http://www.google.com?pg=3");

//Reloads the request from cache, saving time for load
cacheManager.load("http://www.google.com?pg=1");

```

Clear Cache
-----------
To clear the cache you can call the `clear()` method on your object

```
cacheManager.clear();
```


Change Container Selector
-------------------------
You can change or set container for content load at anytime using the changeContainer method provided.

```
var cacheManager = new AjaxCacheManager();

cacheManager.changeContainer('#my-container2');

```

Callbacks
---------

You can pass a callback as a 2nd parameter of load and when the content will load it will call the callback with the loaded html.

Define your callback :

```
var mycallback = function(html) {
    alert(html);
};

```
Then pass it as a 2nd parameter to load

```
var cacheManager = new AjaxCacheManager({
  'cache_container' : '#my-container' 
});

//First time calling will request pages from server
cacheManager.load("http://www.google.com?pg=1", mycallback);

```

Note: it uses the url as a key for html cache.
