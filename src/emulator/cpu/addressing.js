export default class Addressing {
    constructor(registers, memory) {
        this.registers = registers;
        this.memory = memory;
    }

    static getOperand() {
        return 1;
    }

    static loadCode() {}
}
