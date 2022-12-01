export class TestException extends Error {
    constructor(message?: string) {
        super(message || "Invalid test");
    }
}