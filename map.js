
var myCenter = new L.LatLng(52.477, 13.422);

var map = new L.Map('map', {attributionControl: false, center: myCenter, zoom: 16, maxBounds: L.latLngBounds([[52.3068, 12.84302],[52.69636, 13.97736]]).pad(0.5)});

var marker = new L.Marker(myCenter);
    map.addLayer(marker);
    marker.bindPopup("<b>I am a Marker </b><br>I could also be a statue");

var baseLayers = [
  {
    name: "Light Map",
    layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      })
  },
  {
    active: true,
    name: "Satelite Map",
    layer: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmVzdG9yamVsaXBlIiwiYSI6ImNpb3dsdW4wbTAwN2t3ZGtqMDd2cGtlbjIifQ.v-kTLPHIgkXuobgi8kbZRw', {
      attribution: '&copy; <a href="https://www.digitalglobe.com/">Digital Globe</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>' ,
      minZoom: 2,
      maxZoom: 19
    })
  }
];

var overlayers = [
  {
    name: "Marker",
    icon: '<i class="icon icon-bar"></i>',
    layer: marker
  }
];

/*var panelLayers = new L.Control.PanelLayers(baseLayers, null, {
  collapsed: true
});

map.addControl(panelLayers);*/

L.control.panelLayers(baseLayers, overlayers, {
  collapsed: true,
  buildItem: function(item) {

/*    function getXYZ(latlng, zoom) {
      var latRad = latlng.lat * Math.PI / 180,
          lngRad = latlng.lng * Math.PI / 180;
        return {
          z: zoom,
          x: parseInt(Math.floor( (latlng.lng + 180) / 360 * (1<<zoom) )),
          y: parseInt(Math.floor( (1 - Math.log(Math.tan(lngRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * (1<<zoom) ))
      }
    }

    function getXYZnew(latlng, zoom) {
      return {
        z: zoom,
        x: parseInt(latlng.lat),
        y: parseInt(latlng.lng)
      }
    }
    
    var xyzNEW = getXYZnew(map.getCenter(), map.getZoom());
    var urlNEW = item.layer.getTileUrl( xyzNEW );  
    var xyz = getXYZ(map.getCenter(), map.getZoom() );
    var url = item.layer.getTileUrl( xyz );

    console.log(xyz);
    console.log(xyzNEW);
    console.log(url);
    console.log(urlNEW);*/

    var node = L.DomUtil.create('div','panel-thumb');

    console.log(node);

    if (item.name === 'Light Map')
      {node.style.background = 'url("leaflet-panel-layers-master/images/thumbnails/Lightmap_Mapbox.png") no-repeat center center';}
    if (item.name === 'Satelite Map')
      {node.style.background = 'url("leaflet-panel-layers-master/images/thumbnails/Satelite_Digital Globe.png") no-repeat center center';}
      
/*    if (url === 'http://a.basemaps.cartocdn.com/light_all/16/35211/26181.png') 
      {node.style.background = 'url("leaflet-panel-layers-master/images/thumbnails/Lightmap_Mapbox.png") no-repeat center center';}
    if (url === "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/16/35211/26181?access_token=pk.eyJ1IjoibmVzdG9yamVsaXBlIiwiYSI6ImNpb3dsdW4wbTAwN2t3ZGtqMDd2cGtlbjIifQ.v-kTLPHIgkXuobgi8kbZRw")
      {node.style.background = 'url("leaflet-panel-layers-master/images/thumbnails/Satelite_Digital Globe.png") no-repeat center center';}
*/
    node.innerHTML = item.name;

    return node;
  }
}).addTo(map);

map.on('click', function(e) {

  var layer = baseLayers[0].layer;

  function getXYZ(latlng, zoom) {
    function toRad(n) {
      return n * Math.PI / 180;
    }
      return {
        z: zoom,
        x: parseInt(Math.floor( (latlng.lng + 180) / 360 * (1<<zoom) )),
        y: parseInt(Math.floor( (1 - Math.log(Math.tan(toRad(latlng.lat)) + 1 / Math.cos(toRad(latlng.lat))) / Math.PI) / 2 * (1<<zoom) ))
    }
  }

  //var url = getTileURL(e.latlng.lat, e.latlng.lng, map.getZoom());
  var xyz = getXYZ(e.latlng, map.getZoom());
  var url = layer.getTileUrl( xyz );

  console.log(url);
});


/*var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);*/


    
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
}).addTo(map);
geojsonLayer.addData(geojsonFeature);
