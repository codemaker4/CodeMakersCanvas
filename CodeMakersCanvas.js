/**
 * A class wrapping a html canvas with 2d rendering context.
 * @author CodeMaker_4
 * @version Alpha_0.1
 */
class CmCanvas {
    /**
     * Create a new CmCanvas and bind it to a given HTML canvas element by id.
     * @param {string} canvasId The id of the canvas you want to use.
     */
    constructor(canvasId) {
        /** @type {HTMLCanvasElement} The selected canvas element.*/
        this.canvas = document.getElementById(canvasId);
        /** @type {CanvasRenderingContext2D} The CanvasRenderingContext2D of the canvas.*/
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        window.addEventListener("resize", () => {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
        });
    }
}