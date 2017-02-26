module.exports = function () {
    var map;
    if ($('.map').length) {

        /********set map parameters*********/
        function initializeMap() {
            var latitude = 50.453927,
                longitude = 30.440409,
                mapZoom = 15,
                mainColor = '#228475',
                white = '#ffffff',
                saturationValue = 10,
                brightnessValue = 100;

            var marker_url = 'assets/img/map_marker.svg';
            //define styles of map
            var style = [
                {
                    //set saturation for the labels on the map
                    elementType: "labels",
                    stylers: [
                        {saturation: saturationValue}
                    ]
                },
                {
                    //hide poi labels
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        {visibility: "off"}
                    ]
                },
                {
                    //hide road highway labels
                    featureType: "road.highway",
                    elementType: "labels",
                    stylers: [
                        {visibility: "off"}
                    ]
                },
                {
                    //hide transit labels
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [
                        {visibility: "off"}
                    ]
                },
                {
                    //hide transit labels
                    featureType: "transit",
                    elementType: "labels",
                    stylers: [
                        {visibility: "off"}
                    ]
                },
                {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [
                        {color: white},
                        {lightness: 0},
                        {saturation: saturationValue}
                    ]
                },
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [
                        {color: mainColor},
                        {lightness: 0}
                    ]
                },
                {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [
                        {color: white},
                        {visibility: "on"},
                        {lightness: 0},
                        {saturation: saturationValue}
                    ]
                },

                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                        {color: '#dddddd'},
                        {visibility: "on"},
                        {lightness: 0},
                        {saturation: saturationValue}
                    ]
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [
                        {color: '#aaaaaa'},
                        {lightness: -30}
                    ]
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [
                        {color: mainColor},
                        {lightness: 30}
                    ]
                },
                {
                    featureType: "water",
                    elementType: "labels",
                    stylers: [
                        {color: '#aaaaaa'},
                        {lightness: -30}
                    ]
                }
            ];

            //set google map options
            var map_options = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: mapZoom,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            }
            //inizialize the map
            map = new google.maps.Map(document.getElementById("map__block"), map_options);
            //add a custom marker to the map

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(50.449824, 30.453409),
                map: map,
                zoom: 17,
                icon: marker_url,
                title: "I'm here!"
            });
        }

        google.maps.event.addDomListener(window, "load", initializeMap);

        //move map to marker
        $('.icon_map_marker').parents('.contacts__link').on('click', function (e) {
            e.preventDefault();
            map.panTo({lat: 50.453927, lng: 30.440409})
        });
    }
}