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
}
