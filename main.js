let cmCanvas = new CmCanvas("mainCanvas");
let ctx = cmCanvas.ctx;

let counter = 0;

function draw() {
    ctx.clearRect(0,0,cmCanvas.canvas.width, cmCanvas.canvas.height);

    ctx.fillStyle = "#f00";
    ctx.fillRect((Math.cos(counter/100)+1) * cmCanvas.canvas.width/3, (Math.sin(counter/100)+1) * cmCanvas.canvas.height/3, 10, 10);

    counter++;

    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
