const MEM_SIZE = 1000;

export default class Memory {
    constructor() {
        this.mem = [];
        this.initializeMem();
    }

    initializeMem() {
        for (let i = 0; i < MEM_SIZE; i += 1) {
            this.mem.push(0);
        }
    }

    set(addr, val) {
        if (val > 2 ** 16) {
            throw Error("Can't set greater than 16 bit value in memory location");
        }
        this.mem[addr] = val;
    }

    get(addr) {
        return this.mem[addr];
    }
}
