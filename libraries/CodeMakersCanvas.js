import { Vec2d } from "./vec2d.js";
/**
 * A class wrapping a html canvas with 2d rendering context.
 * @author CodeMaker_4
 * @version Beta_0.002
 */
export class CmCanvas {
    static library = "codemaker4/CmCanvas";
    static verson = 0.002;
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

        /**
         * The size of the canvas.
         * @type {Vec2d}
         */
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
                this.camera.pos.sub(new Vec2d(e.offsetX, e.offsetY).sub(this.mousePos).div(this.camera.scale));
                this.camera.isMovementControlled = false;
            }
            this.mousePos.setXY(e.offsetX, e.offsetY);
            this.worldMousePos.set(this.camera.toWorldPos(this.mousePos));
        });
        window.addEventListener("wheel", (e) => {
            if (this.camera.controls.enabled) {
                this.camera.scale *= 2**(e.deltaY/-this.camera.controls.zoomScrollScale);
                this.camera.isMovementControlled = false;
            }
        })

        /**
         * Array of booleans representing mousebutton press states. Also supports mice with more buttons.
         * @type {boolean[]}
         */
        this.mouseButtons = [false, false, false];
        window.addEventListener("mousedown", (e) => {
            this.mouseButtons[e.button] = true;
        });
        window.addEventListener("mouseup", (e) => {
            this.mouseButtons[e.button] = false;
        });

        /**
         * Map of keycodes containing a boolean of wether or not they are pressed.
         * @type {Map<string><boolean>}
         */
        this.keyPresses = new Map();
        window.addEventListener("keydown", (e) => {
            this.keyPresses.set(e.code, true);
            console.log(this.keyPresses.get("KeyA"))
        })
        window.addEventListener("keyup", (e) => {
            this.keyPresses.set(e.code, false);
            console.log(this.keyPresses.get("KeyA"))
        })

        /**
         * The camera object.
         * @type {CmCanvasCamera}
         */
        this.camera = new CmCanvasCamera(this);
    }
    /**
     * Clear the canvas.
     */
    clear() {
        this.ctx.resetTransform()
        this.ctx.clearRect(0,0,this.size.x, this.size.y);
    }
}

export class CmCanvasCamera {
    constructor(canvas) {
        /**
         * The CmCanvas this camera belongs to.
         * @type {CmCanvas}
         */
        this.canvas = canvas;

        /**
         * The world position of the center of the screen.
         * @type {Vec2d}
         */
        this.pos = new Vec2d(0,0),

        /**
         * The scale of the camera.
         * @type {number}
         */
        this.scale = 1,

        /**
         * Some settings for the default camera controls.
         */
        this.controls = {
            /**
             * Wether or not the default camera controls should be enabled.
             * @type {boolean}
             */
            enabled: true,

            /**
             * The speed of zooming with the mouse scrollwheel
             * @type {number}
             */
            zoomScrollScale: 500,
        }

        /**
         * The movement controller for this camera.
         * @type {CmCanvasCameraMovement}
         */
        this.movement = new CmCanvasCameraMovement(this);

        this.isMovementControlled = false;

    }

    /**
     * Does the drawing context transformations of this camera. Do this at the beginning of draw, after CmCanvas.clear()
     */
    doTransform() {
        if (this.isMovementControlled) {
            this.pos.set(this.movement.calcCamPos());
            this.scale = this.movement.calcCamScale();
        }
        this.canvas.worldMousePos.set(this.toWorldPos(this.canvas.mousePos));
        this.canvas.ctx.translate(-this.pos.x*this.scale, -this.pos.y*this.scale);
        this.canvas.ctx.scale(this.scale, this.scale)
        this.canvas.ctx.translate(this.canvas.size.x/2/this.scale, this.canvas.size.y/2/this.scale);
    }

    /**
     * Calculates the on world position of a given on screen vector.
     * @param {Vec2d} pos The position to convert.
     * @returns {Vec2d} A new vector with the world position.
     */
    toWorldPos(pos) {
        return pos.copy()
        .sub(this.canvas.size.copy().div(2))
        .div(this.scale)
        .add(this.pos);
    }

    /**
     * Calculates the on screen position of a given on world vector.
     * @param {Vec2d} pos The position to convert.
     * @returns {Vec2d} A new vector with the screen position.
     */
    toScreenPos(pos) {
        return pos.copy()
        .sub(this.pos)
        .mult(this.scale)
        .add(this.canvas.size.copy().div(2));
    }
    
