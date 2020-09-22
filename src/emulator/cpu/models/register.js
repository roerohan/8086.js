export default class Register {
    /**
     * Initialize value, lower half `l` and upper half `h` to 0.
     */
    constructor(initial) {
        this.value = initial || 0;
        this.h = 0;
        this.l = 0;
    }

    /**
     * Get either the entire value stored in the register, or the half specified in `half`.
     * @param {string} half Accepts `l` for lower half and `h` for upper half.
     */
    get(half) {
        if (!half) {
            return this.value;
        }

        if (half === 'L') {
            return this.l;
        }

        if (half === 'H') {
            return this.h;
        }

        return undefined;
    }

    /**
     * Sets the value in the register, or in the specified half.
     * @param {number} value The value to be set in the register or one of its halves.
     * @param {string} half Specify the half in which the value is to be set (if any).
     */
    set(value, half) {
        if (half) {
            if (value > 2 ** 8) {
                throw Error("Can't set more than 8 bit value to an 8 bit register");
            }
        } else if (value > 2 ** 16) {
            throw Error("Can't set more than 8 bit value to an 8 bit register");
        }
        if (!half) {
            this.value = value;
            this.l = value & 255;
            this.h = value >>> 8;
            return;
        }

        if (half === 'L') {
            this.l = value;
        } else if (half === 'H') {
            this.h = value;
        }

        this.value = (this.h << 4) + this.l;
    }
}

export class FlagRegister extends Register {
    setFlag(flag) {
        this.set(this.get() | flag);
    }

    unsetFlag(flag) {
        this.set(this.get() & ~flag);
    }

    getFlag(flag) {
        return (this.get() & flag) !== 0;
    }
}
