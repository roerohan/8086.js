import Lexer from './parser/lexer';
import CPU from './cpu/core';
import Parser from './parser/parser';

export default class Emulator {
    constructor() {
        this.cpu = CPU();
    }

    loadCode(code) {
        const tokens = (new Lexer(code)).tokenize();
        const parsed = (new Parser(tokens)).parse();
        this.cpu.loadCode(parsed);
    }
}
