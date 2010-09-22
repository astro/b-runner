var include = function(file) { document.write('<script type="text/javascript" src="' + file + '"></script>'); };


include("player.js");
include("map.js");


// input
var keys = { 37:0, 38:0, 39:0, 40:0, 88:0, 89:0 };
window.onkeydown = function (e) { keys[e.which] = 1; };
window.onkeyup = function (e) { keys[e.which] = 0; };


var canvas, canvas2;
var ctx, ctx2;

var player;
var cameraX = 0, cameraY = 0;
var map;
var layers = [];

var backdrop = {
    draw: function() {
	var x, w2 = canvas.width / 2;
	for(x = -w2; x < w2; x += 10)
	    drawSprite('sky', cameraX + x, cameraY - 100);
	var xShift = cameraX / 3;
	var yShift = cameraY / 10;
	for(x = cameraX - w2 - xShift; x < cameraX + w2; x += 400)
	    drawSprite('scenery', x, cameraY - yShift);
    }
};


window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	canvas2 = document.getElementById("canvas2");
	ctx2 = canvas2.getContext('2d');

	player = new Player();
	map = new Map();
	layers[0] = [player];
	layers[5] = [map];
	layers[10] = [backdrop];

	setInterval(loop, 20);	// 50 fps
};


var loop = function() {
	player.update();
	map.collision(player);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	//console.log(JSON.stringify({cameraX:cameraX,cameraY:cameraY,w:canvas.width,h:canvas.height,x:Math.round(canvas.width / 2 - cameraX),y:Math.round(canvas.height / 2 - cameraY)}));
	ctx.translate(Math.round(canvas.width / 2 - cameraX),
		      Math.round(canvas.height / 2 - cameraY));

	var layerZs = Object.keys(layers).map(function(key) { return parseInt(key, 10); });

	var minZ = layerZs[0], maxZ = layerZs[layerZs.length - 1];

	for(var z = maxZ; z >= minZ; z--) {
	    if (layers[z])
		layers[z].forEach(function(obj) {
		    obj.draw();
		});
	}

	ctx.restore();
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
	ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height,
		       0, 0, canvas2.width, canvas2.height);
};

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
		       x: 32, y: 16, w: 32, h: 32 },
		bricks: { src: 'sprite.png',
			  x: 64, y: 16, w: 32, h: 32 },
		sky: { src: 'sky.png' },
		scenery: { src: 'scenery.png' }
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
	    // get defaults
	    if (sprite.x === undefined)
		sprite.x = 0;
	    if (sprite.y === undefined)
		sprite.y = 0;
	    if (sprite.w === undefined)
		sprite.w = image.width;
	    if (sprite.h === undefined)
		sprite.h = image.height;
	    // our annotation
	    image.hasLoaded = true;
	};
    } else {
	if (image.hasLoaded) {
	    try {
		ctx.drawImage(image,
			      sprite.x, sprite.y, sprite.w, sprite.h,
			      Math.round(x), Math.round(y), sprite.w, sprite.h);
	    } catch (e) {
		console.log(e.stack || e.message || e);
		console.log({drawImage:[image,
			      sprite.x, sprite.y, sprite.w, sprite.h,
			      x, y, sprite.w, sprite.h]});
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
