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
        CmCanvas.chekLib(Vec2d, "codemaker4/vec2d", 1); // check for github.com/codemaker4/vec2d

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
     * Check if a given library exists and is
     * @param {function} lib The class/constructor of the library
     * @param {string} libName The unique github link of the library, like "codemaker4/vec2d"
     * @param {number} minVersion The minimum version required
     */
    static chekLib(lib, libName, minVersion) {
        if (!lib) throw `CodeMakersCanvas requires github.com/${libName}`;
        if (lib.library !== libName) console.warn(`You seem to be using an alternative ${libName} library. This can work fine, but it is better to use github.com/${libName} instead.`);
        if (lib.library == libName && lib.version < minVersion) console.warn(`You seem to be using an older version of github.com/${libName}. Please directly use the latest version.`);
    }
    /**
     * Clear the canvas.
     */
    clear() {
        ctx.clearRect(0,0,cmCanvas.canvas.width, cmCanvas.canvas.height);
    }
}