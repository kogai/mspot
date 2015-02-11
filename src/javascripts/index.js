require('angularjs');
var app     = require('./lib/app');


angular.module('App',[]).controller('MainController', [ '$scope', '$http', app ]);
