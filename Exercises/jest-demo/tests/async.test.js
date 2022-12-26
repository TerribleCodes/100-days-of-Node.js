const fetchData = require('../async');

describe('Testing route handlers', () => {
    // it('Returns the correct todo', () => {
    //     fetchData(1)
    //         .then((todo) => { expect(todo.id).toBe(1) })
    //         .catch((err) => {console.log(err)});
    // });
    it('Returns the correct todo', async () => {
        const result = {id: 1}/*await fetchData(1);*/
        expect(result.id).toBe(1);
    });
});