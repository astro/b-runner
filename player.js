
var GRAVITY = 0.6;
var MAX_SPEED = 14;

var Player = function() {

	this.p = vec(160, 100);
	this.v = vec(0, 0);
	this.radius = 14;

	this.speed = 0;


	this.groundForce = 0;
	this.normal = vec(0, -1);

	this.inAir = true;

	this.jumpState = 0;
	this.lastJump = 0;

};


Player.prototype.update = function() {

	ctx.fillStyle = "#000";
	ctx.fillText(this.groundForce, 20, 20);

	console.log(this.groundForce);


	if(this.groundForce < 0) this.inAir = false;
	else this.inAir = true;

	if(!this.inAir) {

		var d = this.normal.perp().mul((keys[37] - keys[39]) * 5);
		this.v.mov( d);
	
		// initialize jump
		if(keys[88] && !this.lastJump) {
			this.jumpState = 10;
			this.v.y = -7;
		}
	}
	else {
		// jump higher
		if(this.jumpState > 0 && this.lastJump && keys[88]) {
			this.jumpState--;
			this.v.y = -7;
		}

//		var d = this.normal.perp().mul((keys[37] - keys[39]) * 5);
//		this.v.x = d.x;

	}
	this.lastJump = keys[88];


	// gravity
	this.v.y += GRAVITY;

	// limit speed
	if(this.v.lenSq() > MAX_SPEED * MAX_SPEED) {
		this.v.normalize();
		this.v.mulEq(MAX_SPEED);
	}

	// apply velocity
	this.p.addEq(this.v);

};


Player.prototype.draw = function() {

	if(this.inAir) ctx.fillStyle = "#166";
	else ctx.fillStyle = "#661";

	ctx.beginPath();
	ctx.arc(this.p.x, this.p.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();

	ctx.strokeStyle = "#00f";
	var n = this.p.add(this.normal.mul(20 * this.groundForce));
	ctx.beginPath();
	ctx.lineTo(this.p.x, this.p.y);
	ctx.lineTo(n.x, n.y);
	ctx.stroke();

};

