import {
    nonToken,
    instructionMnemonics,
    registers,
} from 'emulator/parser/constants.js';
import {
    ImmediateOp,
    RegisterOp,
    StringToken,
    RelativeOp,
    MemoryOp,
    Mnemonic,
    Comment,
    NewLine,
    Separator,
    InvalidTokenError,
    UnterminatedQuoteError,
    UnterminatedBracketError,
} from 'emulator/parser/models/index.js';

export default class Lexer {
    constructor(buffer) {
        this.position = 0;
        this.buffer = buffer;
        this.bufferLength = buffer.length;
        this.lineNumber = 1;
    }

    static isNewLine(c) {
        return /^[\n\r]$/.test(c);
    }

    static isComment(c) {
        return /^[;]$/.test(c);
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

    static isBracket(c) {
        return /^[[]$/.test(c);
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

    processNewLine(c) {
        this.lineNumber += 1;

        const token = new NewLine({
            value: c,
            position: this.position,
            lineNumber: this.lineNumber,
        });

        this.position += 1;
        return token;
    }

    processComment() {
        let end = this.position + 1;
        while (end < this.bufferLength
            && !Lexer.isNewLine(this.buffer[end])) {
            end += 1;
        }

        const token = new Comment({
            value: this.buffer.substring(this.position, end),
            position: this.position,
            lineNumber: this.lineNumber,
        });

        this.position = end;

        return token;
    }

    processAlphaNum() {
        let end = this.position + 1;
        while (end < this.bufferLength
            && Lexer.isAlphaNum(this.buffer[end])) {
            end += 1;
        }

        const tok = this.buffer.substring(this.position, end);
        const upperCaseTok = tok.toUpperCase();

        if (instructionMnemonics.includes(upperCaseTok)) {
            const token = new Mnemonic({
                value: upperCaseTok,
                position: this.position,
                lineNumber: this.lineNumber,
            });
            this.position = end;
            return token;
        }

        if (registers.includes(upperCaseTok)) {
            const token = new RegisterOp({
                value: upperCaseTok,
                position: this.position,
                lineNumber: this.lineNumber,
            });
            this.position = end;
            return token;
        }

        const numberRegex = '(0X|0B|0|)[0-9A-F]+';
        const immediateRegex = new RegExp(`^${numberRegex}$`);

        if (immediateRegex.test(upperCaseTok)) {
            const token = new ImmediateOp({
                value: upperCaseTok,
                position: this.position,
                lineNumber: this.lineNumber,
            });
            this.position = end;
            return token;
        }

        throw new InvalidTokenError({
            position: this.position,
            lineNumber: this.lineNumber,
        });
    }

    processBrackets() {
        const end = this.buffer.indexOf(']', this.position + 1);
        if (end === -1) {
            throw new UnterminatedBracketError({
                position: this.position,
                lineNumber: this.lineNumber,
            });
        }

        const upperCaseTok = this.buffer.substring(this.position, end + 1).toUpperCase();

        const numberRegex = '(0X|0B|0|)[0-9A-F]+';
        const memoryRegex = new RegExp(`\\[${numberRegex}\\]`);
        const relativeRegex = /^\[[A-Z]{2}\+[A-Z]{2}\]$/;

        if (memoryRegex.test(upperCaseTok)) {
            const token = new MemoryOp({
                value: upperCaseTok,
                position: this.position,
                lineNumber: this.lineNumber,
            });
            this.position = end + 1;
            return token;
        }

        if (relativeRegex.test(upperCaseTok)) {
            const token = new RelativeOp({
                value: upperCaseTok,
                position: this.position,
                lineNumber: this.lineNumber,
            });
            this.position = end + 1;
            return token;
        }

        throw new InvalidTokenError({
            position: this.position,
            lineNumber: this.lineNumber,
        });
    }

    processQuote(quote) {
        const end = this.buffer.indexOf(quote, this.position + 1);

        if (end === -1) {
            throw new UnterminatedQuoteError({
                position: this.position,
                lineNumber: this.lineNumber,
            });
        }

        const token = new StringToken({
            value: this.buffer.substring(this.position, end + 1),
            position: this.position,
            lineNumber: this.lineNumber,
        });

        this.position = end + 1;

        return token;
    }

    processSeparator(separator) {
        const end = this.position + 1;

        const token = new Separator({
            value: separator,
            position: this.position,
            lineNumber: this.lineNumber,
        });

        this.position = end;

        return token;
    }

    nextToken() {
        this.skipNonTokens();
        if (this.position >= this.bufferLength) {
            return undefined;
        }

        const c = this.buffer[this.position];

        if (Lexer.isNewLine(c)) {
            return this.processNewLine(c);
        }

        if (Lexer.isComment(c)) {
            return this.processComment();
        }

        if (Lexer.isAlphaNum(c)) {
            return this.processAlphaNum();
        }

        if (Lexer.isBracket(c)) {
            return this.processBrackets();
        }

        if (Lexer.isQuote(c)) {
            return this.processQuote(c);
        }

        if (Lexer.isSeparator(c)) {
            return this.processSeparator(c);
        }

        throw new InvalidTokenError({
            position: this.position,
            lineNumber: this.lineNumber,
        });
    }

    tokenize() {
        const tokens = [];
        while (this.position < this.bufferLength) {
            const nextTok = this.nextToken();

            if (nextTok) {
                tokens.push(nextTok);
            }
        }

        tokens.push(new NewLine({
            value: '\n',
            position: this.positon + 1,
            lineNumber: this.lineNumber + 1,
        }));

        return tokens;
    }
}
