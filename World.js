export class World {
	constructor(canvas, width, height) {
		canvas.width = width;
		canvas.height = height;
		this.width = width / height;
		this.height = 1;
	}
}
