

var Player = function() {

	this.p = vec(160, 100);
	this.v = vec(0, 0);
	this.radius = 12;

	this.inAir = true;
	this.normal = vec(0, -1);
};

Player.prototype.draw = function() {

	if(this.inAir) ctx.fillStyle = "#166";
	else ctx.fillStyle = "#661";

	ctx.beginPath();
	ctx.arc(this.p.x, this.p.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();

	ctx.strokeStyle = "#00f";
	var n = this.p.add(this.normal.mul(20));
	ctx.beginPath();
	ctx.lineTo(this.p.x, this.p.y);
	ctx.lineTo(n.x, n.y);
	ctx.stroke();
	
};

Player.prototype.update = function() {

	if(this.inAir) {


	}
	else {
	
		var d = this.normal.perp().mul((keys[37] - keys[39]) * 0.3);
		this.v.x += d.x;
		this.v.y += d.y;
	
	}


	this.v.y += 0.17; // (keys[40] - keys[38]) * 0.5
/*
	this.v.x *= 0.98;
	this.v.y *= 0.98;
*/

	this.p.x += this.v.x;
	this.p.y += this.v.y;

};


