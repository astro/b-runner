var Map = function() {

	this.data = [
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
		[1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];

	this.tileSize = 20;
};


Map.prototype.draw = function() {

	ctx.fillStyle = "#777";
/*
	for(var y = 0, ly = this.data.length; y < ly; ++y) {
		for(var x = 0, lx = this.data[y].length; x < lx; ++x) {

			if(this.data[y][x]) {
				ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
			}
		}
	}
*/

	ctx.beginPath();
	var v;
	for(var i = POLY.length - 1; i >= 0; --i) {
		v = POLY[i];
		ctx.lineTo(v.x, v.y);
	}
	ctx.fill();

};




var POLY = [vec(100, 180), vec(300, 100), vec(350, 200)];

var line = function(a, b) {
	ctx.beginPath();
	ctx.lineTo(a.x, a.y);
	ctx.lineTo(b.x, b.y);
	ctx.stroke();
};

var polygonCollision = function(poly, m) {

	var col = {};
	col.d = 9e9;

	var m = vec(player.x, player.y);

	var len = POLY.length;
	var a = POLY[len - 1];
	var b;
	var i;
	for(i = 0; i < len; ++i) {
		b = POLY[i];

		var ab = b.sub(a);
		var am = m.sub(a);

		var p = null;
		var d;
		var n;

		var q = ab.dot(am) / ab.lenSq();
		if(q < 0) p = a;
		else if(q > 1) p = b;

		if(p) { // vertex
			n = m.sub(p);
			d = n.len();
			n.normalize();
		}
		else { // line
			p = a.add(ab.mul(q));
			n = ab.perp().normalize();
			d = n.dot(am);
		}
		if(Math.abs(d) < Math.abs(col.d)) {
			col.d = d;
			col.n = n;
			col.p = p;
		}

		a = b;
	}

	return col;
}

Map.prototype.collision = function(player) {

	var col = polygonCollision(POLY, vec(player.x, player.y));

	if(col.d < player.radius) {

		ctx.strokeStyle = "#00f";
		line(col.p, col.p.add(col.n.mul(20)));

		// apply corrections here
		col.d -= player.radius;

		var k = col.n.mul(col.d);
		player.x -= k.x;
		player.y -= k.y;

		var dp = vec(player.dx, player.dy);
		var pn = col.n.perp();
		dp = pn.mul(dp.dot(pn));
		player.dx  = dp.x;
		player.dy  = dp.y;
	}

/*
	var x1 = Math.floor(player.x / this.tileSize - 0.5);
	var y1 = Math.floor(player.y / this.tileSize - 0.5);

	var col = { d: 0 };

	ctx.fillStyle = "#f00";

	for(var y = y1; y < y1 + 2; ++y) {
		var row = this.data[y];
		if(!row) continue;
		for(var x = x1; x < x1 + 2; ++x) {
//			if(row[x])
				ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);

		}
	}
*/


};

