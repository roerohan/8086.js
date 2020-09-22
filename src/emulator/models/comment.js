export default class Comment {
    constructor({ value, position, lineNumber }) {
        this.name = 'COMMENT';
        this.value = value;
        this.position = position;
        this.lineNumber = lineNumber;
    }
}
