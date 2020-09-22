import Registers from './registers.js';
import Memory from './memory.js';
import Addressing from './addressing.js';
import { flags } from '../parser/constants.js';

let s = '';
let ans = '';
let ans1 = '';
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
    }

    step() {
        const ip = this.registers.regs.IP.get();
        const instruction = this.memory.get(this.registers.regs.CS.get() + ip);
        switch (instruction.mnemonic.value) {
        case 'MOV':
            this.addressing.set(instruction.op1, this.addressing.get(instruction.op2));
            break;
        case 'JS':
            if (this.registers.regs.flags.getFlag(flags.sign) === 1) {
                this.registers.regs.IP.set(instruction.op1);
            }
            break;
        case 'ADD':
            s = this.addressing.get(instruction.op1) + this.addressing.get(instruction.op2);
            if (instruction.op1.size < s.size) { // s.size???
                throw Error(`Can't move larger ${s.size} bit value to ${instruction.op1.size} bit location`);
            } else {
                this.addressing.set(instruction.op1, s);
            }
            break;
        case 'DIV':
            if (instruction.op1.size === 8) {
                const al = this.registers.regs.AX.get() / this.addressing.get(instruction.op1);
                const ah = this.registers.regs.AX.get() % this.addressing.get(instruction.op1);
                this.registers.regs.AX.set(al, 'l');
                this.registers.regs.AX.set(ah, 'h');
            } else {
                // when operand is a word
            }
            break;
        case 'MUL':
            if (instruction.op1.size === 8) {
                const prod = this.registers.regs.AX.get('l') * this.addressing.get(instruction.op1);
                this.registers.regs.AX.set(prod);
            } else {
                // when operand is a word
                const prod = this.registers.regs.AX.get() * this.addressing.get(instruction.op1);
                this.registers.regs.AX.set(prod);
            }
            break;
        case 'AND':
            ans = this.addressing.get(instruction.op1) & this.addressing.get(instruction.op2);
            this.addressing.set(instruction.op1, ans);
            break;
        case 'OR':
            ans1 = this.addressing.get(instruction.op1) | this.addressing.get(instruction.op2);
            this.addressing.set(instruction.op1, ans1);
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
