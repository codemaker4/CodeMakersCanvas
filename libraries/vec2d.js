/**
 * Class representing a 2d vector.
 * @example
 * new Vec2d(1, 1).mag() === Math.sqrt(2)
 * @example
 * let a = new Vec2d(4, 0); // create an X axis
 * let b = new Vec2d(0, 3); // create an Y axis
 * let c = a.copy().add(b).mag(); // create a diagonal vector, and calculate its magnitude
 * c == 5
 * // a^2 + b^2 = c^2
 * @version 1.0
 * @author CodeMaker_4
*/
export class Vec2d {
    static library = "codemaker4/vec2d";
    static version = 1;
    /**
     * Create a new 2d vector with a given x and y.
     *
     * To copy a vector use vec2d.copy();
     *
     * @param {number} x The initial X component of the vector
     * @param {number} y The initial Y component of the vector.
     */
    constructor(x, y) {
        /**
         * The x component of this vector.
         * @type {number}
         */
        this.x = x;
        /**
         * The y component of this vector.
         * @type {number}
         */
        this.y = y;
    }

    /**
     * Create a new Vec2d pointing in a random direction and with a given magnitude.
     * @param {number} [magnitude=1] - The magnitude of the new Vec2d. (default = 1)
     * @returns {Vec2d} The new vector.
     */
    static randAngle(magnitude = 1) {
        let angle = Math.random() * Math.PI * 2;
        return new Vec2d(Math.cos(angle)*magnitude, Math.sin(angle)*magnitude);
    }

    /**
     * Create a new Vec2d pointing in a random direction and with a random magnitude.
     * @param {number} maxMagnitude - The maximum magnitude of the new Vec2d. (default = 1)
     * @returns {Vec2d} The new vector.
     */
    static rand2D(maxMagnitude = 1) {
        return Vec2d.randAngle().mult(Math.random() * maxMagnitude);
    }

    /**
     * Create a new Vec2d with the x and y components on a random position in a box.
     *
     * One corner of the box is the origin, the other is at (width,height)
     *
     * @param {number} width - The maximum value for the X component.
     * @param {number} [height=width] - The maximum value for the y component. (default = width)
     * @returns {Vec2d} The new vector.
     */
    static randBox(width, height = width) {
        return new Vec2d(Math.random()*width, Math.random()*height);
    }

    /**
     * Create and return a new Vec2d instance with the same x and y component values.
     * @returns {Vec2d} The copied vector.
     */
    copy() {
        return new Vec2d(this.x, this.y);
    }

