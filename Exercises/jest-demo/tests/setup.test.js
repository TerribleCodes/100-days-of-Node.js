let animals = ['kiwi', 'kangaroo', 'anglerfish', 'crow', 'panther'];

beforeEach(() => {
    console.log(animals);
});

describe('animals array', () => {
    it('should add animal to end of the array', () => {
        animals.push('penguin');
        expect(animals[animals.length-1]).toBe('penguin');
    });
    it('should add animal to end of the array', () => {
        animals.unshift('hawk');
        expect(animals[0]).toBe('hawk');
    });
});
