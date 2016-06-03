var myCenter = new L.LatLng(52.48722, 13.4249);
var map = new L.Map('map', {center: myCenter, zoom: 17});
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);
var marker = new L.Marker(myCenter);
    map.addLayer(marker);
    marker.bindPopup("<p>I am a Marker </p>");
    
var polygon = L.polygon([
      [52.48639, 13.42393],
      [52.48622, 13.42442],
      [52.48763, 13.4256],
      [52.4878,13.4251]
    ], {color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.1}).addTo(map);

var polygonPopup = polygon.bindPopup("<b>Hello!</b><br>I am the Hermannplatz").openPopup;

var latLngPopup = L.popup();
function onMapClick(e) {
  latLngPopup
     .setLatLng(e.latlng)
     .setContent("You clicked the map at " + e.latlng.toString() )
     .openOn(map);
}
map.on('click', onMapClick);


function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
}

var geojsonMarkerOptions = {
  radius: 5,
  fillcolor: "#ff7800",
  color: "green",
  weight: 2,
  opacity: 1,
  fillOpacity: 0.1
};

var geojsonFeature = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [13.42446,52.4866]
  },
  "properties": {
    "name": "U-bahn Hermannplatz",
    "owner": "Land Berlin",
    "popupContent": "U8: Hermannplatz"
  }
};
 
var geojsonLayer = L.geoJson( geojsonFeature,{ 
  pointToLayer: function(feature,latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  },
  onEachFeature: onEachFeature
}).addTo(map);
geojsonLayer.addData(geojsonFeature);