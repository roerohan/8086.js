import Lexer from 'emulator/parser/lexer.js';
import CPU from 'emulator/cpu/core.js';
import Parser from 'emulator/parser/parser.js';

class Emulator {
    constructor() {
        this.cpu = new CPU();
    }

    loadCode(code) {
        const tokens = (new Lexer(code)).tokenize();
        const parsed = (new Parser(tokens)).parse();
        this.cpu.loadCode(parsed);
    }

    getRegisters() {
        const regs = {};
        Object.entries(this.cpu.registers.regs).forEach((element) => {
            if (['A', 'B', 'C', 'D'].includes(element[0][0])) {
                regs[`${element[0][0]}H`] = element[1].get('H');
                regs[`${element[0][0]}L`] = element[1].get('L');
            }
            regs[element[0]] = element[1].get();
        });

        return regs;
    }

    getMemory() {
        return [...this.cpu.memory.mem];
    }

    getSerialisableMemory() {
        return [...this.cpu.memory.mem].map((v) => {
            if (typeof v === 'number') return v;
            let op1;
            let op2;
            if (v.op1) {
                op1 = v.op1.value;
            }

            if (v.op2) {
                op2 = v.op2.value;
            }
            return `${v.mnemonic.value} ${op1} ${op2}`;
        });
    }

    resetState() {
        this.cpu = new CPU();
    }
}

export default new Emulator();
