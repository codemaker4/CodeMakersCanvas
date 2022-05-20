import { Vec2d } from "./libraries/vec2d.js";
import { CmCanvas } from "./libraries/CodeMakersCanvas.js";

let cmCanvas = new CmCanvas("mainCanvas");
let ctx = cmCanvas.ctx;

cmCanvas.camera.pos = cmCanvas.size.copy().div(2);

let counter = 0;

function draw() {
    cmCanvas.clear();
    cmCanvas.camera.doTransform();

    ctx.fillStyle = "#f00";
    ctx.fillRect(cmCanvas.worldMousePos.x, cmCanvas.worldMousePos.y, 10, 10);

    ctx.fillStyle = "#0f0";
    ctx.fillRect((Math.cos(counter/50)+1) * cmCanvas.size.x/2 - 10, (Math.sin(counter/50)+1) * cmCanvas.size.y/2 - 10, 20, 20);

    ctx.fillStyle = "#00f";
    ctx.fillRect(0,0,100,100);
    ctx.fillRect(cmCanvas.size.x-100,cmCanvas.size.y-100,100,100);
    ctx.fillRect(0,cmCanvas.size.y-100,100,100);
    ctx.fillRect(cmCanvas.size.x-100,0,100,100);
    
    counter ++;

    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
