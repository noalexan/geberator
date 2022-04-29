const table = document.getElementById("table");

document.getElementById("setSize").addEventListener("submit", function (e) {
	e.preventDefault();
	let width = e.srcElement[0].value;
	let height = e.srcElement[1].value;
	table.innerHTML = '';
	for (let i = 1; i <= height; i++) {
		var tr = document.createElement('tr');
		for (let j = 1; j <= width; j++) {
			var td = document.createElement('td');
			var img = document.createElement('img');
			img.src = "imgs/void.png";
			td.classList.add("tilesets", "ui-widget-content");
			td.dataset.height = i;
			td.dataset.width = j;
			td.dataset.tile = '0';
			td.appendChild(img);
			tr.appendChild(td);
		}
		table.appendChild(tr);
		$(function() {
			$("td").droppable({
				drop: function(event, ui) {
					event.originalEvent.target.style = 'position: relative;';
					event.target.children[0].src = event.originalEvent.target.src;
					event.target.dataset.tile = event.originalEvent.target.dataset.tile;
				},
				over: function(event, ui) {
					event.originalEvent.target.style = 'position: relative;';
				},
				out: function(event, ui) {
				}
			});
		});
	}
	document.querySelectorAll(".tilesets").forEach(function (tileset) {
		if (tileset.dataset.width == 1 || tileset.dataset.width == width || tileset.dataset.height == 1 || tileset.dataset.height == height)
		{
			tileset.firstChild.src = 'imgs/wall.png';
			tileset.dataset.tile = '1';
		}
		tileset.addEventListener('click', function (e) {
			this.firstChild.src = 'imgs/void.png';
			this.dataset.tile = '0';
		})
		tileset.style = "width: 32px;";
	});
});

function download() {
	var text = "";
	var y = 1;
	document.querySelectorAll(".tilesets").forEach(function (tileset) {
		if (tileset.dataset.height != y)
		{
			y = tileset.dataset.height;
			text += '\n';
		}
		text += tileset.dataset.tile;
	});
	text += '\n';
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "map.ber");
}

$(function() {
	$(".items").draggable();
});
