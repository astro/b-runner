var include = function(file) { document.write('<script type="text/javascript" src="' + file + '"></script>'); };

include("vec.js");
include("sprite.js");
include("player.js");
include("map.js");

var keys = { 37:0, 38:0, 39:0, 40:0, 88:0, 89:0 };


var canvas;
var ctx;

var player;
var camera;
var map;
var comrades = {};

var startGame = function() {
	document.write('<canvas id="canvas" width="640" height="480" style="background-color:#ddd;border:1px solid black"></canvas>');
	canvas = document.getElementById("canvas");
	document.addEventListener('keydown', function (e) { keys[e.which] = 1; }, true);
	document.addEventListener('keyup', function (e) { keys[e.which] = 0; }, true);

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
	comrades.draw();

	ctx.restore();

};

comrades.draw = function() {
    var comrade;
    var R = 15;  // radius

    for(var k in this)
	if (this.hasOwnProperty(k) &&
	    (comrade = comrades[k]) &&
	    comrade.pos) {

	    //console.log('draw on ' + JSON.stringify(comrade));

	    ctx.fillStyle = "#333";
	    ctx.beginPath();
	    ctx.arc(comrade.pos.x, comrade.pos.y, R, 0, Math.PI*2, true);
	    ctx.fill();

	    ctx.font = "14px Verdana";
	    ctx.textAlign = "center";
	    ctx.textBaseline = "bottom";
	    ctx.fillText(comrade.nick, comrade.pos.x, comrade.pos.y - R);
	}
};

var joinGame = function(event) {
    event.preventDefault();

    var nickInput = document.getElementById('nick');
    var nick = nickInput.value;

    var socket = new io.Socket();
    socket.connect();
    socket.on('connect', function(){
	document.body.removeChild(document.getElementById('join'));
	startGame();

	var oldPos = player.pos.dup();
	socket.send({ nick: nick, pos: player.pos });

	setInterval(function() {
	    if (player.pos.x !== oldPos.x ||
		player.pos.y !== oldPos.y) {

		oldPos = player.pos.dup();
		socket.send({pos: player.pos });
	    }
	}, 50);
    });
    socket.on('message', function(message){
	var data;
	try {
	    data = JSON.parse(message);
	} catch (x) {
	    console.error("Cannot parse: " + message);
	    return;
	}

	if (data.status === 'disconnected')
	    delete comrades[data.id];
	else
	    comrades[data.id] = { nick: data.nick,
				  pos: data.pos,
				  radius: 15 };
    });
    console.log(socket);
};

document.getElementById('joinButton').onclick = joinGame;
