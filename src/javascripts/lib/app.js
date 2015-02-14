var mapStyle;

mapStyle = require('./mapStyle');

module.exports = function($scope, $filter, $http, $q) {
  var getUserGeoLocation, httpOpt, insetanceModels, renderMapsAndMarkers, _self;
  httpOpt = {
    method: 'get',
    url: '/javascripts/test.json'
  };
  _self = this;
  insetanceModels = function(data, status) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = data.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      data[i].cordinateX = Number(data[i].cordinateX);
      data[i].cordinateY = Number(data[i].cordinateY);
      data[i].longitude = data[i].cordinateX;
      data[i].latitude = data[i].cordinateY;
      data[i].id = i;
    }
    $scope.events = data;
  };
  getUserGeoLocation = function() {
    var d, err, success;
    d = $q.defer();
    success = function(pos) {
      $scope.pos = pos;
      d.resolve(pos);
    };
    err = function(err) {
      d.reject(err);
    };
    window.navigator.geolocation.getCurrentPosition(success, err, {});
    return d.promise;
  };
  renderMapsAndMarkers = function(pos) {
    var d, projection_changed;
    d = $q.defer();
    $scope.map = {
      center: {
        latitude: $scope.pos.coords.latitude,
        longitude: $scope.pos.coords.longitude
      },
      zoom: 12,
      events: projection_changed = function(map, eventName, originalEventArgs) {
        var styledMap;
        styledMap = new google.maps.StyledMapType(mapStyle, {
          name: "Styled Map"
        });
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
        d.resolve();
      }
    };
    return d.promise;
  };
  $http(httpOpt).success(insetanceModels).then(getUserGeoLocation).then(renderMapsAndMarkers).then(function() {
    console.log('all promise is done.');
  });
};
