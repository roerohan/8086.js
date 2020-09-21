import { nonToken, instructionMnemonics, registers } from './constants.js';

export default class Lexer {
    constructor(buffer) {
        this.position = 0;
        this.buffer = buffer;
        this.bufferLength = buffer.length;
    }

    static isNewLine(c) {
        if (c === '\n' || c === '\r') {
            return true;
        }
        return false;
    }

    static isAlpha(c) {
        return /^[A-Za-z]$/.test(c);
    }

    static isNum(c) {
        return /^[0-9]$/.test(c);
    }

    static isAlphaNum(c) {
        return /^[A-Za-z0-9]$/.test(c);
    }

    static isQuote(c) {
        return /^['"]$/.test(c);
    }

    static isSeparator(c) {
        return /^[,]$/.test(c);
    }

    skipNonTokens() {
        while (this.position < this.bufferLength) {
            const c = this.buffer[this.position];
            if (nonToken.includes(c)) {
                this.position += 1;
            } else {
                break;
            }
        }
    }

    processComment() {
        let end = this.position + 1;
        while (end < this.bufferLength
            && !Lexer.isNewLine(this.buffer[end])) {
            end += 1;
        }

        const token = {
            name: 'COMMENT',
            value: this.buffer.substring(this.position, end),
            position: this.position,
        };

        this.position = end;

        return token;
    }

    processAlpha() {
        let end = this.position + 1;
        while (end < this.bufferLength
            && Lexer.isAlpha(this.buffer[end])) {
            end += 1;
        }

        const tok = this.buffer.substring(this.position, end).toUpperCase();
        if (instructionMnemonics.includes(tok)) {
            const token = {
                name: 'MNEMONIC',
                value: tok,
                position: this.position,
            };
            this.position = end;

            return token;
        }

        if (registers.includes(tok)) {
            const token = {
                name: 'REGISTER',
                value: tok,
                position: this.position,
            };

            this.position = end;
            return token;
        }

        const token = {
            name: 'IDENTIFIER',
            value: tok,
            position: this.position,
        };

        this.position = end;

        return token;
    }

    processNum() {
        let end = this.position + 1;
        while (end < this.bufferLength
            && Lexer.isNum(this.buffer[end])) {
            end += 1;
        }

        let tok = this.buffer.substring(this.position, end);
        tok = parseInt(tok, 10);

        const token = {
            name: 'NUMBER',
            value: tok,
            position: this.position,
        };

        this.position = end;

        return token;
    }

    processQuote(quote) {
        const end = this.buffer.indexOf(quote, this.position + 1);

        if (end === -1) {
            const token = {
                name: 'INVALID',
                value: 'Unterminated Quote',
                position: this.position,
            };

            this.position = end;

            return token;
        }

        const token = {
            name: 'STRING',
            value: this.buffer.substring(this.position, end + 1),
            position: this.position,
        };

        this.position = end + 1;

        return token;
    }

    processSeparator(separator) {
        const end = this.position + 1;

        const token = {
            name: 'SEPARATOR',
            value: separator,
            position: this.position,
        };

        this.position = end;

        return token;
    }

    getToken() {
        const invalidToken = {
            name: 'INVALID',
            value: 'Unidentified Token',
            position: this.position,
        };

        this.skipNonTokens();
        if (this.position > this.bufferLength) {
            return invalidToken;
        }

        const c = this.buffer[this.position];

        if (c === ';') {
            return this.processComment();
        }

        if (Lexer.isAlpha(c)) {
            return this.processAlpha();
        }

        if (Lexer.isNum(c)) {
            return this.processNum();
        }

        if (Lexer.isQuote(c)) {
            return this.processQuote(c);
        }

        if (Lexer.isSeparator(c)) {
            return this.processSeparator(c);
        }

        this.position = this.bufferLength;
        return invalidToken;
    }

    tokenize() {
        const tokens = [];
        while (this.position < this.bufferLength) {
            tokens.push(this.getToken());
        }

        return tokens;
    }
}
