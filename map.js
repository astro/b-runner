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


var line = function(a, b) {
	ctx.beginPath();
	ctx.lineTo(a.x, a.y);
	ctx.lineTo(b.x, b.y);
	ctx.stroke();
};


var POLYS = [
	[vec(100, 200), vec(150, 200), vec(200, 300), vec(100, 300)],
	[vec(200, 200), vec(300, 200), vec(300, 300), vec(200, 300)],
];


var polygonCollision = function(poly, m) {
	var col = { d: 9e9 };
	var len = poly.length;
	var a = poly[len - 1];
	var b;
	var i;
	for(i = 0; i < len; ++i) {
		b = poly[i];
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


	var col = { d: 9e9 };

	for(var p = POLYS.length - 1; p >= 0; --p) {
		var poly = POLYS[p];
		var c = polygonCollision(poly, vec(player.x, player.y));
		if(c.d < col.d) col = c;
	}

	if(col.d < player.radius) {
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

		ctx.strokeStyle = "#00f";
		line(col.p, col.p.add(col.n.mul(20)));
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


Map.prototype.draw = function() {

	ctx.fillStyle = "#777";
	ctx.strokeStyle = "#fff";

	for(var p = POLYS.length - 1; p >= 0; --p) {
		var poly = POLYS[p];

		ctx.beginPath();
		var v = poly[0];
		ctx.lineTo(v.x, v.y);
		for(var i = poly.length - 1; i >= 0; --i) {
			v = poly[i];
			ctx.lineTo(v.x, v.y);
		}
		ctx.fill();
		ctx.stroke();
	}

/*
	for(var y = 0, ly = this.data.length; y < ly; ++y) {
		for(var x = 0, lx = this.data[y].length; x < lx; ++x) {

			if(this.data[y][x]) {
				ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
			}
		}
	}
*/
};


