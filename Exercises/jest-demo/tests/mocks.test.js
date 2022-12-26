const mock = require('../mock');
const db = require('../../testing-demo/db')


describe('apply discount', () => {
    it('Should apply 10% discount if the customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId){
            return {id: customerId, points: 20}
        }
        const customer_data = {customerId: 1, totalPrice: 10};
        mock.applyDiscount(customer_data);
        expect(customer_data.totalPrice).toBe(9);
    })
})