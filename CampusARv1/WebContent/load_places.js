class Marker {
    constructor(name, lat, lng){
        this.name = name;
        this.coords = [lat, lng];
    }

    toString(){
    	return this.name + "<br>" + "Coords: <br>" + this.coords[0] + "<br>" + this.coords[1] + "<br>";
    }
}

let arview = document.getElementById("ar-camera");
let markers = [];

function renderPlaces(places) {
	let ar_doc = arview.contentDocument;
    let a_scene = ar_doc.getElementById("scene");

    for(let i = 0; i < places.length; i++) {
        // add place icon
        const icon = ar_doc.createElement("a-image");
        icon.setAttribute("gps-entity-place", "latitude: " + places[i].coords[0] + "; longitude: " + places[i].coords[1] + ";");
        icon.setAttribute("width", "2");
        icon.setAttribute("height", "3");
        icon.setAttribute("name", places[i].name);
        icon.setAttribute("src", "map-marker.png");
        icon.setAttribute("look-at", "[gps-camera]");
        icon.setAttribute("clickhandler", "");
        icon.setAttribute("id", i);
        a_scene.appendChild(icon);
    }
}

function loadSearchbarItems(places) {
	let list = document.getElementById("buildingsList");
	for(let i = 0; i < places.length; i++) {
		const item = document.createElement("li");
		const text = document.createElement("button");
		text.setAttribute("class", "listElement");
		text.setAttribute("data-index", i.toString());
		text.innerHTML = places[i].name;
		text.addEventListener("click", searchbarClickHandler);
		item.appendChild(text);
		list.appendChild(item);
	}
}

function searchbarClickHandler() {
	let event = window.event;
	let src = event.target || event.srcElement;
	let index = src.dataset.index;
	highlight(index);
	src.blur();
}

function highlight(index) {
	for(var i = 0; i<markers.length; i++){
		let element = arview.contentDocument.getElementById(i.toString());
		if(i == index){
			element.setAttribute("src","map-marker-highlight.png");
		} else {
			element.setAttribute("src","map-marker.png");
		}
	}
}

AFRAME.registerComponent("clickhandler", {
		init: function() {	
			this.el.addEventListener("click", function(evt) {
				let icon = evt.target || evt.srcElement;
				alert("Clicked!");
//				//handler setup
//				let url = "InfoPadiglione.html?";
//				//append params
			});
		}
});

arview.contentWindow.onload = () => {
	let httpReq = new XMLHttpRequest();
	httpReq.open("GET", "places.json");
	httpReq.send(null);
	httpReq.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let json = httpReq.response;
			let obj = JSON.parse(json);
			let places = obj.Campus;
			for(let i = 0; i < places.length; i++){
				markers.push(new Marker( places[i].name, places[i].coords.latitude, places[i].coords.longitude));
			}
			renderPlaces(markers);
			loadSearchbarItems(markers);
		}
	};
}



