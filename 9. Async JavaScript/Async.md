# Async JavaScript

> const opt = require('debug')('app:startup')

| Synchronous (Blocking)                      | Asynchronous (Non Blocking)                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------- |
| `opt('1');` `opt('2');`                     | `opt(1);` `setTimeout(()=>{opt(3)},2000);` `opt('3')`                           |
| `1`, `2`                                    | `1`, `3`, `2`                                                                   |
| 2nd line will be executed after the 1st one | `setTimeout` function will be executed after 2 seconds of other code executions |

- `Synchronous` flow execute the lines of code sequentialy.
- `Asynchronous` flow changes when the execution spots any async function in the flow.
- There are 3 patterns to handle Async
  > Callbacks  
  > Promise  
  > Async/ Await

## Callbacks

```javascript
console.log("Line 1");
setTimeout(() => {
  console.log("Line 2");
}, 2000);
console.log("Line 3");
```

### Callback Hell

```javascript
const opt = require("debug")("app:startup");
opt("1st Line");

getUser(1000, (user_data) => {
  opt(user_data);
  getRepos(1001, (repo_data) => {
    opt(repo_data);
    getCommit(1002, (commit_data) => {
      opt(commit_data);
      // This nested structure creates a CALLBACK HELL
      // To prevent that we can map anonymous functions to named functions
      // Example: (commit_data) => {opt(commit_data);} is an anonymous function, we give it a name and pass call it; arguments if required
    });
  });
});

opt("3rd Line");

function getUser(id, callback_function) {
  setTimeout(() => {
    opt("Reading User Data...");
    let user = "User ID: " + id;
    callback_function(user);
  }, 2000);
}

function getRepos(repoID, callback_function2) {
  setTimeout(() => {
    opt("Reading Repo Data...");
    let repo_id = "Repo ID: " + repoID;
    callback_function2(repo_id);
  });
}

function getCommit(commitID, callback_function3) {
  setTimeout(() => {
    opt("Reading Commit Data...");
    let com_id = "Commit ID" + commitID;
    callback_function3(com_id);
  });
}
```

> Solution for the callback hell

```javascript
getUser(1000, viewUser); // Simple :D

opt("3rd Line");

function viewUser(user_data) {
  opt(user_data);
  getRepos(1001, viewRepos);
}

function viewRepos(repo_data) {
  opt(repo_data);
  getCommit(1002, viewCommit);
}

function viewCommit(commit_data) {
  // In the callback hell nested structure, function will not be called; instead they will be mentioed.
  // Ex: getCommit(1002, viewCommit);
  opt(commit_data);
}
```

## Promises

- It's an object which holds the eventual result of an asynchronous operation.
- When the promise is created, it's in the pending state.
- When it's in the opetation either it can `fullfilled` (aka `resolved`) or `rejected`.

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Successfully Executed");
    reject(new Error("message"));
  }, 2000);
});

p.then((result) => console.log("Result: ", result)); //to get the result
p.catch((error) => console.log("Error: ", error.error)); //to get the error
```

### Settled Promises

```javascript
// Already resolved objects
const p = Promise.resolve({ id: 1001, userName: "Yu" });
p.then((value) => console.log(value));

// Already rejected objects
const q = Promise.reject(new Error("reason for the error..."));
q.catch((error) => console.log(error));
```

### Parallel Promises

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Resolving 1st request");
    resolve("Resolved 1");
    // reject(new Error('Failed due to: '))
  }, 2000);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Resolving 2nd request");
    resolve("Resolved 2");
  }, 2000);
});

// If any promise rejected, all will be considered rejected.

// If you want to start the action asap use Promise.race
Promise.all([promise1, promise2])
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

## Async and Await

- A promise must wait when using an `await`.

```javascript
async function displayCommits() {
  try {
    const user = await getUser(1001);
    const repos = await getRepos(1002);
    const commits = await getCommits(1245);
    console.log(commits);
  } catch (err) {
    console.log(err);
  }
}

function getUser(userID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(userID);
      resolve("successful", userID);
    }, 2000);
  });
}

// Other promises
```

> A thread will handle one request. `await` releases the thread as soon as the process is over.
