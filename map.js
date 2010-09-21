

var Map = function() {

	this.data = [
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[1,1,1,1]
	];

	this.tileSize = 20;

};

Map.prototype.draw = function() {

	ctx.fillStyle = "#777";

	for(var y = 0, ly = this.data.length; y < ly; ++y) {
		for(var x = 0, lx = this.data[y].length; x < lx; ++x) {

			if(this.data[y][x]) ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);

		}
	}

};

var map = new Map();
