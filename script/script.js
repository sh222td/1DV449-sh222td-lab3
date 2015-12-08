'use strict';

// Global variables
var map;
var activeInfoWindow = '';

// Initializes the map from the Google Map API
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 61.02, lng: 14.38},
        zoom: 6
    });
}

$.ajax({
    url: "./traffic.json",
    dataType: "text",
    success: function(data) {
        var json = $.parseJSON(data);

        $(json.messages).each(function() {
            var myLatLng = {lat: this.latitude, lng: this.longitude};
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: this.title
            });
            var list = document.getElementById('list');
            var listObject = document.createElement('li');
            listObject.textContent = this.title;
            list.appendChild(listObject);

            var infowindow = new google.maps.InfoWindow({
                content: '<strong>'+this.title+'</strong><br>'+this.createddate+'<br>'+this.description+'<br>'+this.subcategory
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });

            // Function that handles the active infoWindows on the map
            google.maps.event.addListener(marker, 'click', function()
            {
                if(activeInfoWindow != '')
                {
                    activeInfoWindow.close();
                    activeInfoWindow = '';
                }
                var infoWindow = new google.maps.InfoWindow({content: '<strong>'+this.title+'</strong><br>'+this.createddate+'<br>'+this.description+'<br>'+this.subcategory});
                infowindow.open(map, marker);
                activeInfoWindow = infowindow;
            });

        });


    }
});


