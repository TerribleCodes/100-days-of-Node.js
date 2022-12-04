const opt = require('debug')('app:startup');

opt('1st Line');

// Consuming Promises
// const p = getUser(2);
// p.then(user => opt(user))
// getUser(1001)
//     .then(user_id => getRepos(user_id))
//     .then(repo_id => getCommit(repo_id))
//     .then(commit_id => opt(commit_id))
//     .catch(err => opt(err.message));

opt('3rd Line');

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let user = "User ID: "+id;
            resolve(user);
            // reject(user);
        }, 2000);
    })
}

function getRepos(repoID){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let repo_id = "Repo ID: "+repoID;
            resolve(repo_id);
        })
    })
}

function getCommit(commitID){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let com_id = "Commit ID"+commitID;
            resolve(com_id);
        })
    })
}
