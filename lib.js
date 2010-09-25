var include = function(file) { document.write('<script type="text/javascript" src="' + file + '"></script>'); };

include("vec.js");
include("sprite.js");
include("player.js");
include("map.js");

var keys = { 37:0, 38:0, 39:0, 40:0, 88:0, 89:0 };
window.onkeydown = function (e) { keys[e.which] = 1; };
window.onkeyup = function (e) { keys[e.which] = 0; };



var canvas;
var ctx;

var player;
var camera;
var map;

window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 2;

	player = new Player();
	camera = player.pos.dup();
	map = new Map();
	wait();
};


var wait = function() {

	// wait for sprites to be loaded
	if(Sprite.prototype.imagesToLoad > 0) {
		console.log(Sprite.prototype.imagesToLoad);
		setTimeout(wait, 20);
	}
	else {
		// initiate loop
		setInterval(loop, 25);	// 40 fps
	}
};

var updateCamera = function() {

	if(camera.x < player.pos.x - canvas.width/6) camera.x = player.pos.x - canvas.width/6;
	else if(camera.x > player.pos.x + canvas.width/6) camera.x = player.pos.x + canvas.width/6;
	if(camera.y < player.pos.y - canvas.height/6) camera.y = player.pos.y - canvas.height/6;
	else if(camera.y > player.pos.y + canvas.height/6) camera.y = player.pos.y + canvas.height/6;

	var mapWidth = map.data[0].length * TILE_SIZE;
	var mapHeight = map.data.length * TILE_SIZE;

	if(camera.x < canvas.width/2) camera.x = canvas.width/2;
	else if(camera.x > mapWidth - canvas.width/2) camera.x = mapWidth - canvas.width/2;
	if(camera.y < canvas.height/2) camera.y = canvas.height/2;
	else if(camera.y > mapHeight - canvas.height/2) camera.y = mapHeight - canvas.height/2;

};

var loop = function() {

	// update game state
	player.update();
	map.collision(player);
	updateCamera();


	// render
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(-camera.x + canvas.width/2, -camera.y + canvas.height/2);
	map.draw();
	player.draw();
	ctx.restore();

};



