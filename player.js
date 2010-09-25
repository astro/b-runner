

var Player = function() {

	this.pos = vec(300, 400);
	this.vel = vec(0, 0);
	this.radius = 15;

	this.normal = vec(0, -1);
	this.collision = false;
	this.inAir = true;
	this.dir = 1;

	this.jumpState = 0;
	this.lastJump = 0;

};

Player.prototype.sprite = new Sprite("anim.png");

var GRAVITY = 0.4;
var MAX_SPEED = 10;
var MAX_X_SPEED = 5;
var FRICTION_GROUND = 0.3;
var FRICTION_AIR = 0.1;


Player.prototype.applyFriction = function() {

	var local_dx;
	if(this.inAir) {
		local_dx = this.vel.x;
		friction = FRICTION_AIR;
	}
	else {
		var perp = this.normal.perp();
		local_dx = -perp.dot(this.vel);
		friction = FRICTION_GROUND;
	}

	if(local_dx > 0) {
		local_dx -= friction;
		if(local_dx < 0) local_dx = 0;
		else if(local_dx > MAX_X_SPEED) local_dx = MAX_X_SPEED;
	}
	else if(local_dx < 0) {
		local_dx += friction;
		if(local_dx > 0) local_dx = 0;
		else if(local_dx < -MAX_X_SPEED) local_dx = -MAX_X_SPEED;
	}

	if(this.inAir) this.vel.x = local_dx;
	else {
		this.vel = this.normal.mul(this.normal.dot(this.vel));
		this.vel.subEq(perp.mul(local_dx));
	}

};

Player.prototype.update = function() {

//	console.log(this.normal.y + " " + this.collision);

	var t = keys[39] - keys[37];
	var perp = this.normal.perp();

	if(this.collision && this.normal.y < -0.6) {
		this.inAir = false;

		// friction
		this.applyFriction(FRICTION_GROUND);
		this.vel.subEq(perp.mul(t * FRICTION_GROUND * 2));

		// initialize jump
		if(keys[88] && !this.lastJump) {
			this.jumpState = 20;
			this.vel.subEq(this.normal.mul(GRAVITY * -12));

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
			this.vel.y = GRAVITY * -12;
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

	// sptite direction
	if(this.vel.x > 0.000001) this.dir = 1;
	else if(this.vel.x < -0.000001) this.dir = -1;
};


Player.prototype.draw = function() {

	ctx.save();
	ctx.transform(-this.normal.y, this.normal.x, -this.normal.x, -this.normal.y, this.pos.x, this.pos.y);
	this.sprite.draw(2, this.dir < 0);
	ctx.restore();

	ctx.globalAlpha = 0.3;
	if(this.inAir) ctx.fillStyle = "#166";
	else ctx.fillStyle = "#661";
	ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();
	ctx.globalAlpha = 1;

};