    /**
     * Copy the x and y component values from a given vector into this vector, overwriting the old values.
     * @param {Vec2d} other The vector to copy the component values from.
     * @returns {Vec2d} this
     */
    set(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    /**
     * Copy the given x and y component values into this vector, overwriting the old values.
     * @param {number} x The new X component.
     * @param {number} y The new Y component.
     * @returns {Vec2d} this
     */
    setXY(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Add a given vector to this vector. This changes this vector, but leaves the other intact.
     * @param {Vec2d} other The vector to add to this vector.
     * @returns {Vec2d} this
     */
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    /**
     * Subtract a given vector from this vector. This changes this vector, but leaves the other intact.
     * @param {Vec2d} other The vector to subtract from this vector.
     * @returns {Vec2d} this
     */
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    /**
     * Multiply this vector by a given number.
     * @param {number} num The number to multiply with.
     * @returns {Vec2d} this
     */
    mult(num) {
        this.x = this.x*num;
        this.y = this.y*num;
        return this;
    }

    /**
     * Divide this vector by a given number.
     * @param {number} num The number to divide with.
     * @returns {Vec2d} this
     */
    div(num) {
        this.x = this.x/num;
        this.y = this.y/num;
        return this;
    }

    /**
     * Add seperate x and y component numbers to this vector.
     * @param {number} x The x component to add.
     * @param {number} y The y component to add.
     * @returns {Vec2d} this
     */
    addXY(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    /**
     * Subtract seperate x and y component numbers from this vector.
     * @param {number} x The x component to subtract.
     * @param {number} y The y component to subtract.
     * @returns {Vec2d} this
     */
    subXY(x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    }

    /**
     * Calculate the squared magnitude of this vector.
     * @returns {number} The squared magnitude of this vector.
     */
    sqMag() {
        return this.x**2 + this.y**2;
    }

    /**
     * Calculate the magnitude of this vector.
     * @returns {number} The magnitude of this vector.
     */
    mag() {
        return Math.sqrt(this.sqMag());
    }

    /**
     * Calculate the distance between this vector and another vector.
     * @param {Vec2d} other The other vector
     * @returns {number} The distance between the vectors.
     */
    dist(other) {
        return this.copy().sub(other).mag();
    }

    /**
     * Set the magnitude of this vector to a given number.
     * @param {number} newMag The new magnitude for this vector.
     * @returns {Vec2d} this
     */
    setMag(newMag) {
        let mag = this.mag();
        if (mag == 0) { // if no direction make up something random
            this.set(Vec2d.randAngle().mult(newMag));
            return this;
        }
        this.mult(newMag/mag);
        return this;
    }

    /**
     * Set the magnitude of this vector to 1.
     * @returns {Vec2d} this
     */
    normalize() {
        this.setMag(1);
        return this;
    }

    /**
     * Round the x and y components downwards.
     * @returns {Vec2d} this
     */
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    /**
     * Round the x and y components to the nearest integer.
     * @returns {Vec2d} this
     */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    /**
     * Calculate the angle of this vector.
     * @returns {number} The angle.
     */
    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Rotate this vector such that it has the given angle.
     * @param {number} angle The angle this vector should have.
     * @returns {Vec2d} this
     */
    setAngle(angle) {
        let oldMag = this.mag();
        this.x = Math.cos(angle)*oldMag;
        this.y = Math.sin(angle)*oldMag;
        return this;
    }

    /**
     * Rotate this vector by a given amount.
     * @param {number} angle The amount to rotate by.
     * @returns {Vec2d} this
     */
    rotate(angle) {
        this.setAngle(this.getAngle() + angle);
        return this;
    }

    /**
     * Calculate the dot product of this vector and another vector.
     * @param {Vec2d} other The other vector.
     * @returns {number} number
     */
    dot(other) {
        return this.x*other.x + this.y*other.y;
    }

    /**
     * Linearly interpolate this vector to another vector by a given factor between 0 and 1.
     * @param {Vec2d} other The vector to move towards
     * @param {number} amount The factor of relative distance to cover. 0 = don't move at all, 1 = move completely to the other vector, 0.5 = go halfway.
     * @returns {Vec2d}
     */
    lerpTo(other, amount) {
        this.add(other.copy().sub(this).mult(amount));
        return this;
    }

    /**
     * Check if one of the components is NaN. Handy for error assertion.
     * @returns {boolean} True if there is a NaN.
     */
    hasNaN() {
        return isNaN(this.x) || isNaN(this.y);
    }

    /**
     * Assert if there are NaNs in the components of this vector. Throws an error if it found NaN.
     * @returns {void} Void. Throws an error if there is a NaN.
     */
    assertNaN() {
        if (this.hasNaN()) throw "found NaN";
    }

    /**
     * Check if the vector is within a given rectangle starting at the origin, and spanning towards (width,height). Also has an optional radius argument, which decreases the bounds by the given amount, handy for checking if a ball is inside a rect.
     * @param {number} width Width of the rect.
     * @param {number} height Height of the rect.
     * @param {number} [radius=0] Radius of the sphere around the vector that must be fully inside. (default=0)
     * @returns {boolean} True if the vector is inside the rect.
     */
    isInRect(width, height, radius = 0) {
        return (this.x > radius && this.y > radius && this.x < width-radius && this.y < height-radius);
    }

    /**
     * Ensure that the vector is within a given rectangle starting at the origin, and spanning towards (width,height). Also has an optional radius argument, which decreases the bounds by the given amount, handy for ensuring that a ball is inside a rect.
     * @param {number} width Width of the rect.
     * @param {number} height Height of the rect.
     * @param {number} [radius=0] Radius of the sphere around the vector that must be fully inside.
     * @returns this
     */
    putInRect(width, height, radius) {
        if (this.x < radius) this.x = radius;
        if (this.y < radius) this.y = radius;
        if (this.x > width-radius) this.x = width-radius;
        if (this.y > height-radius) this.y = height-radius;
        return this;
    }
}