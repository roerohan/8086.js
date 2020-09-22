export default class Addressing {
    constructor(registers, memory) {
        this.registers = registers;
        this.memory = memory;
    }

    get(op) {
        if (!op) {
            return null;
        }

        const { regs } = this.registers;

        switch (op.type) {
        case 'IMMEDIATE':
            return op.value;

        case 'REGISTER':
            if (['L', 'H'].includes(op.value[1])) {
                if (!['A', 'B', 'C', 'D'].includes(op.value[0])) {
                    throw SyntaxError("Only AX,BX,CX,DX registers can have 'L' or 'H' suffix");
                }
                return regs[`${op.value[0]}X`].get(op.value[1]);
            }
            return regs[op.value].get();

        case 'MEMORY':
            return this.memory.get(regs.DS.get() + op.value);

        case 'RELATIVE':
            throw SyntaxError('Not implemented');

        default:
            throw SyntaxError("Invalid Adressing mode, this shoudln't happen ideally");
        }
    }

    set(op, value) {
        const { regs } = this.registers;

        switch (op.type) {
        case 'IMMEDIATE':
            throw SyntaxError("Can't set to immediate value???");

        case 'REGISTER':
            if (['L', 'H'].includes(op.value[1])) {
                if (!['A', 'B', 'C', 'D'].includes(op.value[0])) {
                    throw SyntaxError("Only AX,BX,CX,DX registers can have 'L' or 'H' suffix");
                }
                return regs[`${op.value[0]}X`].set(value, op.value[1]);
            }
            return regs[op.value].set(value);

        case 'MEMORY':
            return this.memory.set(regs.DS.get() + op.value, value);

        case 'RELATIVE':
            throw SyntaxError('Not implemented');

        default:
            throw SyntaxError("Invalid Adressing mode, this shoudln't happen ideally");
        }
    }
}
