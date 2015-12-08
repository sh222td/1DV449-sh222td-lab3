var map;
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
            var listObject = document.createElement('li')
            listObject.textContent = this.title;
            list.appendChild(listObject);
        });
    }
});
