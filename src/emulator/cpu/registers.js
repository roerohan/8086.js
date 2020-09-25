import Register, { FlagRegister } from 'emulator/cpu/models/register.js';

export default class Registers {
    constructor() {
        this.regs = {
            AX: new Register(),
            BX: new Register(),
            CX: new Register(),
            DX: new Register(),
            IP: new Register(),
            DI: new Register(),
            SI: new Register(),
            BP: new Register(400),
            SP: new Register(400),
            DS: new Register(0),
            ES: new Register(400),
            CS: new Register(600),
            SS: new Register(200),
            flags: new FlagRegister(),
        };
    }
}
