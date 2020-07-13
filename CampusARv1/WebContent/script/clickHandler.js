AFRAME.registerComponent("clickhandler", {
		init: function() {	
			this.el.addEventListener("click", function(evt) {
				let icon = evt.target || evt.srcElement;
				let index = icon.id;
				let panel = parent.document.getElementById("info-panel");
				let el = parent.db.Campus[index];
				panel.innerHTML = "";
				let image = parent.document.createElement("img");
				image.setAttribute("src", "resources/images/" + el.image);
				panel.appendChild(image);
				let name = parent.document.createElement("h1");
				name.innerHTML = el.name;
				panel.appendChild(name);
				for(let i = 0; i < el.info.length; i++){
					let title = parent.document.createElement("h2");
					title.innerHTML = el.info[i].title;
					let content = parent.document.createElement("p");
					content.innerHTML = el.info[i].content;
					panel.appendChild(title);
					panel.appendChild(content);
				}
				panel.setAttribute("style", "display: block;");
			});
		}
});