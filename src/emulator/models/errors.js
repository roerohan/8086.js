export class InvalidTokenError extends Error {
    constructor({ position, lineNumber }) {
        super();
        this.name = 'Invalid Token';
        this.position = position;
        this.lineNumber = lineNumber;
    }
}

export class UnterminatedQuoteError extends Error {
    constructor({ position, lineNumber }) {
        super();
        this.name = 'Unterminated Quote';
        this.position = position;
        this.lineNumber = lineNumber;
    }
}
