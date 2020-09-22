export default class StringToken {
    constructor({ value, position, lineNumber }) {
        this.name = 'STRING';
        this.value = value;
        this.position = position;
        this.lineNumber = lineNumber;
    }
}
