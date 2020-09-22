export default class Parser {
    constructor(tokens) {
        this.parseTree = {};
        this.instructions = Parser.getInstructionsFromTokens(tokens);
    }

    static getInstructionsFromTokens(tokens) {
        const instructions = [];
        let instruction = [];
        tokens.forEach((token) => {
            if (token.name === 'NEWLINE') {
                if (instruction.length) {
                    instructions.push(instruction);
                }
                instruction = [];
            } else {
                instruction.push(token);
            }
        });

        return instructions;
    }
}

console.log(
    Parser.getInstructionsFromTokens([
        { name: 'NEWLINE', value: '\n', position: 0 },
        { name: 'MNEMONIC', value: 'ADD', position: 1 },
        { name: 'REGISTER', value: 'AX', position: 5 },
        { name: 'SEPARATOR', value: ',', position: 7 },
        { name: 'REGISTER', value: 'BX', position: 9 },
        { name: 'NEWLINE', value: '\n', position: 11 },
        { name: 'MNEMONIC', value: 'MUL', position: 12 },
        { name: 'REGISTER', value: 'CX', position: 16 },
        { name: 'NEWLINE', value: '\n', position: 18 },
        { name: 'COMMENT', value: ';------------------------', position: 19 },
        { name: 'NEWLINE', value: '\n', position: 44 },
        { name: 'COMMENT', value: '; Testing multiline code', position: 45 },
        { name: 'NEWLINE', value: '\n', position: 69 },
        { name: 'COMMENT', value: ';------------------------', position: 70 },
        { name: 'NEWLINE', value: '\n', position: 95 },
        { name: 'MNEMONIC', value: 'PUSHF', position: 96 },
        { name: 'NEWLINE', value: '\n', position: 101 },
        { name: 'MNEMONIC', value: 'POPF', position: 102 },
        { name: 'NEWLINE', value: '\n', position: 106 },
    ]),
);
