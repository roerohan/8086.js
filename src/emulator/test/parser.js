import Lexer from '../parser/lexer.js';
import Parser from '../parser/parser.js';

function tokenize(code) {
    console.log(`\nCode: ${code}`);
    const lex = new Lexer(code);
    return lex.tokenize();
}

const tokens = tokenize(`
add ax, bx
mul cx
;------------------------
; Testing multiline code
;------------------------
pushf
popf
`);

const instructions = Parser.getInstructionsFromTokens(tokens);
console.log(instructions);
