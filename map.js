

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

	for(var y = 0, ly = this.data.length; y < ly; ++y) {
		for(var x = 0, lx = this.data[y].length; x < lx; ++x) {



			if(this.data[y][x]) ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
		}
	}

};


Map.prototype.tileCollision = function(id, x, y) {
	if(id == 1) {
	
	
	
	}
	return { d: 0 };
};


Map.prototype.collision = function(player) {

	var x1 = Math.floor(player.x / this.tileSize);
	var y1 = Math.floor(player.y / this.tileSize);

	var col = { d: 0 };

	for(var y = y1, ; y < y1 + 2; ++y) {
		for(var x = x1, ; x < x1 + 2; ++x) {

			var c = this.tileCollision(data[y][x],
					player.x - x * this.tileSize,
					player.y - y * this.tileSize)
		}
	}



};






