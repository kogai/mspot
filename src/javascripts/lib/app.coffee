mapStyle = require('./mapStyle')

module.exports = ( $scope, $filter, $http, $q ) ->
    httpOpt =
        method: 'get'
        url: '/javascripts/test.json'

    _self = this

    insetanceModels = ( data, status ) ->
        for i in [ 0..data.length-1 ]
            # 座標をNumber化
            # @todo
            # DB側で数値として返す
            data[i].cordinateX  = Number( data[i].cordinateX )
            data[i].cordinateY  = Number( data[i].cordinateY )

            # 座標をgoogle-maps が読めるようにプロパティを修正
            # @todo
            # DB側のプロパティ名を修正する
            data[i].longitude   = data[i].cordinateX
            data[i].latitude    = data[i].cordinateY

            # 複数のマーカーを表示するにはユニークなIDが必要
            data[i].id          = i

        $scope.events = data
        return

    getUserGeoLocation = () ->
        d = $q.defer()

        success = ( pos ) ->
            $scope.pos = pos
            d.resolve(pos)
            return

        err = ( err ) ->
            d.reject( err )
            return

        window.navigator.geolocation.getCurrentPosition( success, err, {} )

        return d.promise

    renderMapsAndMarkers = ( pos ) ->
        d = $q.defer()
        $scope.map =
            center:
                latitude : $scope.pos.coords.latitude
                longitude: $scope.pos.coords.longitude
            zoom: 12
            events:
                projection_changed = ( map, eventName, originalEventArgs ) ->
                    styledMap = new google.maps.StyledMapType( mapStyle, {
                        name: "Styled Map"
                    })
                    map.mapTypes.set( 'map_style', styledMap )
                    map.setMapTypeId( 'map_style')
                    d.resolve();
                    return

        return d.promise

    $http( httpOpt )
        .success( insetanceModels )
        .then( getUserGeoLocation )
        .then( renderMapsAndMarkers )
        .then ->
            console.log( 'all promise is done.' )
            return

    return
