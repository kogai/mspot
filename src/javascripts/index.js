require('angularjs');
var app         = require('./lib/app');
var myFilter    = require('./lib/myFilter');

angular.module('App',[])
    .filter('filterByDistance', [ myFilter ])
    .controller('MainController', [ '$scope', '$filter', '$http', app ]);
