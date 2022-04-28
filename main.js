let cmCanvas = new CmCanvas("mainCanvas");
let ctx = cmCanvas.ctx;

let counter = 0;

function draw() {
    cmCanvas.clear();

    ctx.fillStyle = "#f00";
    // ctx.fillRect((Math.cos(counter/100)+1) * cmCanvas.width/3, (Math.sin(counter/100)+1) * cmCanvas.height/3, 10, 10);
    ctx.fillRect(cmCanvas.mouseX, cmCanvas.mouseY, 10, 10);

    counter++;

    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
