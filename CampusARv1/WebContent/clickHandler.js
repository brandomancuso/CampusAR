AFRAME.registerComponent("clickhandler", {
		init: function() {	
			this.el.addEventListener("click", function(evt) {
				let icon = evt.target || evt.srcElement;
				parent.alert("Clicked!");
//				//handler setup
//				let url = "InfoPadiglione.html?";
//				//append params
			});
		}
});