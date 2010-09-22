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
	this.tileSize = 32;
};

Map.prototype.draw = function() {

	ctx.fillStyle = "#777";

	for(var y = 2, ly = this.data.length; y < ly; ++y) {
		for(var x = 0, lx = this.data[y].length; x < lx; ++x) {
			if (this.data[y][x]) {
			    drawSprite('bricks',
				       x * this.tileSize, y * this.tileSize);
			    if (!this.data[y-1] || !this.data[y-1][x]) {
				drawSprite('hangingWeed',
					   x * this.tileSize, y * this.tileSize);
			    }
			}
		}
	}

};


Map.prototype.tileCollision = function(id, x, y) {
	if(id == 1) {



	}
	return { d: 0, nx: 0, ny: 0, px: 0, py: 0 };
};


Map.prototype.collision = function(player) {

	var x1 = Math.floor(player.x / this.tileSize);
	var y1 = Math.floor(player.y / this.tileSize);



};








