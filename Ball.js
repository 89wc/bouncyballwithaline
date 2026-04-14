import { Vec2, vec2 } from './structs.js';

export class Ball {
	constructor(
		renderer,
		v2pos = vec2(0,0),
		v2vel = vec2(0,0),
		radius = 0.06,
		color = 'green',
	) {
		this.renderer = renderer;
		this.pos = v2pos;
		this.vel = v2vel;
		this.radius = radius;
		this.color = color;
	}
	setAngle(θ, speed) {
		this.vel.x = Math.cos(θ) * speed;
		this.vel.y = Math.sin(θ) * speed;
	}
	handleWallCollision() {
		const world = this.renderer.world;
		if(this.pos.x - this.radius < -world.width) {
			this.vel.x *= -1;
			this.pos.x = -world.width + this.radius;
		}
		if(this.pos.x + this.radius > world.width) {
			this.vel.x *= -1;
			this.pos.x = world.width - this.radius;
		}
		if(this.pos.y - this.radius < -world.height) {
			this.vel.y *= -1;
			this.pos.y = -world.height + this.radius;
		}
		if(this.pos.y + this.radius > world.height) {
			this.vel.y *= -1;
			this.pos.y = world.height - this.radius;
		}
	}
	update(DSEC) {
		this.pos.x += this.vel.x * DSEC;
		this.pos.y += this.vel.y * DSEC;
		this.handleWallCollision();
	}
	render() {
		const pixelRadius =
			(this.radius / this.renderer.world.height)
			* (this.renderer.canvas.height / 2);

		this.renderer.point(
			this.renderer.screen(this.pos),
			pixelRadius,
		);

		const lineLength = 2;
		const lineEnd = vec2(
			this.pos.x + this.vel.x * lineLength,
			this.pos.y + this.vel.y * lineLength
		);
		const lineEnd2 = vec2(
			this.pos.x + -this.vel.x * lineLength,
			this.pos.y + -this.vel.y * lineLength
		);

		this.renderer.line(
			this.renderer.screen(this.pos),
			this.renderer.screen(lineEnd),
			'white'
		);
		this.renderer.line(
			this.renderer.screen(this.pos),
			this.renderer.screen(lineEnd2),
			'red'
		);
	}
};
