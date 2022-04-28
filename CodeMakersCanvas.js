/**
 * A class wrapping a html canvas with 2d rendering context.
 * @author CodeMaker_4
 * @version Alpha_0.1
 */
class CmCanvas {
    static library = "codemaker4/CmCanvas";
    static verson = 0.000;
    /**
     * Create a new CmCanvas and bind it to a given HTML canvas element by id.
     * @param {string} canvasId The id of the canvas you want to use.
     */
    constructor(canvasId) {
        try {
            if (!Vec2d) throw "CodeMakersCanvas requires github.com/codemaker4/vec2d";
        } catch (e) {
            throw "CodeMakersCanvas requires github.com/codemaker4/vec2d";
        }
        if (Vec2d.library !== "codemaker4/vec2d") console.warn("You seem to be using an alternative Vec2d library. This can work fine, but it is better to use github.com/codemaker4/vec2d instead.");
        if (Vec2d.library == "codemaker4/vec2d" && Vec2d.version < 1) console.warn("You seem to be using an older version of github.com/codemaker4/vec2d. Please directly use the github link to always use the latest version.");
        /**
         * The selected canvas element.
         * @type {HTMLCanvasElement}
         */
        this.canvas = document.getElementById(canvasId);
        /**
         * The CanvasRenderingContext2D of the canvas.
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        /**
         * The width of the connected canvas.
         * @type {number}
         */
        this.width = this.canvas.width;
        /**
         * The height of the connected canvas.
         * @type {number}
         */
        this.height = this.canvas.height;

        window.addEventListener("resize", () => {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        });

        /**
         * The X-position of the mouse
         */
        this.mouseX = 0;
    }
    /**
     * Clear the canvas.
     */
    clear() {
        ctx.clearRect(0,0,cmCanvas.canvas.width, cmCanvas.canvas.height);
    }
}