import Lexer from 'emulator/parser/lexer.js';
import Parser from 'emulator/parser/parser.js';

function tokenize(code) {
    console.log(`\nCode: ${code}`);
    const lex = new Lexer(code);
    return lex.tokenize();
}

const tokens = tokenize(`
add ax, 5
mul cx
mov [1], 6
;------------------------
; Testing multiline code
;------------------------
pushf
popf
`);

// const instructions = Parser.getInstructionsFromTokens(tokens);
// console.log(instructions);

const parser = new Parser(tokens);
console.log(parser.parse());
