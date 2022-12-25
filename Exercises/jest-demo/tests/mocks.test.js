const fetchData = require('../mock');
const axios = require('axios');

jest.mock(axios, () => ({
    __esModule: true,
    default: {
        get: jest.fn().mockResolvedValue({ result: {id: 1}})
    }
}))

describe('Read information from a random API', () => {
    it('Should return the data', async () => {
        const result = await fetchData(1);
        expect(result.id).toBe(1);
    });
});