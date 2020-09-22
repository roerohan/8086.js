import Registers from './registers';
import Memory from './memory';
import Addressing from './addressing';

export default class CPU {
    constructor() {
        this.registers = Registers();
        this.memory = Memory();
        this.addressing = Addressing(this.registers, this.memory);
    }

    loadCode(code) {
        const cs = this.registers.regs.CS;
        code.forEach((elem, i) => {
            this.memory.set(cs + i, elem);
        });
    }
}
