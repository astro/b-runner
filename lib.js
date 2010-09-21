var include = function(file) { document.write('<script type="text/javascript" src="' + file + '"></script>'); }


include("player.js");
include("map.js");


// input
var keys = { 37:0, 38:0, 39:0, 40:0, 88:0, 89:0 };
window.onkeydown = function (e) { keys[e.which] = 1; };
window.onkeyup = function (e) { keys[e.which] = 0; };


var canvas;
var ctx;

var player;


window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	setInterval(loop, 20);	// 50 fps

	player = new Player();
};


var loop = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.update();
	player.draw();

	map.draw();

};
