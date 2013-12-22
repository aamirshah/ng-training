ng-training
=========

A sample project for Angular.js training.


  
> Angular.js is awesome MVC framework from Google. The intension of this project is > to help others in understanding the various features of Angular.js


Contents
===
  - Intro
  - Data Binding
  - Search
  - Table Sort
  - List
  - Filters
  - HTTP
  - Directives 

Version
----

Angular.js. 1.2.6


Installation
--------------

```sh
git clone [git-repo-url] ng-training
cd ng-training
python -m SimpleHTTPServer
```

Routes Availabe
===
```sh
$routeProvider
  .when("/home", {
    templateUrl:"partials/list.html"
  })
  .when("/intro", {
    templateUrl:"partials/intro.html"
  })
  .when("/example/data-binding", {
    templateUrl:"partials/data-binding.html"
  })
  .when("/example/search", {
    templateUrl:"partials/search.html"
  })
  .when("/example/table-sort", {
    templateUrl:"partials/table-sort.html"
  })
  .when("/example/list", {
    templateUrl:"partials/listing.html"
  })
  .when("/example/filters", {
    templateUrl:"partials/filters.html"
  })
  .when("/example/http", {
    templateUrl:"partials/http.html"
  })
  .when("/example/directives", {
    templateUrl:"partials/directives.html"
  })
  .otherwise({
    redirectTo:'/home'
  });
```
License
----

MIT
