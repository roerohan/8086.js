import Registers from './registers.js';
import Memory from './memory.js';
import Addressing from './addressing.js';
import { flags } from '../parser/constants.js';

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
        let ip = this.registers.regs.IP.get();
        const instruction = this.memory.get(this.registers.regs.CS.get() + ip);

        const { mnemonic, op1, op2 } = instruction;
        const { regs } = this.registers;
        const getAddr = (target) => this.addressing.get(target);
        const setAddr = (target, value) => this.addressing.set(target, value);

        if (!mnemonic) {
            throw SyntaxError('Invalid instruction at the current instruction pointer');
        }

        switch (mnemonic.value) {
        case 'MOV':
            if (op1.size < op2.size) {
                throw SyntaxError(`Can't move larger ${op2.size} bit value to ${op1.size} bit location`);
            }
            setAddr(op1, getAddr(op2));
            break;

        case 'JS':
            if (regs.flags.getFlag(flags.sign) === 1) {
                regs.IP.set(op1);
            }
            break;

        case 'JNS': {
            if (regs.flags.getFlag(flags.sign) === 0) {
                regs.IP.set(op1);
            }
            break;
        }
        case 'JO': {
            if (regs.flags.getFlag(flags.overflow) === 1) {
                regs.IP.set(op1);
            }
            break;
        }
        case 'JNO': {
            if (regs.flags.getFlag(flags.overflow) === 0) {
                regs.IP.set(op1);
            }
            break;
        }
        case 'JP':
        case 'JPE':
        {
            if (regs.flags.getFlag(flags.parity) === 1) {
                regs.IP.set(op1);
            }
            break;
        }
        case 'JNP':
        {
            if (regs.flags.getFlag(flags.parity) === 0) {
                regs.IP.set(op1);
            }
            break;
        }
        case 'ADD':
            if (!op2) {
                let s = op1.size === 8 ? regs.AX.get('l') : regs.AX.get();
                s += getAddr(op1);
                regs.AX.set(s);
            } else {
                let s = getAddr(op1);
                s += getAddr(op2);
                setAddr(op1, s);
            }
            break;

        case 'DIV':
            if (op1.size === 8) {
                const al = regs.AX.get('l') / getAddr(op1);
                const ah = regs.AX.get('l') % getAddr(op1);
                regs.AX.set(al, 'l');
                regs.AX.set(ah, 'h');
            } else {
                const ax = regs.AX.get() / getAddr(op1);
                const dx = regs.AX.get() % getAddr(op1);
                regs.AX.set(ax);
                regs.DX.set(dx);
            }
            break;

        case 'MUL':
            if (op1.size === 8) {
                const prod = regs.AX.get('l') * getAddr(op1);
                regs.AX.set(prod);
            } else {
                const prod = regs.AX.get() * getAddr(op1);
                regs.AX.set(prod);
                // Store higher bits in DX
            }
            break;

        case 'AND':
            setAddr(op1, getAddr(op1) & getAddr(op2));
            break;

        case 'OR':
            setAddr(op1, getAddr(op1) | getAddr(op2));
            break;
        case 'SUB': {
            const s1 = getAddr(op1);
            const s2 = getAddr(op2);
            const ans = s1 - s2;
            setAddr(op1, ans);
            break;
        }
        case 'CMP': {
            const s1 = getAddr(op1);
            const s2 = getAddr(op2);
            if (s1 === s2) {
                regs.flags.setFlag(flags.zero);
                regs.flags.unsetFlag(flags.carry);
            } else if (s1 > s2) {
                regs.flags.unsetFlag(flags.zero);
                regs.flags.unsetFlag(flags.carry);
            } else {
                regs.flags.setFlag(flags.carry);
                regs.flags.unsetFlag(flags.zero);
            }
            break;
        }
        case 'NOT': {
            setAddr(op1, ~getAddr(op1));
            break;
        }
        case 'JMP': {
            ip = getAddr(op1) - 1;
            break;
        }
        case 'JE':
        case 'JZ':
        {
            if (regs.flags.getFlag(flags.zero) === 1) {
                ip = getAddr(op1) - 1;
            }
            break;
        }
        case 'JNE':
        case 'JNZ':
        {
            if (regs.flags.getFlag(flags.zero) === 0) {
                ip = getAddr(op1) - 1;
            }
            break;
        }
        default:
            break;
        }

        // Example for setting/unsetting/checking flag register
        // import { flags } from '../parser/constants.js';
        // regs.flags.setFlag(flags.zero);
        // regs.flags.setFlag(flags.auxilliary);
        // regs.flags.unsetFlag(flags.auxilliary);
        // console.log(regs.flags.getFlag(flags.zero));
        console.log(regs);
        regs.IP.set(ip + 1);
    }
}
