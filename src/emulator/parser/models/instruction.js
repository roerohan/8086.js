export default class Instruction {
    constructor({ mnemonic, op1, op2 }) {
        this.mnemonic = mnemonic;
        this.op1 = op1;
        this.op2 = op2;
    }
}
