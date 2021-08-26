window.addEventListener('load', () => {
	let js = document.getElementById('google-script');
	js.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&libraries=&v=weekly`);
});

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };

  const locations = [
    [-25.254242, 130.979822],
    [-25.296709, 130.995692],
    [-25.344, 131.036],
  ];
  // The map, centered at Uluru

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: {lat:-25.304161, lng:131.019537},
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });

  var i = 0;
  for (i; i < locations.length; i++) {
    new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][0],locations[i][1]),
        map: map,
      });
  }
}
