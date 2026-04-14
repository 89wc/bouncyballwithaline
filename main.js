import { Vec2, vec2 } from './structs.js';
import { Renderer } from './Renderer.js';
import { World } from './World.js';
import { Ball } from './Ball.js';

const canvas = document.getElementById('canvas');
const world = new World(canvas, 640, 512);
const renderer = new Renderer(canvas, world);

const ball = new Ball(renderer);

ball.pos = vec2(-0.5, 0.5);
ball.setAngle(Math.PI / 2.8, 1.5);

function update(DELTA) {
	const DSEC = DELTA / 1000;
	ball.update(DSEC);
}
function render() {
	renderer.clear();
	ball.render();
}

let lastTime = 0;
function frame(timestamp) {
	const DELTA = timestamp - lastTime;
	lastTime = timestamp;
	update(DELTA);
	render();
	requestAnimationFrame(frame);
}
requestAnimationFrame(frame);


