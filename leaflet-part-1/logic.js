
 let queryUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

 // Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data); 
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h4>Location: " + feature.properties.place + 
    "</h4><hr><p>Date & Time: " + new Date(feature.properties.time) + 
    "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
}
  function radiusSize(magnitude) {
    return magnitude * 30000;
}

  function circleColor(magnitude) {
    if (magnitude < 1) {
      return "#FFFF00"
  }
    else if (magnitude < 2) {
      return "#EE82EE"
  }
    else if (magnitude < 3) {
      return "#663399"
  }
    else if (magnitude < 4) {
      return "#7FFF00"
  }
    else if (magnitude < 5) {
      return "#7FFFD4"
  }
    else {
      return "#000080"
  }
}

  
let earthquakes = L.geoJSON(earthquakeData, {
  pointToLayer: function(earthquakeData, latlng) {
    return L.circle(latlng, {
      stroke: false,
      radius: radiusSize(earthquakeData.properties.mag),
      color: circleColor(earthquakeData.properties.mag),
      fillOpacity: 0.5
  
      });
    },
    onEachFeature: onEachFeature
});


  createMap(earthquakes);
}

  function createMap(earthquakes) {

 
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });


  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  let overlayMaps = {
    Earthquakes: earthquakes
  };


  let myMap = L.map("map", {
    center: [
      40, -110
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}





