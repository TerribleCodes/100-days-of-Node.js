const { fizzBuzz } = require('../exercise1');
const lib = require('../lib');

// testing for arrays
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

// testing for strings
describe('greet', () => {
    it('should return a greet message...', () => {
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    })
})

// testing for arrays
describe('getCurrencies', () => {
    it('should return supported currencies...', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    })
})

// testng for objects
describe('getProduct', () => {
    it('should return products...', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({ id: 1, price: 10 })
        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty('id',1);
    })
})

// testing for exceptions
describe('registerUser', () => {
    it('should throw an exception if the username is false', () => {
        const args = [null, NaN, 0, '', false, undefined];
        args.forEach( (a) => {
            expect(() => { lib.registerUser(a).toThrow()})
        })
    })
    it('should return user object if valid data passed', () => {
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject({ username: 'mosh'});
        expect(result.id).toBeGreaterThan(0);
    })
})

// FizzBuzz Exercise
describe('fizzBuzz', () => {
    it ('should throw an error if input is not a number', () => {
        expect(() => {fizzBuzz('a')}).toThrow();
        expect(() => {fizzBuzz(null)}).toThrow();
        expect(() => {fizzBuzz(undefined)}).toThrow();
        expect(() => {fizzBuzz({})}).toThrow();
    })

    it ('get fizzbuzz if its divisible by 3 and 5', () => {
        const result = fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    })

    it ('get fizz if its divisible by 3', () => {
        const result = fizzBuzz(3);
        expect(result).toBe('Fizz');
    })

    it ('get fizzbuzz if its divisible by 5', () => {
        const result = fizzBuzz(5);
        expect(result).toBe('Buzz');
    })
    
    it ('get input if its not divisible by 5 or 3', () => {
        const result = fizzBuzz(1);
        expect(result).toBe(1);
    })
})

// Mock Functions
