var include = function(file) { document.write('<script type="text/javascript" src="' + file + '"></script>'); }


include("player.js");


// input
var keys = { 37:0, 38:0, 39:0, 40:0, 88:0, 89:0 };
window.onkeydown = function (e) { keys[e.which] = 1; };
window.onkeyup = function (e) { keys[e.which] = 0; };


var canvas;
var ctx;

var player;
var layers = [];


window.onload = function () {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');

	player = new Player();
	layers[0] = [player];

	setInterval(loop, 20);	// 50 fps
};


var loop = function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.update();

	var layerZs = Object.keys(layers).
			  map(function(key) {
				  return parseInt(key, 10);
			      });
	var minZ = layerZs[0], maxZ = layerZs[layerZs.length - 1];
	for(var z = maxZ; z >= minZ; z--) {
	    layers[z].forEach(function(sprite) {
		sprite.draw();
	    });
	}
};
