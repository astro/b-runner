

var Sprite = function(src) {
	var that = this;
	this.constructor.prototype.imagesToLoad++;
	var img = new Image();
	img.src = src;
	img.onload = function() {
		that.canvas = document.createElement("canvas");
		that.ctx = that.canvas.getContext("2d");
		that.canvas.width = img.width;
		that.canvas.height = img.height * 2;	// twice the height for flipped sprites
		that.frameCount = Math.floor(img.width / img.height);
		that.frameSize = img.height;
		// copy frames to canvas
		that.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
		// copy flipped frames to canvas
		for(var i = 0; i < that.frameCount; ++i) {
			for(var x = 0; x < that.frameSize; ++x) {
				that.ctx.drawImage(img, i * that.frameSize + x, 0, 1, img.height,
										i * that.frameSize + that.frameSize - 1 - x, img.height, 1, img.height);
			}
		}
		that.constructor.prototype.imagesToLoad--;
	}
};
Sprite.prototype.imagesToLoad = 0;


