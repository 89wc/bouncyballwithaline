import { Vec2, vec2 } from './structs.js';

export class Renderer {
	constructor(canvas, world) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.world = world;
	}
	clear(bg = 'black') {
		this.ctx.fillStyle = bg;
		this.ctx.fillRect(
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
	}
	point(v2, radius = 10, color = 'red') {
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(v2.x, v2.y, radius, 0, 2*Math.PI);
		this.ctx.fill();
	}
	screen(v2) {
		return new Vec2(
			(    (v2.x / this.world.width  + 1)/2)
			* this.canvas.width,

			(1 - (v2.y / this.world.height + 1)/2)
			* this.canvas.height
		);
	}

	line(v2a, v2b, color = 'white', width = 1) {
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = width;
		this.ctx.beginPath();
		this.ctx.moveTo(v2a.x, v2a.y);
		this.ctx.lineTo(v2b.x, v2b.y);
		this.ctx.stroke();
	}
}
