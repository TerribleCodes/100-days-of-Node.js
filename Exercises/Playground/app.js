const divideByTwo = (amount) => {
  return new Promise((res, rej) => {
    if (typeof amount !== "number") {
      rej(new TypeError("Amount must be a number"));
      return;
    } else {
      res(amount);
    }
  });
};

console.log(divideByTwo("as"));
