var myCenter = new L.LatLng(52.48722, 13.4249);
    var map = new L.Map('map', {center: myCenter, zoom: 17});

    var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    var marker = new L.Marker(myCenter);
    map.addLayer(marker);

    marker.bindPopup("<p>Hermannplatz</p>");

    var polygon = L.polygon([
      [52.4864,13.424],
      [52.4863,13.4244],
      [52.4877,13.4255],
      [52.4878,13.4251]
    ]).addTo(map);