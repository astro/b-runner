var TILE_SIZE = 20;

var Map = function() {

	this.data = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,6,6,6,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
		[1,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
		[1,1,1,1,0,0,0,0,0,0,0,0,3,1,1,1,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];
};

var line = function(a, b) {
	ctx.beginPath();
	ctx.lineTo(a.x, a.y);
	ctx.lineTo(b.x, b.y);
	ctx.stroke();
};

var tiles = [undefined,
	[vec(0, 0), vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],
	[vec(0, 0), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],
	[vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE), vec(0, TILE_SIZE)],
	[vec(0, 0), vec(TILE_SIZE, 0), vec(0, TILE_SIZE)],
	[vec(0, 0), vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE)],
	[vec(0, 0), vec(TILE_SIZE, 0), vec(TILE_SIZE, TILE_SIZE/2), vec(0, TILE_SIZE/2)],
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

/*
var circle = {};
circle.m = vec(200, 100);
circle.r = 50;

var circleCollision = function(circle, m) {
	var col = {};

	var n = m.sub(circle.m);
	col.d = n.len() - circle.r;
	col.n = n.normalize();
	col.p = circle.m.add(n.mul(circle.r));

	return col;
}
*/

Map.prototype.collision = function(player) {

	var m = vec(player.x, player.y);

	var col = { d: 9e9 };

	var x1 = Math.floor(player.x / TILE_SIZE - 0.5);
	var y1 = Math.floor(player.y / TILE_SIZE - 0.5);

	for(var y = y1; y < y1 + 2; ++y) {
		var row = this.data[y];
		if(!row) continue;
		for(var x = x1; x < x1 + 2; ++x) {
			if(!row[x]) continue;

			var poly = tiles[row[x]];
			if(!poly) continue;

			var q = vec(x * TILE_SIZE, y * TILE_SIZE);
			var w = m.sub(q);

			var c = polygonCollision(poly, w);
			if(c.d < col.d) col = c;

		}
	}


	if(col.d < player.radius) { 	// apply corrections

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

};


Map.prototype.draw = function() {

	ctx.fillStyle = "#777";
	ctx.strokeStyle = "#555";

	for(var y = 0, ly = this.data.length; y < ly; ++y) {
		for(var x = 0, lx = this.data[y].length; x < lx; ++x) {

			var poly = tiles[this.data[y][x]];
			if(poly === undefined) continue;

			ctx.beginPath();
			var v = poly[0];
			ctx.lineTo(v.x + x * TILE_SIZE, v.y + y * TILE_SIZE);
			for(var i = poly.length - 1; i >= 0; --i) {
				v = poly[i];
				ctx.lineTo(v.x + x * TILE_SIZE, v.y + y * TILE_SIZE);
			}
			ctx.fill();
			ctx.stroke();

		}
	}
};


