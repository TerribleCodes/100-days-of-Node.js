# Introduction

- `jest` is a javascript framework for testings.
- Refer [unit-testing](./1.%20Unit%20Testing/unit-testing.md) for more information.
- There are many frameworks out there for Testing
  - Jasmine
  - Mocha with Chai and Sinon
  - Jest
- The ES6 isn't natively supported by `jest`. Therefor Node.js import system will be used.

# Automated Testing

- Automated testing is the process of writing `test code` to test the `production code`.
- This can be used to catch bugs before deploying and can refactor the code with confidence.

* There are 3 types of testings
  - Unit Testing
  - Integration Testing
  - End to End Testing

- In `Unit Testing`, Classes and functionalities will be tested witout considering the external dependencies.
- In `Integration Testing`, the production code wll be tested with external dependencies.
- In `End to End testing`, all the UI and others will be tested. Ex: Selenium

* For the UI tests, use the `puppeteer` package.

* Basic structure of a jest test module:

```javascript
describe("The function provides a positive integer when performed addition", () => {
  // Test 1
  it("should return the summation of two numbers", () => {
    const result = sum_function(1, 2);
    expect(result).toBe(3); // Assertion
  });

  // Test 2
  const obj = {};
  expect(obj).toEqual({}); // Here we cannot use toBe because {} === {} is false.
});
```

## Usage of `toBeTruthy()` and `toBeFalsy()`

```javascript
describe("Evaluates whether the expression is truthy or falsy", () => {
  it("should return a falsy", () => {
    const value_1 = null;
    const value_2 = "";
    const value_3 = undefined;

    expect(value_1).toBeFasly();
    expect(value_2).toBeFasly();
    expect(value_3).not.toBeTruthy();
  });
});
```

## Testing `async - await` functions

```javascript
describe("Testing route handlers", () => {
  it("Returns the todo id", () => {
    fetchData(1) // Here we pass arguments to the imported function
      .then((result) => {
        expect(result.id).toBe(1);
      }) // Then the result from the promise result.id will be evaluated
      .catch((err) => {
        console.log(err);
      });
  });
  // Or the following approach also con be used
  it("Returns the correct todo", async () => {
    const result = await fetchData(1);
    expect(result.id).toBe(1);
  });
});
```

## Setup and Teardown

```javascript
let animals = ["kiwi", "kangaroo", "anglerfish", "crow", "panther"];

beforeEach(() => {
  // beforeEach method runs before each test and does some operation
  console.log(animals);
});
afterEach(() => {
  // afterEach method runs before each test and does some operation
  console.log(animals);
});

describe("animals array", () => {
  it("should add animal to end of the array", () => {
    animals.push("penguin");
    expect(animals[animals.length - 1]).toBe("penguin");
  });
  it("should add animal to end of the array", () => {
    animals.unshift("hawk");
    expect(animals[0]).toBe("hawk");
  });
});
```

## Mocks

- Allows user to avoid testing certain parts of the code.
- For an example, if an API is down for maintainance the test code fails because it's trying to fetch data. To avoid such failures we use mock functions.
- To use a mock, simply create a directory named `__mocks__`. And inside the main directory, place a copy of the module that's going to tested (Ex: where we call the API).
- On the top of the `file.test.js` call `jest.mock('./original_file)`.
- When the test is running, jest will call the mock file instead of calling the original file.

Example:

```javascript
jest.mock('./fetchData.js');
const fetchData = () => { // Mock Function inside the __mocks__
  return Promise.resolve({
    title: 'delectus aut autem';
  })
};
exports.fetchData = fetchData;
```

```javascript
const axios = require("axios");
const fetchData = () => {
  // Original function where API call happens
  return axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => {
      return "APPLE" /*response.data*/;
    });
};
exports.fetchData = fetchData;
```
