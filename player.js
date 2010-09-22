


var Player = function() {

	this.x = 160;
	this.y = 100;
	this.dx = 0;
	this.dy = 0;
	this.radius = 10;

};

Player.prototype.draw = function() {

	ctx.fillStyle = "#222";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();

};

Player.prototype.update = function() {

	this.dx += (keys[39] - keys[37]) * 0.5;
	this.dy += (keys[40] - keys[38]) * 0.5 + 0.17;
	this.dx *= 0.98;
	this.dy *= 0.98;

	this.x += this.dx;
	this.y += this.dy;

	if(this.y > 290) {	// collision
		this.y = 290;
		this.dy = 0;
	}

	cameraX = this.x;
	cameraY = this.y;
};


