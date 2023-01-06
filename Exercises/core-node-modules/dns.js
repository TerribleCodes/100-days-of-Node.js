const dns = require('dns');

// Resolves the addres to the IP
dns.resolve('www.google.com', (err, value) => {
    if(err){
        console.log(err);
        return;
    }else{
        console.log(value);
    }
});

// Resolves the IP to the address
dns.reverse('8.8.8.8', (err, result) => {
    if(err){
        console.log(err);
        return;
    }else{
        console.log(result);
    }
});