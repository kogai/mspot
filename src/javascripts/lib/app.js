module.exports = function( $scope, $filter, $http ) {

    // @todo
    // promise化する

    $http({
        method: 'get',
        url: '/javascripts/test.json'
    })
    .success(function(data, status) {

        for (var i = 0; i < data.length; i++) {
            data[i].cordinateX = Number( data[i].cordinateX );
            data[i].cordinateY = Number( data[i].cordinateY );
        }
        $scope.events = data;

        console.log( $scope.events[0].cordinateX );

        $scope.map = {
            center: {
                latitude    :   $scope.events[0].cordinateY,
                longitude   :   $scope.events[0].cordinateX
            },
            zoom: 12,
            id: 0
        };

        $scope.farDistance = 145;

        $scope.filterByDistance = function( myEvent ){
            return $scope.farDistance > myEvent.cordinateX;
        };

    })
    .error(function(data, status) {
        alert('通信エラーが発生しました');
    });
};

// angular.module('App',[]).controller('MainController', [ '$scope', function ( $scope ){

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
