// input
var keys = { 37:0, 38:0, 39:0, 40:0, 88:0, 89:0 };
window.onkeydown = function (e) { keys[e.which] = 1; };
window.onkeyup = function (e) { keys[e.which] = 0; };


var canvas;
var ctx;

window.onload = function () {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	setInterval(loop, 20);
};


var Player = function () {

	this.x = 160;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;

	this.frame = 0;
	this.anim = 0;

	this.draw = function () {

		this.frame = (this.frame + 1) % 3;
		if(!this.frame) { this.anim = (this.anim + 1) % 3; }

		var a = 3;
		if(this.dy) { a = 4; }
		else if(this.dx) { a = this.anim; }

		ctx.drawImage(sprite, a*9, 0, 9, 11, this.x-9, this.y-11, 18, 22);

	};
	this.update = function () {

		this.dx = (keys[39]-keys[37]) * 3;
		this.dy += 0.17;

		this.x += this.dx;
		this.y += this.dy;

		if(this.y > 290) {	// collision
			this.y = 290;
			this.dy = 0;
		}
		if(this.dy == 0 && keys[88] == 1) this.dy = -5;

	};

}

var player = new Player();

var sprite = new Image();
sprite.src = "sprite.png";

var loop = function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.update();
	player.draw();


};
