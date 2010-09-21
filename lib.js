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
var map;
var layers = [];


window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	setInterval(loop, 20);	// 50 fps

	player = new Player();
	map = new Map();
	layers[0] = [player];
};


var loop = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.update();
	map.collision(player);

	var layerZs = Object.keys(layers).map(function(key) { return parseInt(key, 10); });

	var minZ = layerZs[0], maxZ = layerZs[layerZs.length - 1];

	for(var z = maxZ; z >= minZ; z--) {
	    layers[z].forEach(function(sprite) {
		sprite.draw();
	    });
	}
	map.draw();

};

var sprites = {
	player0: { src: 'sprite.png', x: 0, y: 0, w: 9, h: 11 },
	player1: { src: 'sprite.png', x: 9, y: 0, w: 9, h: 11 },
	player2: { src: 'sprite.png', x: 18, y: 0, w: 9, h: 11 },
	player3: { src: 'sprite.png', x: 27, y: 0, w: 9, h: 11 },
	player4: { src: 'sprite.png', x: 36, y: 0, w: 9, h: 11 }
};

var images = {};  // cached

drawSprite = function(spriteId, x, y, w, h) {
	var sprite = sprites[spriteId];
	if (!images[sprite.src]) {
		// load image
		var image = new Image();
		image.src = sprite.src;
		images[sprite.src] = image;
	} else {
		var image = images[sprite.src];
		if (image.complete) {
			ctx.drawImage(image,
				  sprite.x, sprite.y, sprite.w, sprite.h,
				  x, y, w || sprite.w, h || sprite.h);
		}
	}
};

