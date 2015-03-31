function loadLocations(callback) {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
            xobj.open('GET', $SCRIPT_ROOT + 'static/assets/locations.json', true); 
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
        showCoverageOnHover: false
    }
    var markerCluster = L.markerClusterGroup(markerClusterOptions);
    for (var i = 0; i < data.length; i++) {
        var marker = L.marker(data[i]);
        var title = "<a href=" + $SCRIPT_ROOT + "institution?inst=" + data[i][3] + ">" + data[i][2] + "</a>";
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
    });
});






