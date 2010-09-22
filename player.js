


var Player = function() {

	this.x = 160;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.radius = 10;

	this.frame = 0;
	this.anim = 0;
};

Player.prototype.draw = function() {

	this.frame = (this.frame + 1) % 3;
	if(!this.frame) { this.anim = (this.anim + 1) % 3; }

	var a = 3;
	if(this.dy) { a = 4; }
	else if(this.dx) { a = this.anim; }

	drawSprite('player' + a, this.x - 9, this.y - 11);
};

Player.prototype.update = function() {

	if(this.dy == 0) { // when on ground


		if(keys[88]) this.dy = -5;	// jump
	}

	this.dx = (keys[39] - keys[37]) * 3;
	this.dy += 0.17;

	this.x += this.dx;
	this.y += this.dy;

	if(this.y > 290) {	// collision
		this.y = 290;
		this.dy = 0;
	}

	cameraX += (this.x - cameraX) / 10;
	cameraY += (this.y - cameraY) / 10;
};


