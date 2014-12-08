function loadLocations(callback) {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
            xobj.open('GET', 'clinicaltrials/static/assets/locations.json', true); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
          };
          xobj.send(null);  
}

function createMap(data){
    var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
            {
                maxZoom: 18
            }),
            latlng = L.latLng(25, 0);
    var map = L.map('map', {center: latlng, zoom: 2, layers: [tiles]});
    var markerClusterOptions = {

    }
    var markerCluster = L.markerClusterGroup(markerClusterOptions);
    for (var i = 0; i < data.length; i++) {
        var marker = L.marker(data[i]);
        var title = data[i][2]
                marker.bindPopup(title);
        markerCluster.addLayer(marker);
    }
    map.addLayer(markerCluster);
}

$(function() {
    loadLocations(function(response) {
        // Parse JSON string into object
        var data = JSON.parse(response);
        createMap(data);
        
        $('.leaflet-popup-pane').on('click', function(){
            window.location = "http://groups.ischool.berkeley.edu/clinicaltrials/institution?inst=";
        })

    });
});






