import { InvalidTokenError } from './errors.js';

function toNumber(value) {
    let intVal;
    if (value.startsWith('0B')) {
        intVal = parseInt(value, 2);
    } else if (value.startsWith('0X')) {
        intVal = parseInt(value, 16);
    } else if (value.startsWith('0')) {
        intVal = parseInt(value, 8);
    } else {
        intVal = parseInt(value, 10);
    }

    const size = Math.ceil(Math.log2(intVal));
    if (intVal > 2 ** 16) {
        throw Error('Immediate Value too large, only max 16 bit allowd');
    }
    return {
        value: intVal,
        size,
    };
}

/**
 * Base operand class.
 */
class Operand {
    constructor(value, position, lineNumber) {
        this.name = 'OPERAND';
        this.value = value;
        this.size = 0;
        this.position = position;
        this.lineNumber = lineNumber;
    }
}

/**
 * An object of ImmediateOp will have the value as a
 * Number in the `value` attribute.
 */
export class ImmediateOp extends Operand {
    constructor({ value, position, lineNumber }) {
        super(value, position, lineNumber);
        this.type = 'IMMEDIATE';

        const toNum = toNumber(value);
        this.value = toNum.value;
        this.size = toNum.size;

        if (Number.isNaN(this.value)) {
            throw new InvalidTokenError({
                position: this.position,
                lineNumber: this.lineNumber,
            });
        }
    }
}

/**
 * An object of RelativeOp
 */
export class RelativeOp extends Operand {
    constructor({ value, position, lineNumber }) {
        super(value, position, lineNumber);
        this.type = 'RELATIVE';
        this.size = 16;
    }
}

/**
 * An object of RegisterOp will have the name of the
 * register in the `value` attribute.
 */
export class RegisterOp extends Operand {
    constructor({ value, position, lineNumber }) {
        super(value, position, lineNumber);
        this.type = 'REGISTER';

        if (this.value.endsWith('L') || this.value.endsWith('H')) {
            this.size = 8;
        } else {
            this.size = 16;
        }
    }
}

/**
 * An object of MemoryOp will have the address as a
 * Number in the `value` attribute
 */
export class MemoryOp extends Operand {
    constructor({ value, position, lineNumber }) {
        super(value, position, lineNumber);
        this.type = 'MEMORY';
        this.size = 16;
        this.value = toNumber(value.slice(1, -1)).value;
    }
}
