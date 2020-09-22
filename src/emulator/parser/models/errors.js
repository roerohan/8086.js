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

export class UnterminatedBracketError extends Error {
    constructor({ position, lineNumber }) {
        super();
        this.name = 'Unterminated Bracket';
        this.position = position;
        this.lineNumber = lineNumber;
    }
}

export class SyntaxError extends Error {
    constructor({ position, lineNumber }) {
        super();
        this.name = 'Syntax Error';
        this.position = position;
        this.lineNumber = lineNumber;
    }
}
