(function() {

	this.vec = function(x, y) {
		return new V(x, y);
	}

	var V = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

	V.prototype.mov = function(o) {
		this.x = o.x;
		this.y = o.y;
	}

	V.prototype.addEq = function(o) {
		this.x += o.x;
		this.y += o.y;
	}

	V.prototype.subEq = function(o) {
		this.x -= o.x;
		this.y -= o.y;
	}

	V.prototype.mulEq = function(f) {
		this.x *= f;
		this.y *= f;
	}

	V.prototype.dup = function() {
		return new V(this.x, this.y);
	}

	V.prototype.equ = function(o) {
		return this.x == o.x && this.y == o.y;
	}

	V.prototype.neg = function() {
		return new V(-this.x, -this.y);
	}

	V.prototype.add = function(o) {
		return new V(this.x + o.x, this.y + o.y);
	}

	V.prototype.sub = function(o) {
		return new V(this.x - o.x, this.y - o.y);
	}

	V.prototype.mul = function(f) {
		return new V(this.x * f, this.y * f);
	}

	V.prototype.dot = function(o) {
		return this.x * o.x + this.y * o.y;
	}

	V.prototype.lenSq = function() {
		return this.x * this.x + this.y * this.y;
	}

	V.prototype.len = function() {
		return Math.sqrt(this.lenSq());
	}

	V.prototype.perp = function() {
		return new V(this.y, -this.x);
	}

	V.prototype.cross = function(o) {
		return this.perp().dot(o);
	}

	V.prototype.normalize = function() {
		var ool = 1 / this.len();
		this.x *= ool;
		this.y *= ool;
		return this;
	}

	V.prototype.toString = function() {
		return "vec(" + this.x + "," + this.y + ")";
	}

})();

