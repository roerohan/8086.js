import Lexer from 'emulator/parser/lexer.js';

function tokenize(code) {
    console.log(`\nCode: ${code}`);
    const lex = new Lexer(code);
    return lex.tokenize();
}

console.log(tokenize('aaa'));
console.log(tokenize('mul al'));
console.log(tokenize('add 0x2'));
console.log(tokenize('add 0b4'));
console.log(tokenize('add ax, bx'));
console.log(tokenize('mov dx, \'hello\''));
console.log(tokenize('push bp; This is a comment'));
console.log(tokenize(`
add ax, bx
mul cx
;------------------------
; Testing multiline code
;------------------------
pushf
popf
`));
