import Registers from './registers.js';
import Memory from './memory.js';
import Addressing from './addressing.js';

export default class CPU {
    constructor() {
        this.registers = new Registers();
        this.memory = new Memory();
        this.addressing = new Addressing(this.registers, this.memory);
    }

    loadCode(code) {
        const cs = this.registers.regs.CS.get();
        code.forEach((elem, i) => {
            this.memory.set(cs + i, elem);
        });
        this.registers.regs.IP.set(0);
    }

    step() {
        const ip = this.registers.regs.IP.get();
        const instruction = this.memory.get(this.registers.regs.CS.get() + ip);
        switch (instruction.mnemonic.value) {
        case 'MOV':
            this.addressing.set(instruction.op1, this.addressing.get(instruction.op2));
            break;
        default:
            break;
        }

        // Example for setting/unsetting/checking flag register
        // import { flags } from '../parser/constants.js';
        // this.registers.regs.flags.setFlag(flags.zero);
        // this.registers.regs.flags.setFlag(flags.auxilliary);
        // this.registers.regs.flags.unsetFlag(flags.auxilliary);
        // console.log(this.registers.regs.flags.getFlag(flags.zero));
        this.registers.regs.IP.set(ip + 1);
    }
}
