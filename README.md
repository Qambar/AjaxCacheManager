# AjaxCacheManager v0.1.0

Plugin to cache repeated calls to server for fetching HTML. Perfect for paginations.

Installation:
------------

```
npm install ajaxcachemanager
```


Usage:
-----

```
var cacheManager = new CacheManager({'cache_container' : '#my-container' });

//To load the url in a particular div
cacheManager.load("http://www.google.com");

```

When you load it first time it sends the request to the server to GET the html for the page and caches it so that next time you call, it will just load the previous HTML. 

The best use case scenario is the pagination, where you want to go from page 1->2->3 and then come back to page 1 or any cached page. It will not send multiple requests to server and will load very quickly for user.


```
var cacheManager = new CacheManager({'cache_container' : '#my-container' });

//First time calling will request pages from server
cacheManager.load("http://www.google.com?pg=1");
cacheManager.load("http://www.google.com?pg=2");
cacheManager.load("http://www.google.com?pg=3");

//Reloads the request from cache, saving time for load
cacheManager.load("http://www.google.com?pg=1");

```

Note: it uses the url as a key for html cache.
