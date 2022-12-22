# Automated Testing

- Automated testing is the process of writing `test code` to test the `production code`.
- This can be used to catch bugs before deploying and can refactor the code with confidence.
* There are 3 types of testings
    * Unit Testing
    * Integration Testing
    * End to End Testing
- In `Unit Testing`, Classes and functionalities will be tested witout considering the external dependencies.
- In `Integration Testing`, the production code wll be tested with external dependencies.
- In `End to End testing`, all the UI and others will be tested. Ex: Selenium

## Setting up the environment

* There are many frameworks out there for Testing
    * Jasmine
    * Mocha with Chai and Sinon
    * Jest
* In this project we use `jest`.
> npm i jest --save-dev  
* It comes under development dependencies. Not under the project environment.
* To run the test, Goto `pacage.json`, under `devDependencies` edit the `scripts` --> `test` to "jest".
* To run the test `npm test`
* The number of tests for a function is roughly equals to the number of executions it has.

## Unit test sample

* Create a directory named `tests` and a test file in it. `lib.test.js`.
* Create a small function inside the lib.test.js
```javascript
test('First Test', () => {
});
```
* Run the test.
* Refer [Testing Demo](../Exercises/testing-demo/)
