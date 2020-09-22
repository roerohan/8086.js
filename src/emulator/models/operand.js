import { InvalidTokenError } from './errors.js';

function toNumber(value) {
    if (value.startsWith('0B')) {
        return parseInt(value, 2);
    }

    if (value.startsWith('0X')) {
        return parseInt(value, 16);
    }

    if (value.startsWith('0')) {
        return parseInt(value, 8);
    }

    return parseInt(value, 10);
}

/**
 * Base operand class.
 */
class Operand {
    constructor(value, position, lineNumber) {
        this.name = 'OPERAND';
        this.value = value;
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

        this.value = toNumber(value);

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

        this.value = toNumber(value.slice(1, -1));
    }
}
