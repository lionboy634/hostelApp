function initialize() {

    if (navigator.geolocation) {
        var position = navigator.geolocation.getCurrentPosition();
        yourLat = position.coords.latitude;
        yourLng = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(yourLat, yourLng);
        var mapOptions = {
            zoom: 4,
            center: myLatlng
        }
        var map = new google.maps.Map(document.getElementById('your-map-canvas'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello World!'
        });
    }
}

google.maps.event.addDomListener(window, 'load', initialize);