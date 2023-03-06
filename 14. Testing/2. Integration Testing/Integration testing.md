# Introduction

* It's the process of testing the application with dependencies.

## Setting up the environment when working with Databases

* In the `default.json` add a new value `db` and set it to the default value.

```json
    {
        "db": "mongodb://localhost/db_name"
    }
```

* In the `test.json` set the `db` to testing database

```json
    {
        "db": "mongodb://localhost/test_db"
    }
```

* Before running the tests, set the environment to "test" -> `NODE_ENV=test`

* For the Integration testing we use a package called `supertest`.  
> npm install supertest --save-dev  

Example: 
```javascript
const express = require('express');
const request = require('supertest');

describe('GET/', () => {
    it('returns all genre', async () => {
        await Genre.collection.insertMany([
            {name: 'genre1'},
                {name2: 'genre2'}
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status(200));
            expect(res.body.length).toBe(2);
        });
    });
```

## Code Coverage (Visualize)

* To visualize the code coverage, in the `package.json` tests, add `--coverage` flag.

```json
"scripts": {
    "test": "jest --watchAll --verbose --coverage"
  }
```

* Run the test (`npm test`), you'll get the code coverage.
* A directory called `coverage` will be created for more information.
