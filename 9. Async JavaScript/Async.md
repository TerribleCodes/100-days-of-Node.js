# Async JavaScript

> const opt = require('debug')('app:startup')

Synchronous (Blocking)| Asynchronous (Non Blocking)
------------ | ------------- 
`opt('1');`  `opt('2');`|`opt(1);`  `setTimeout(()=>{opt(3)},2000);`  `opt('3')`
`1`, `2`| `1`, `3`, `2`
2nd line will be executed after the 1st one| `setTimeout` function will be executed after 2 seconds of other code executions

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
const opt = require('debug')('app:startup');
opt('1st Line');

getUser(1000, (user_data) => {
    opt(user_data);
    getRepos(1001, (repo_data) => {
        opt(repo_data);
        getCommit(1002, (commit_data) => {
            opt(commit_data);
                // This nested structure creates a CALLBACK HELL
                // To prevent that we can map anonymous functions to named functions
        })
    })
});

opt('3rd Line');

function getUser(id, callback_function){
    setTimeout(() => {
        opt("Reading User Data...");
        let user = "User ID: "+id;
        callback_function(user);
    }, 2000);
}

function getRepos(repoID, callback_function2){
    setTimeout(() => {
        opt("Reading Repo Data...");
        let repo_id = "Repo ID: "+repoID;
        callback_function2(repo_id);
    })
}

function getCommit(commitID, callback_function3){
    setTimeout(() => {
        opt("Reading Commit Data...");
        let com_id = "Commit ID"+commitID;
        callback_function3(com_id);
    })
}
```