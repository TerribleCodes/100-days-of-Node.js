async function notifyCustomer(){
    const customer = await getCustomer(1);
    console.log(customer);
    if (customer.isGold){
    const movies = await getTopMovies();
    console.log(movies);
    await sendEmail(customer.email, movies);
    console.log('Email Sent...');
    }
}

notifyCustomer();

function getCustomer(id) {
   return new Promise((resolve) => {
    setTimeout(() => {
        resolve({ 
          id: 1, 
          name: 'Mosh Hamedani', 
          isGold: true, 
          email: 'email' 
        });
      }, 1000);
   })  
  }
  
  function getTopMovies() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
    })
  }
  
  function sendEmail(email, movies) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
          }, 4000);
    })
  }