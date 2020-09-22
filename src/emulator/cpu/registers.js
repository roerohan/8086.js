import Register from './models/register';

export default class Registers {
    constructor() {
        this.regs = {
            AX: Register(),
            BX: Register(),
            CX: Register(),
            DX: Register(),
            DI: Register(),
            SI: Register(),
            BP: Register(),
            SP: Register(),
            DS: Register(0),
            ES: Register(400),
            CS: Register(600),
            SS: Register(200),
        };
    }
}
