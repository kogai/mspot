// window._ = require('lodash');
//
// require('angularjs');
// require('angular-google-maps');

var app         = require('./lib/app');
var myFilter    = require('./lib/myFilter');

angular.module('App',[ 'uiGmapgoogle-maps' ])
    // .filter('filterByDistance', [ myFilter ])
    .controller('MainController', [ '$scope', '$filter', '$http', app ]);
