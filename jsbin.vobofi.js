

var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });
var nasatron = L.tileLayer("http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  attribution: 'Search<a href="http://www.mapquest.com/" target="_blank"><img src="http://developer.mapquest.com/content/osm/mq_logo.png"></a>, NASA/JPL, Caltech, USDA',
  subdomains: '1234'
});


var myCenter = new L.LatLng(52.48722, 13.4249);
var map = new L.Map('map', {
  center: myCenter,
  zoom: 17,
  layers: [nasatron, geojsonLayer]
});

var baseMaps = {
  "Grayscale": positron,
  "Nasa": nasatron
};

var overlayMaps = {
  "Marker": geojsonLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);


var marker = new L.Marker(myCenter);
    map.addLayer(marker);
    marker.bindPopup("<b>I am a Marker </b><br>I could also be a statue");
    
var polygon = L.polygon([
      [52.48639, 13.42393],
      [52.48622, 13.42442],
      [52.48763, 13.4256],
      [52.4878,13.4251]
    ], {color: 'blue',
    fillColor: '#f03',
    fillOpacity: 0.1}).addTo(map);

var polygonPopup = polygon.bindPopup("<b>Hello I am a polygon!</b><br>and I am the Hermannplatz").openPopup;

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
    "popupContent": "<b>Hi, I'm a geoJson-Feature converted to a circle-Marker</b><br>Here is also the Ubhf Hermannplatz!"
  }
};
 
var geojsonLayer = L.geoJson( geojsonFeature,{ 
  pointToLayer: function(feature,latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  },
  onEachFeature: onEachFeature
});
geojsonLayer.addData(geojsonFeature);
