var Map = function() {

	this.data = [
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[1,1,1,1]
	];
};

Map.prototype.draw = function() {

	ctx.fillStyle = "#777";

	for(var y = 2, ly = this.data.length; y < ly; ++y) {
		for(var x = 0, lx = this.data[y].length; x < lx; ++x) {

			if (this.data[y][x]) {
			    drawSprite('mud',
				       x * 32, y * 32);
			    if (!this.data[y-1] || !this.data[y-1][x]) {
				drawSprite('hangingWeed',
					   x * 32, y * 32);
			    }
			}
		}
	}

};

var map = new Map();
