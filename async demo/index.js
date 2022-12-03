const opt = require('debug')('app:startup');
opt('1st Line');

getUser(1000, (user_data) => {
    opt(user_data);
    getRepos(1001, (repo_data) => {
        opt(repo_data);
        getCommit(1002, viewCommit(commit_data));
    })
});

opt('3rd Line');

function viewCommit(commit_data){
    opt(commit_data);
}

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