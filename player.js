


var Player = function() {

	this.p = vec(160, 100);
	this.v = vec(0, 0);
	this.radius = 10;

};

Player.prototype.draw = function() {

	ctx.fillStyle = "#222";
	ctx.beginPath();
	ctx.arc(this.p.x, this.p.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();

};

Player.prototype.update = function() {

	this.v.x += (keys[39] - keys[37]) * 0.5;
	this.v.y += (keys[40] - keys[38]) * 0.5 + 0.17;
	this.v.x *= 0.98;
	this.v.y *= 0.98;

	this.p.x += this.v.x;
	this.p.y += this.v.y;

};


