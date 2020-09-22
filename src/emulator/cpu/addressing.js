export default class Addressing {
    constructor(registers, memory) {
        this.registers = registers;
        this.memory = memory;
    }

    get(op) {
        switch (op.type) {
        case 'IMMEDIATE':
            return op.value;
        case 'REGISTER':
            if (['L', 'H'].includes(op.value[1])) {
                if (!['A', 'B', 'C', 'D'].includes(op.value[0])) {
                    throw Error("Only AX,BX,CX,DX registers can have 'L' or 'H' suffix");
                }
                return this.registers.regs[`${op.value[0]}X`].get(op.value[1]);
            }
            return this.registers.regs[op.value].get();
        case 'MEMORY':
            return this.memory.get(this.registers.DS + op.value);
        case 'RELATIVE':
            throw Error('Not implemented');
        default:
            throw Error("Invalid Adressing mode, this shoudln't happen ideally");
        }
    }

    set(op, value) {
        switch (op.type) {
        case 'IMMEDIATE':
            throw Error("Can't set to immediate value???");
        case 'REGISTER':
            if (['L', 'H'].includes(op.value[1])) {
                if (!['A', 'B', 'C', 'D'].includes(op.value[0])) {
                    throw Error("Only AX,BX,CX,DX registers can have 'L' or 'H' suffix");
                }
                return this.registers.regs[`${op.value[0]}X`].set(value, op.value[1]);
            }
            return this.registers.regs[op.value].set(value);
        case 'MEMORY':
            return this.memory.set(this.registers.DS + op.value, value);
        case 'RELATIVE':
            throw Error('Not implemented');
        default:
            throw Error("Invalid Adressing mode, this shoudln't happen ideally");
        }
    }
}
