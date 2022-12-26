const db = require('../testing-demo/db');

module.exports.applyDiscount = function(order) { 
    const customer = db.getCustomerSync(order.customerId); //getting the customer data using the order details
    if (customer.points > 10) 
        order.totalPrice *= 0.9; 
    }

module.exports.notifyCustomer = function(order) { 
    const customer = db.getCustomerSync(order.customerId);
    mail.send(customer.email, 'Your order was placed successfully.');
    }