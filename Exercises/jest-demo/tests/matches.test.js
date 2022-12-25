const {sum} = require('../matches');

it('Must return the summation of 2 numbers', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
});

// Falsy and Truthy
describe('Evaluates whether the expression is truthy or falsy', () => {
    it('should return a falsy', () => {
        const value_1 = null;
        const value_2 = "";
        const value_3 = undefined;

        expect(value_1).toBeFalsy();
        expect(value_2).toBeFalsy();
        expect(value_3).not.toBeTruthy();
    });
});

// Numbers
describe('Numbers', () => {
    it('two plus two is four -Big Shaq-', () => {
        const number = 2+2;
        expect(number).toBeGreaterThan(2);
    });
});

// Strings
describe('Checking for string patterns', () => {
    it('Must contain the letter I', () => {
        expect("apple").not.toMatch(/I/);
    });
});

// Exceptions
function throwError(){
    throw new Error('Use the latest version');
}
describe('throwing an error', () => {
    it('throws an error', () => {
        expect(() => throwError()).toThrow();
    });
});