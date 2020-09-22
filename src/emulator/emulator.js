import Lexer from './parser/lexer.js';
import CPU from './cpu/core.js';
import Parser from './parser/parser.js';

export default class Emulator {
    constructor() {
        this.cpu = new CPU();
    }

    loadCode(code) {
        const tokens = (new Lexer(code)).tokenize();
        const parsed = (new Parser(tokens)).parse();
        this.cpu.loadCode(parsed);
    }

    getRegisters() {
        return this.cpu.registers.regs;
    }

    resetState() {
        this.cpu = new CPU();
    }
}
