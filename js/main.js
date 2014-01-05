"use strict";

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngResource', 'md5']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
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
  .when("/example/communication", {
    templateUrl:"partials/communication.html"
  })
  .when("/example/scopes", {
    templateUrl:"partials/scopes.html"
  })
  .when("/login", {
    templateUrl:"partials/login.html"
  })
  .otherwise({
    redirectTo:'/home'
  });

  $locationProvider.hashPrefix('!');
}]);

app.run(['$rootScope', '$route','$location', function($rootScope, $route, $location){

	console.log("RUN...");
   /**
   * [This object contains various RegEx which are used to validate the input fields using ng-pattern]
   * @type {Object}
   */
  $rootScope.validator ={
    'email'      : /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
    'password'   : /^.{8,}$/,
    'name'       : /^[a-zA-Z ]+$/,
    'nameNnumber': /^[a-zA-Z 0-9]+$/,
    'decimalValue'  : /^([0-9]+(\.)?[0-9]*$)+/
  };

}]);

app.controller('IntroController', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.list = [
    { desc: 'Less Code'},
    { desc: 'Easy to Maintain'},
    { desc: 'Structure'},
    { desc: 'Compatibility'},
    { desc: 'Reusability'},
    { desc: 'Data Binding'},
    { desc: 'Dependency Injection'},
    { desc: 'Directives'},
  ]
}]);


app.controller('SearchController', ['$scope', '$rootScope', function($scope, $rootScope){

  console.log('SearchController...');

  $scope.projectList = ['Angular.js', 'Backbone.js', 'Ember.js', 'Knockout.js', 'jQuery.js', 'Modernizr.js', 'Bootstrap.js', 'Moment.js', 'Durandal.js', 'Parse.js', 'Igor Minar', 'Brad Green', 'Dave Geddes', 'Naomi Black', 'Greg Weber', 'Dean Sofer', 'Wes Alvaro', 'John Scott', 'Daniel Nadasi'];

}]);

app.controller('TableController', ['$scope', '$rootScope', function($scope, $rootScope) {
   $scope.departments =
    [{name:'HTML', phone:'123123', head:'Yaapa'},
     {name:'Android', phone:'4283974', head:'Amal'},
     {name:'iOS', phone:'947293', head:'Sid'},
     {name:'PHP', phone:'2344232', head: 'Hareesh'},
     {name:'RoR', phone:'2344232', head: 'Marcin'},
     {name:'HR', phone:'98742934', head:'Vidushi'}];

    $scope.predicate = 'name';
}]);

app.controller('ListingController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.names = ['Angular', 'Bootstrap', 'jQuery'];

  $scope.print = function() {
    console.log('names = ', $scope.names);
  };

}]);


app.controller('ListController', ['$scope', '$rootScope', function($scope, $rootScope) {

	$scope.menu = [
    { name: 'Intro', link: 'intro' },
		{ name: 'Data Binding', link: 'example/data-binding' },
		{ name: 'Search', link: 'example/search' },
    { name: 'Table Sort', link: 'example/table-sort' },
    { name: 'List', link: 'example/list' },
    { name: 'Filters', link: 'example/filters' },
    { name: 'HTTP', link: 'example/http' },
    { name: 'Directives', link: 'example/directives' },
    { name: 'Communication between Controllers', link: 'example/communication' },
    { name: 'Login', link: 'login' },
    { name: 'Scopes', link: 'example/scopes' }
	];
}])

app.controller('APIController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  $http({
    method: 'GET', 
    url: "http://api.feedzilla.com/v1/cultures.json", 
  })
  .success(function(data, status) {  
    console.log('data =', data);
    $scope.cultures = data;
  })
  .error(function(data, status) { 

  });   

}]);

app.filter('reverse', function(){
  return function (input) {
    return input ? input.split('').reverse().join('') : '';
  };
});

app.directive('getName', ['$location','$rootScope',function($location,$rootScope){
  return {
    // called in an attribute
    restrict: 'A',
    link: function(scope, element, attrs){ 
      console.log("attrs", attrs.ngController);
      $rootScope.currentController = attrs.ngController;
    }
  };
}]);

app.controller('GravatarController', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.getGravatar = function(email) {
    console.log('EMAIL === ', email);
    $scope.fromEmail = email;
  };

  $scope.fromEmail = "asavu@apache.org";
}]);

