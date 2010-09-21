var include = function(file) { document.write('<script type="text/javascript" src="' + file + '"></script>'); };


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

	player = new Player();
	map = new Map();
	layers[0] = [player];
	layers[10] = [map];

	setInterval(loop, 20);	// 50 fps
};


var loop = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.update();
	map.collision(player);

	var layerZs = Object.keys(layers).map(function(key) { return parseInt(key, 10); });

	var minZ = layerZs[0], maxZ = layerZs[layerZs.length - 1];

	for(var z = maxZ; z >= minZ; z--) {
	    if (layers[z])
		layers[z].forEach(function(obj) {
		    obj.draw();
		});
	}
};

var SCALE = 1;
var sprites = { player0: { src: 'sprite.png',
			   x: 0, y: 0, w: 9, h: 11 },
		player1: { src: 'sprite.png',
			   x: 9, y: 0, w: 9, h: 11 },
		player2: { src: 'sprite.png',
			   x: 18, y: 0, w: 9, h: 11 },
		player3: { src: 'sprite.png',
			   x: 27, y: 0, w: 9, h: 11 },
		player4: { src: 'sprite.png',
			   x: 36, y: 0, w: 9, h: 11 },
		hangingWeed: { src: 'sprite.png',
			       x: 0, y: 16, w: 32, h: 10 },
		mud: { src: 'sprite.png',
		       x: 32, y: 16, w: 32, h: 32 }
	      };
var images = {};  // cached
drawSprite = function(spriteId, x, y) {
    var sprite = sprites[spriteId];
    var image = images[sprite.src];
    if (!image) {
	// load image
	image = new Image();
	image.src = sprite.src;
	images[sprite.src] = image;
	image.onload = function() {
	    // our annotation
	    image.hasLoaded = true;
	};
    } else {
	if (image.hasLoaded) {
	    try {
		ctx.drawImage(image,
			      sprite.x, sprite.y, sprite.w, sprite.h,
			      x * SCALE, y * SCALE, sprite.w * SCALE, sprite.h * SCALE);
	    } catch (e) {
		console.log(e.stack || e.message || e);
		console.log('drawImage ' + JSON.stringify([sprite.x, sprite.y, sprite.w, sprite.h,
			      x * SCALE, y * SCALE, sprite.w * SCALE, sprite.h * SCALE]));
		/*console.log(spriteId + ': ' + JSON.stringify([x, y]));*/
	    }
	}
    }
};

if (!Object.keys)
    Object.keys = function(o) {
	var r = [];
	for(var k in o)
	    if (o.hasOwnProperty(k))
		r.push(k);
	return r;
    };
