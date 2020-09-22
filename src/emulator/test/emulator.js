import Emulator from '../emulator.js';

const emulator = new Emulator();
emulator.loadCode(`
MOV AH, 5
MOV BX, 6
`);

emulator.cpu.step();
console.log(emulator.getRegisters());
emulator.cpu.step();
console.log(emulator.getRegisters());
