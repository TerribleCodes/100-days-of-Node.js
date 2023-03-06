## Setting up the environment

> npm i jest --save-dev  
* It comes under development dependencies. Not under the project environment.
* To run the test, Goto `pacage.json`, under `devDependencies` edit the `scripts` --> `test` to "jest".
* Test file should follow `name_of_the_file.test.js` naming convention.
* To run the test `npm test`
* The number of tests for a function is roughly equals to the number of executions it has.
* To keep `jest` watching goto `package.json` scripts chage `"test": "jest --watchAll"`

## Unit test sample

* Create a directory named `tests` and a test file in it. `file.test.js`.
* Create a test function inside the file.test.js

```javascript
test('First Test', () => {
    // Test function goes here with the expectation
});
```

* Run the test using the command `npm test`
* Refer [Unit Testing using Jest](../jest.md)
* Tests must be Generel. Not too specific.