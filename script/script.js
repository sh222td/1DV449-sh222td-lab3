'use strict';

// Global variables
var map;
var activeInfoWindow = '';
var markers = [];
var traffic = [];

// Initializes the map from the Google Map API
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 61.02, lng: 14.38},
        zoom: 5
    });
}

$.ajax({
    url: "./traffic.json",
    dataType: "text",
    success: function(data) {
        var json = $.parseJSON(data);
        var array = [];
        $(json.messages).each(function() {
            traffic.push(this);
            var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
            $.extend(this, {newDate:newDateFormat.getTime()})
        });

        traffic.sort(function(a, b){
            return a.newDate- b.newDate
        });

        $("#buttonAll").click(function() {
            clearList();
            removeMarkers();
            $(traffic).each(function() {
                var item = this;
                var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
                var newMarker = createMarker(item);
                var list = document.getElementById('list');
                var listObject = document.createElement('li');
                listObject.textContent = item.title;
                list.appendChild(listObject);

                toggleBounce(listObject, newMarker);
                infoWindow(item, newMarker, newDateFormat);
                console.log(this);
            });
        });

        $("#buttonRoadTraffic").click(function() {
            clearList();
            removeMarkers();
            $(traffic).each(function() {
                var item = this;
                var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
                console.log(this);
                if (item.category === 0) {

                    var newMarker = createMarker(item);

                    var list = document.getElementById('list');
                    var listObject = document.createElement('li');
                    listObject.textContent = item.title;
                    list.appendChild(listObject);

                    toggleBounce(listObject, newMarker);
                    infoWindow(item, newMarker, newDateFormat);
                }
            });
        });

        $("#buttonCollectiveTraffic").click(function() {
            clearList();
            removeMarkers();
            $(traffic).each(function() {
                var item = this;
                var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
                if (item.category === 1) {
                    var newMarker = createMarker(item);
                    var list = document.getElementById('list');
                    var listObject = document.createElement('li');
                    listObject.textContent = item.title;
                    list.appendChild(listObject);

                    toggleBounce(listObject, newMarker);
                    infoWindow(item, newMarker, newDateFormat);
                }
            });
        });

        $("#buttonPlannedInterference").click(function() {
            clearList();
            removeMarkers();
            $(traffic).each(function() {
                var item = this;
                var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
                console.log(this);
                if (item.category === 2) {

                    var newMarker = createMarker(item);

                    var list = document.getElementById('list');
                    var listObject = document.createElement('li');
                    listObject.textContent = item.title;
                    list.appendChild(listObject);

                    toggleBounce(listObject, newMarker);
                    infoWindow(item, newMarker, newDateFormat);
                }
            });
        });

        $("#buttonAlternative").click(function() {
            clearList();
            removeMarkers();
            $(traffic).each(function() {
                var item = this;
                var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
                console.log(this);
                if (item.category === 3) {

                    var newMarker = createMarker(item);

                    var list = document.getElementById('list');
                    var listObject = document.createElement('li');
                    listObject.textContent = item.title;
                    list.appendChild(listObject);

                    toggleBounce(listObject, newMarker);
                    infoWindow(item, newMarker, newDateFormat);
                }
            });
        });
    }
});

function clearList() {
    var list = document.getElementById('list');
    list.textContent = "";
}

/* setMapOnAll and removeMarkers, functions that remove the markers from the map,
   reference: https://developers.google.com/maps/documentation/javascript/examples/marker-remove, date: 11/12 -15
*/
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function removeMarkers() {
    setMapOnAll(null);
    markers = [];
}

/*  */
function createMarker(item) {
    var myLatLng = {lat: item.latitude, lng: item.longitude};
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: item.title
    });
    markers.push(marker);
    return marker;

}

function infoWindow(item, marker, date) {

    var infowindow = new google.maps.InfoWindow({
        content: '<strong>'+item.title+'</strong><br>'+date.toLocaleString()+'<br>'+item.description+'<br>'+item.subcategory
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'click', function()
    {
        if(activeInfoWindow != '')
        {
            activeInfoWindow.close();
            activeInfoWindow = '';
        }
        var infoWindow = new google.maps.InfoWindow({content: '<strong>'+item.title+'</strong><br>'+date.toLocaleString()+'<br>'+item.description+'<br>'+item.subcategory});
        infowindow.open(map, marker);
        activeInfoWindow = infowindow;
    });
}

// Function for managing the bounce effect when listobject is clicked
function toggleBounce(listObject, marker) {
    $(listObject).click(function() {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });
}




