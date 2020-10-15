var mymap = L.map('mapid').setView([45.79826, 8.84958], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
    minZoom: 16,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

let httpReq = new XMLHttpRequest();
httpReq.open("GET", "resources/places.json");
httpReq.send(null);
httpReq.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let json = httpReq.response;
		let obj = JSON.parse(json);
		let places = obj.Campus;
		for(let i = 0; i < places.length; i++){
			var marker = L.marker([places[i].coords.latitude, places[i].coords.longitude]).addTo(mymap);
			marker.bindPopup(places[i].name);
		}
	}	
}
