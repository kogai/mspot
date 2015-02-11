module.exports = function( $scope, $filter, $http ) {
    $http({
        method: 'get',
        url: '/javascripts/test.json'
    }).
    success(function(data, status) {

        for (var i = 0; i < data.length; i++) {
            data[i].cordinateX = Number( data[i].cordinateX );
            data[i].cordinateY = Number( data[i].cordinateY );
        }
        $scope.events = data;

        $scope.filterByDistance = function( myEvent ){
            return myEvent.farDistance > myEvent.cordinateX;
        };

    }).
    error(function(data, status) {
        alert('通信エラーが発生しました');
    });
};

// angular.module('App',[]).controller('MainController', [ '$scope', function ( $scope ){
//
//     $scope.filter = {
//         done: { done: true },
//         remaining: { done: false }
//     };
//
//     $scope.currentFilter = null;
//
//     $scope.changeFilter = function ( filter ){
//         $scope.currentFilter = filter;
//     };
//
//     var where = $filter('filter');
//
//     $scope.$watch( 'todos', function( todos ){
//         var length = todos.length;
//
//         $scope.allCount = length;
//         $scope.doneCount = where( todos, $scope.filter.done ).length;
//         $scope.remainingCount = length - $scope.doneCount;
//     }, true);
//
// }]);
