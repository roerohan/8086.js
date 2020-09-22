/**
 * Grammar:
 *
 * S: ins_2 op_1 op_2
 * S: ins_2_1 op_1 [op_2]
 * S: ins_1 op_1
 * S: ins_1_0 [op_1]
 * S: ins_0
 *
 * ins_2 -> 2 address instruction
 * ins_2_1 -> 2 address or 1 address instruction
 * ins_1 -> 1 address instruction
 * ins_1_0 -> 1 address or 0 address instruction
 * ins_0 -> 0 address instruction
 */
import {
    SyntaxError,
    Instruction,
} from './models/index.js';

export default class Parser {
    constructor(tokens) {
        this.rawInstructions = Parser.getInstructionsFromTokens(tokens);
        this.instructions = [];
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
            } else if (token.name !== 'COMMENT') {
                instruction.push(token);
            }
        });

        return instructions;
    }

    parse() {
        this.rawInstructions.forEach((instruction) => {
            if (instruction.length > 4) {
                throw new SyntaxError();
            }

            if (instruction.length > 2
                && instruction[2].name !== 'SEPARATOR') {
                throw new SyntaxError();
            }

            this.instructions.push(new Instruction({
                mnemonic: instruction[0],
                op1: instruction[1] || null,
                op2: instruction[3] || null,
            }));
        });

        return this.instructions;
    }
}
