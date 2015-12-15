'use strict';

/* Global variables */
var map;
var activeInfoWindow = '';
var markers = [];
var traffic = [];

/*
* Initializes the map from the Google Map API
*/
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 61.02, lng: 14.38},
        zoom: 5
    });
}

/*
* Makes an ajax call to the function that presents the result from the API call
*/
function callAjax() {
    $.ajax({
        type: "get",
        url: "./getContent.php",
        success: function(data){
            getResult(data)
        }
    });
}

/*
* Loop through all of the objects and insert them in an array.
* Sorts the array by the date in milliseconds.
* Checks also which category button that has been clicked on, then render out those withing that category.
*/
function getResult(data) {
    var json = $.parseJSON(data);
    $(json.messages).each(function() {
        traffic.push(this);
        var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
        $.extend(this, {newDate:newDateFormat.getTime()});
    });

    traffic.sort(function(a, b){
        return a.newDate-b.newDate
    });

    $(traffic).each(function() {
        var item = this;
        var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
        var list = document.getElementById('list');
        var listObject = document.createElement('li');
        listObject.textContent = item.title;
        list.appendChild(listObject);

        var newMarker = createMarker(item);
        toggleBounce(listObject, newMarker);
        infoWindow(item, newMarker, newDateFormat);
    });

    $("#buttonAll").click(function() {
        clearList();
        removeMarkers();
        $(traffic).each(function() {
            var item = this;
            var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
            var list = document.getElementById('list');
            var listObject = document.createElement('li');
            listObject.textContent = item.title;
            list.appendChild(listObject);

            var newMarker = createMarker(item);
            toggleBounce(listObject, newMarker);
            infoWindow(item, newMarker, newDateFormat);
        });
    });

    $("#buttonRoadTraffic").click(function() {
        clearList();
        removeMarkers();
        $(traffic).each(function() {
            var item = this;
            var newDateFormat = new Date(parseInt(this.createddate.substr(6)));
            if (item.category === 0) {
                var list = document.getElementById('list');
                var listObject = document.createElement('li');
                listObject.textContent = item.title;
                list.appendChild(listObject);

                var newMarker = createMarker(item);
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
                var list = document.getElementById('list');
                var listObject = document.createElement('li');
                listObject.textContent = item.title;
                list.appendChild(listObject);

                var newMarker = createMarker(item);
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
            if (item.category === 2) {
                var list = document.getElementById('list');
                var listObject = document.createElement('li');
                listObject.textContent = item.title;
                list.appendChild(listObject);

                var newMarker = createMarker(item);
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
            if (item.category === 3) {
                var list = document.getElementById('list');
                var listObject = document.createElement('li');
                listObject.textContent = item.title;
                list.appendChild(listObject);

                var newMarker = createMarker(item);
                toggleBounce(listObject, newMarker);
                infoWindow(item, newMarker, newDateFormat);
            }
        });
    });
}

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

/*
* Creates a new google maps marker from each object
*/
function createMarker(item) {
    var myLatLng = {lat: item.latitude, lng: item.longitude};
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: item.title
    });
    markers.push(marker);
    return marker;
}

/*
* Creates and presents an information window based on the chosen marker
*/
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

/*
* Function for managing the bounce effect when chosen item is clicked
 */
function toggleBounce(item, marker) {
    $(item).click(function() {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });
}

window.onload = function() {
    initMap();
    callAjax();
};





