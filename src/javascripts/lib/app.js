var mapStyle = require('./mapStyle');

module.exports = function( $scope, $filter, $http, $q ) {

var httpOpt = {
    method: 'get',
    url: '/javascripts/test.json'
};

var _self = this;

var insetanceModels = function( data, status ){
    for (var i = 0; i < data.length; i++) {
        data[i].cordinateX = Number(data[i].cordinateX);
        data[i].cordinateY = Number(data[i].cordinateY);

        data[i].longitude = data[i].cordinateX;
        data[i].latitude = data[i].cordinateY;

        data[i].id = i;
    }

    $scope.events = data;
};

var getGeoLocation = function(  ){
    var d = $q.defer();

    window.navigator.geolocation.getCurrentPosition( function( pos ){

        $scope.pos = pos;
        d.resolve( pos );

    }, function( err ){
        d.reject( err );
    }, {} );

    return d.promise;
};

var renderMapsAndMarkers = function( pos ){
    var d = $q.defer();

    $scope.map = {
        center: {
            latitude : $scope.pos.coords.latitude,
            longitude: $scope.pos.coords.longitude
        },
        zoom: 12,
        events: {
            projection_changed: function( map, eventName, originalEventArgs ) {
                var styledMap = new google.maps.StyledMapType( mapStyle, {
                    name: "Styled Map"
                });
                map.mapTypes.set( 'map_style', styledMap );
                map.setMapTypeId( 'map_style');
                d.resolve();
            }
        }
    };
    return d.promise;
};

// handler

$http( httpOpt )
    .success( insetanceModels )
    .then( getGeoLocation )
    .then( renderMapsAndMarkers )
    .finally( function(){
        console.log( 'all promise is done.' );
    });
};
