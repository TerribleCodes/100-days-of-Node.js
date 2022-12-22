const lib = require('../lib');

describe('absolute', () => {
    it('First Test Case (Should return a positive number if the input is positive)', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    it('First Test Case (Should return a positive number if the input is negative)', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    it('First Test Case (Should return a zero number if the input is zero)', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
})