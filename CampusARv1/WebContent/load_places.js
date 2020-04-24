class Marker {
    constructor(name, lat, lng){
        this.name = name;
        this.coords = [lat, lng];
    }

    toString(){
    	return this.name + "<br>" + "Coords: <br>" + this.coords[0] + "<br>" + this.coords[1] + "<br>";
    }
}

function renderPlaces(places) {
    let a_scene = document.getElementById("scene");

    for(let i = 0; i < places.length; i++) {
        // add place icon
        const icon = document.createElement("a-image");
        icon.setAttribute("gps-entity-place", "latitude: " + places[i].coords[0] + "; longitude: " + places[i].coords[1] + ";");
        icon.setAttribute("width", "2");
        icon.setAttribute("height", "3");
        icon.setAttribute("name", places[i].name);
        icon.setAttribute("src", "map-marker.png");
        icon.setAttribute("look-at", "[gps-camera]");
//        icon.setAttribute("highlight", "0");
//        icon.onclick = (icon) => {
//        	var highlight = icon.getAttribute("highlight");
//            if(highlight.localeCompare("0") == 0){
//            	icon.setAttribute("src", "map-marker-highlight.png");
//            	icon.setAttribute("highlight", "1");
//            }else{
//            	icon.setAttribute("src", "map-marker.png");
//            	icon.setAttribute("highlight", "0");
//            }
//        };
        icon.addEventListener("click", function(evt) {
        	evt.target.setAttribute("src", "map-marker-highlight.png");
        });
        a_scene.appendChild(icon);
    }
}

//AFRAME.registerComponent("clickhandler", {
//		init: function() {	
//			this.el.addEventListener("click", () => {
//				alert("Clicked!");
//			});
//		}
//});

let httpReq = new XMLHttpRequest();
httpReq.open("GET", "places.json");
httpReq.send(null);
let markers = [];
httpReq.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let json = httpReq.response;
		let obj = JSON.parse(json);
		let places = obj.Campus;
		for(let i = 0; i < places.length; i++){
			markers.push(new Marker( places[i].name, places[i].coords.latitude, places[i].coords.longitude));
		}
		renderPlaces(markers);
		
	}
};
