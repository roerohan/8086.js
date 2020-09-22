function toNumber(value) {
    if (value.startsWith('0b')) {
        return parseInt(value, 2);
    }

    if (value.startsWith('0x')) {
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
    constructor(value, position) {
        this.name = 'OPERAND';
        this.value = value;
        this.position = position;
    }
}

/**
 * An object of ImmediateOp will have the value as a
 * Number in the `value` attribute.
 */
export class ImmediateOp extends Operand {
    constructor({ value, position }) {
        super(value, position);
        this.type = 'IMMEDIATE';

        this.value = toNumber(value);
    }
}

/**
 * An object of RelativeOp
 */
export class RelativeOp extends Operand {
    constructor({ value, position }) {
        super(value, position);
        this.type = 'RELATIVE';
    }
}

/**
 * An object of RegisterOp will have the name of the
 * register in the `value` attribute.
 */
export class RegisterOp extends Operand {
    constructor({ value, position }) {
        super(value, position);
        this.type = 'REGISTER';
    }
}

/**
 * An object of MemoryOp will have the address as a
 * Number in the `value` attribute
 */
export class MemoryOp extends Operand {
    constructor({ value, position }) {
        super(value, position);
        this.type = 'MEMORY';

        this.value = toNumber(value.slice(1, -1));
    }
}
