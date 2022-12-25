// Already resolved objects
// const p = Promise.resolve({id: 1001, userName: "Yu"})
// p.then(value => console.log(value))

// Already rejected objects
// const q = Promise.reject(new Error('reason for the error...'));
// q.catch(error => console.log(error))

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("Resolving 1st request");
//         resolve("Resolved 1")
//         // reject(new Error('Failed due to: '))
//     },2000);
// })

// const promise2 = new Promise((resolve) => {
//     setTimeout(() => {
//         console.log("Resolving 2nd request");
//         resolve("Resolved 2")
//     },2000);
// })

// If any promise rejected, all will be considered rejected.

// If you want to start the action asap use Promise.race
// Promise.all([promise1, promise2])
// .then(result => console.log(result))
// .catch(error => console.log(error))

