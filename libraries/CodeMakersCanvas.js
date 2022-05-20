import { Vec2d } from "./vec2d.js";
/**
 * A class wrapping a html canvas with 2d rendering context.
 * @author CodeMaker_4
 * @version Beta_0.001
 */
export class CmCanvas {
    static library = "codemaker4/CmCanvas";
    static verson = 0.001;
    /**
     * Create a new CmCanvas and bind it to a given HTML canvas element by id.
     * @param {string} canvasId The id of the canvas you want to use.
     */
    constructor(canvasId) {
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

        /** The size of the canvas. */
        this.size = new Vec2d(innerWidth, innerHeight);
        window.addEventListener("resize", () => {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
            this.size.setXY(innerWidth, innerHeight);
        });

        /**
         * The position of the mouse on the screen.
         * @type {Vec2d}
         */
        this.mousePos = new Vec2d(0,0)
        /**
         * The position of the mouse on the world.
         * @type {Vec2d}
         */
        this.worldMousePos = new Vec2d(0,0)
        window.addEventListener("mousemove", (e) => {
            if (this.camera.controls.enabled && this.mouseButtons[0]) {
                this.camera.pos.sub(new Vec2d(e.offsetX, e.offsetY).sub(this.mousePos).div(this.camera.scale))
            }
            this.mousePos.setXY(e.offsetX, e.offsetY);
            this.worldMousePos.set(this.camera.toWorldPos(this.mousePos));
        });
        window.addEventListener("wheel", (e) => {
            this.camera.scale *= 2**(e.deltaY/-this.camera.controls.zoomScrollScale);
        })

        /** Array of booleans representing mousebutton press states. */
        this.mouseButtons = [false, false, false];
        window.addEventListener("mousedown", (e) => {
            this.mouseButtons[e.button] = true;
        });
        window.addEventListener("mouseup", (e) => {
            this.mouseButtons[e.button] = false;
        });

        /** The camera object. */
        this.camera = {
            canvas: this,
            /** The world position of the center of the screen. */
            pos: new Vec2d(0,0),
            /** The scale of the camera. */
            scale: 1,
            /** Some settings for the default camera controls. */
            controls: {
                enabled: true,
                zoomScrollScale: 500,
            },
            /** Does the drawing context transformations of this camera. Do this at the beginning of draw, after CmCanvas.clear()*/
            doTransform: function() {
                this.canvas.worldMousePos.set(this.toWorldPos(this.canvas.mousePos));
                this.canvas.ctx.translate(-this.pos.x*this.scale, -this.pos.y*this.scale);
                this.canvas.ctx.scale(this.scale, this.scale)
                this.canvas.ctx.translate(this.canvas.size.x/2/this.scale, this.canvas.size.y/2/this.scale);
            },
            /**
             * Calculates the on world position of a given on screen vector.
             * @param {Vec2d} pos The position to convert.
             * @returns {Vec2d} A new vector with the world position.
             */
            toWorldPos: function(pos) {
                return pos.copy()
                .sub(this.canvas.size.copy().div(2))
                .div(this.scale)
                .add(this.pos);
            },
            /**
             * Calculates the on screen position of a given on world vector.
             * @param {Vec2d} pos The position to convert.
             * @returns {Vec2d} A new vector with the screen position.
             */
            toScreenPos: function(pos) {
                return pos.copy()
                .sub(this.pos)
                .mult(this.scale)
                .add(this.canvas.size.copy().div(2));
            },
            /**
             * Calculates wether or not the given position is inside the screen. The radius increases the tolerance, handy for culling.
             * @param {Vec2d} pos The position to convert.
             * @param {number} radius The radius of the object. Setting this to a higher number increases the chance that this function return true.
             * @returns {Vec2d} A new vector with the screen position.
             */
            isOnScreen: function(pos, radius = 0) {
                return this.toScreenPos(pos).isInRect(this.canvas.size.x, this.canvas.size.y, -radius*this.scale);
            }
        }
    }
    /**
     * Clear the canvas.
     */
    clear() {
        this.ctx.resetTransform()
        this.ctx.clearRect(0,0,this.size.x, this.size.y);
    }
}