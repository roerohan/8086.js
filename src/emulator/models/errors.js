export class InvalidTokenError extends Error {
    constructor(position) {
        super();
        this.name = 'Invalid Token';
        this.position = position;
    }
}

export class UnterminatedQuoteError extends Error {
    constructor(position) {
        super();
        this.name = 'Unterminated Quote';
        this.position = position;
    }
}