app.directive('gravatarImage', ['gravatarImageService', function (gravatarImageService) {
  return {
    restrict:"A",
    link:function (scope, elm, attrs) {
      // by default the values will come in as undefined so we need to setup a
      // watch to notify us when the value changes
      attrs.$observe('gravatarImage', function(value){
        console.log('value == ',value);
        // let's do nothing if the value comes in empty, null or undefined
        if ((value !== null) && (value !== undefined) && (value !== '') && (null != value.match(/.*@.*\..{2}/))) {
          // parse the size attribute
          var size = attrs.gravatarSize || 100;
          // parse the ratings attribute
          var rating = attrs.gravatarRating || 'pg';
          // parse the default image url
          var defaultUrl = attrs.gravatarDefault || '';
          // parse css class
          var cssClass = attrs.gravatarCssClass || 'gravatar-icon';
          // get image src from service
          var src = gravatarImageService.getImageSrc(value, size, rating, defaultUrl, attrs.gravatarSecure);
          // construct the tag to insert into the element
          var tag = '<img class="' + cssClass + '" src="' + src + '" >';
          //remove any existing imgs 
          elm.find('img').remove();
          // insert the tag into the element
          elm.append(tag);
        }
      });
    }};
}]);

app.factory('gravatarImageService', function (md5) {
    return {
        getImageSrc : function(value, size, rating, defaultUrl, secure) {
            // convert the value to lower case and then to a md5 hash
            var hash = md5.createHash(value.toLowerCase());
            var src = (secure ? 'https://secure' : 'http://www' ) + '.gravatar.com/avatar/' + hash + '?s=' + size + '&r=' + rating + '&d=' + defaultUrl;
            console.log('returning ...', src);
            return src;
        }
    };
});

app.controller('ParentController', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.callChild = function(msg) {
    $scope.$broadcast('hey::child', msg || 'Default - Hi Buddy');
  };

  $scope.$on('hey::dad', function(){
    console.log("from child ::: ", arguments);
  });
}]);


app.controller('ChildController', ['$scope', '$rootScope', function($scope, $rootScope) {
  
  $scope.$on('hey::child', function() {
    console.log("from parent ::: ", arguments);
  });

  $scope.callParent = function(msg) {
    $scope.$emit('hey::dad', msg || 'Default - Hey dad !');
  };
}]);

app.controller('sampleController', ['$scope', function($scope) {

  $scope.something = "mango";

  $scope.logger = function(item) {
    console.log('item passed is ', item);
  };

}]);


app.directive('sample', ['$rootScope', function($rootScope) {

  return {
    restrict: 'E',
    
    scope: {
      done: '&' // expression
    },
    template: '<input type="text" ng-model="abc">{{abc}}<button ng-click="done({abc:abc})">Log</button>',
    link: function(scope, element, attrs) {

    }
  };
}]);

// app.directive('drink', ['$rootScope', function($rootScope) {

//   return {
//     restrict: 'A',
    
//     template: '<div style="width: 50px; height:20px; background: orange;">{{flavor}}</div>',
//     link: function(scope, element, attrs) {
//       scope.flavor = attrs.flavor;
//       console.log(' scope.flavor = ',scope.flavor);
//     }
//   };
// }]);


// app.directive('drink', ['$rootScope', function($rootScope) {

//   return {
//     restrict: 'A',
//     scope: {
//       flavor: "@" // take as string
//     },
//     template: '<div style="width: 50px; height:20px; background: orange;">{{flavor}}</div>',
//   };
// }]);


app.directive('drink', ['$rootScope', function($rootScope) {

  return {
    restrict: 'A',
    scope: {
      flavor: "=" // 2 way, this is set to that
    },
    template: '<div style="width: 50px; height:20px; background: orange;">{{flavor}}</div><input type="text" ng-model="flavor">',
  };
}]);


app.directive('panel', ['$rootScope', function($rootScope) {

  return {
    restrict: 'E',
    transclude: true,
    template: '<div ng-transclude>Hi there</div>',
  };
}]);

app.controller('PhoneController', ['$scope', function($scope) {

  console.log('PhoneController');


  $scope.leaveVoicemail = function(number, message) {
    console.log('Number = ', number);
    console.log('Message = ', message);
  };
}]);


app.directive('phone', ['$rootScope', function($rootScope) {

  return {
    restrict: 'E',
    scope: {
      number: '@',
      network: '=',
      makeCall: '&'
    },
    templateUrl: 'partials/phone.html',
    link: function(scope, element, attrs) {

      scope.networks = ['airtel', 'vodafone', 'aircel'];
      scope.network = scope.networks[0];
    }
  };
}]);

app.controller('PhoneController', function($scope){
  $scope.leaveVoicemail = function(number, message){
    console.log('Number: ' + number + ' said: ' + message);
  };
});
 