    /**
     * Calculates wether or not the given position is inside the screen. The radius increases the tolerance, handy for culling.
     * @param {Vec2d} pos The position to convert.
     * @param {number} radius The radius of the object. Setting this to a higher number increases the chance that this function return true.
     * @returns {Vec2d} A new vector with the screen position.
     */
    isOnScreen(pos, radius = 0) {
        return this.toScreenPos(pos).isInRect(this.canvas.size.x, this.canvas.size.y, -radius*this.scale);
    }

    /**
     * Start a smooth camera movement.
     * @param {Vec2d} pos The camera position to move to.
     * @param {number} scale The camera scale to move to.
     * @param {number} duration The duration of this movement in milliseconds.
     */
    startMoveTo(pos, scale, duration) {
        this.movement.startMoveTo(pos, scale, duration);
        this.isMovementControlled = true;
    }
}

export class CmCanvasCameraMovement {
    constructor(cmCanvasCamera) {
        /**
         * The camera this moveventcontroller controlls.
         * @type {CmCanvasCamera}
         */
        this.cmCanvasCamera = cmCanvasCamera;

        /**
         * @typedef CmCanvasCameraMovementKeyFrame
         * @property {Vec2d} pos The camera position of this keyframe.
         * @property {number} scale The camera scale of this keyframe.
         * @property {number} timestamp The timestamp of this keyframe in milliseconds.
         */

        /**
         * The start keyframe for the current movement
         * @type {CmCanvasCameraMovementKeyFrame}
         */
        this.startKeyFrame = {
            pos: this.cmCanvasCamera.pos.copy(),
            scale: this.cmCanvasCamera.scale,
            timestamp: 0
        };

        /**
         * The start keyframe for the current movement
         * @type {CmCanvasCameraMovementKeyFrame}
         */
        this.endKeyFrame = {
            pos: this.cmCanvasCamera.pos.copy(),
            scale: this.cmCanvasCamera.scale,
            timestamp: 1000
        };
    }

    /**
     * Start a smooth camera movement.
     * @param {Vec2d} pos The camera position to move to.
     * @param {number} scale The camera scale to move to.
     * @param {number} duration The duration of this movement in milliseconds.
     */
    startMoveTo(pos, scale, duration) {
        let now = Date.now();
        this.startKeyFrame = {
            pos: this.cmCanvasCamera.pos.copy(),
            scale: this.cmCanvasCamera.scale,
            timestamp: now
        };
        this.endKeyFrame = {
            pos: pos,
            scale: scale,
            timestamp: now+duration
        };
    }

    /**
     * Perform a double cosine smoothing on the number.
     * @param {number} x The number to smooth.
     * @param {number} times The amount of times to smooth.
     * @returns {number}
     */
    cosSmooth(x, times) {
        if (times <= 0) return x;
        return (1-Math.cos(this.cosSmooth(x, times-1)*Math.PI))/2;
    }

    /**
     * Get the current time factor: a smoothed number that moves from 0 to 1 within the camera movement.
     * @returns {number}
     */
    calcTimeFac() {
        let now = Date.now();
        let start = this.startKeyFrame.timestamp;
        let end = this.endKeyFrame.timestamp
        if (start > now) return 0;
        if (end < now) return 1;
        let noSmoothTimeFac = (now - start) / (end - start);
        return this.cosSmooth(noSmoothTimeFac, 2);
    }

    /**
     * Wether or not the camera is moving right now.
     * @type {boolean}
     */
    get isMoving() {
        let now = Date.now();
        return this.startKeyFrame.timestamp > now && this.endKeyFrame.timestamp < now;
    }

    /**
     * Get the current camera position.
     * @returns {Vec2d}
     */
    calcCamPos() {
        let timeFac = this.calcTimeFac();
        return this.startKeyFrame.pos.copy().mult(1-timeFac).add(this.endKeyFrame.pos.copy().mult(timeFac));
    }

    /**
     * Get the current camera scale.
     * @returns {number}
     */
    calcCamScale() {
        let timeFac = this.calcTimeFac();
        return this.startKeyFrame.scale*((this.endKeyFrame.scale/this.startKeyFrame.scale)**timeFac);
    }
}