import Lexer from '../parser/lexer.js';

function tokenize(code) {
    console.log(`\nCode: ${code}`);
    const lex = new Lexer(code);
    return lex.tokenize();
}

console.log(tokenize('aaa'));
console.log(tokenize('mul al'));
console.log(tokenize('add ax, bx'));
console.log(tokenize('mov dx, \'hello\''));
console.log(tokenize('call someFunction'));
console.log(tokenize('push bp; This is a comment'));
