import Emulator from '../emulator.js';

const emulator = new Emulator();
emulator.loadCode(`
MOV AH, 5
MOV [2], 8
MOV CX, 4
MOV AL, 2
`);

emulator.cpu.step();
console.log(emulator.getRegisters());
emulator.cpu.step();
console.log(emulator.cpu.memory.mem[2]);
emulator.cpu.step();
emulator.cpu.step();
console.log(emulator.getRegisters());
