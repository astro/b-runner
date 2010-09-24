

var Player = function() {

	this.pos = vec(160, 100);
	this.vel = vec(0, 0);
	this.radius = 15;

	this.normal = vec(0, -1);
	this.collision = false;
	this.inAir = true;

	this.jumpState = 0;
	this.lastJump = 0;

};



var GRAVITY = 0.6;
var MAX_SPEED = 12;
var MAX_X_SPEED = 6;
var FRICTION_GROUND = 0.4;
var FRICTION_AIR = 0.2;


Player.prototype.applyFriction = function() {

	var dir
	if(this.inAir) {
		dir = this.vel.x;
		friction = FRICTION_AIR;
	}
	else {
		var perp = this.normal.perp();
		dir = -perp.dot(this.vel);
		friction = FRICTION_GROUND;
	}

	if(dir > 0) {
		dir -= friction;
		if(dir < 0) dir = 0;
		else if(dir > MAX_X_SPEED) dir = MAX_X_SPEED;
	}
	else if(dir < 0) {
		dir += friction;
		if(dir > 0) dir = 0;
		else if(dir < -MAX_X_SPEED) dir = -MAX_X_SPEED;
	}

	if(this.inAir) this.vel.x = dir;
	else {
		this.vel = this.normal.mul(this.normal.dot(this.vel));
		this.vel.subEq(perp.mul(dir));
	}

};

Player.prototype.update = function() {

	var t = keys[39] - keys[37];
	var perp = this.normal.perp();

	if(this.collision && this.normal.y < -0.6) {
		this.inAir = false;

		// friction
		this.applyFriction(FRICTION_GROUND);
		this.vel.subEq(perp.mul(t * FRICTION_GROUND * 2));

		// initialize jump
		if(keys[88] && !this.lastJump) {
			this.jumpState = 10;
			this.vel.addEq(this.normal.mul(5));

			h = this.pos.y;
			hx = 0;
		}
	}
	else {
		this.inAir = true;

		// friction
		this.applyFriction(FRICTION_AIR);
		this.vel.x += t * FRICTION_AIR * 2;

		// jump higher
		if(this.jumpState > 0 && this.lastJump && keys[88]) {
			this.jumpState--;
			this.vel.y = -7;
		}
		else this.jumpState = 0;
	}
	this.lastJump = keys[88];

	// gravity
	this.vel.y += GRAVITY;

	// limit speed
	if(this.vel.lenSq() > MAX_SPEED * MAX_SPEED) {
		this.vel.normalize();
		this.vel.mulEq(MAX_SPEED);
	}

	// apply velocity
	this.pos.addEq(this.vel);

};


Player.prototype.draw = function() {

	if(this.inAir) ctx.fillStyle = "#166";
	else ctx.fillStyle = "#661";

	ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();

	ctx.strokeStyle = "#00f";
	var n = this.pos.add(this.normal.mul(20 * this.groundForce));
	ctx.beginPath();
	ctx.lineTo(this.pos.x, this.pos.y);
	ctx.lineTo(n.x, n.y);
	ctx.stroke();

};

