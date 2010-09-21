

var sprite = new Image();
sprite.src = "sprite.png";


Player = function () {

	this.x = 160;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;

	this.frame = 0;
	this.anim = 0;
};

Player.prototype.draw = function () {

	this.frame = (this.frame + 1) % 3;
	if(!this.frame) { this.anim = (this.anim + 1) % 3; }

	var a = 3;
	if(this.dy) { a = 4; }
	else if(this.dx) { a = this.anim; }

	ctx.drawImage(sprite, a*9, 0, 9, 11, this.x-9, this.y-11, 18, 22);

};
Player.prototype.update = function () {

	this.dx = (keys[39] - keys[37]) * 3;
	this.dy += 0.17;

	this.x += this.dx;
	this.y += this.dy;

	if(this.y > 290) {	// collision
		this.y = 290;
		this.dy = 0;
	}
	if(this.dy == 0 && keys[88] == 1) this.dy = -5;

};


