const opt = require('debug')('app:startup');

opt('1st Line');

// getUser(1000, (user_data) => {
//     opt(user_data);
//     getRepos(1001, (repo_data) => {
//         opt(repo_data);
//         getCommit(1002, viewCommit(commit_data));
//     })
// });

async function displayCommits(){
    // const user = await getUser(1001);
    // const repos = await getRepos(1002);
    const commits = await getCommit(1245);
    console.log(commits);
}
displayCommits()

// getUser(1000, viewUser);

opt('3rd Line');

// function viewUser(user_data){
//     opt(user_data);
//     getRepos(1001, viewRepos); 
// }

// function viewRepos(repo_data){
//     opt(repo_data);
//     getCommit(1002, viewCommit);
// }

// function viewCommit(commit_data){
//     // In the callback hell nested structure, function will not be called; instead they will be mentioed.
//     // Ex: getCommit(1002, viewCommit);
//     opt(commit_data);
// }

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

function getCommit(commitID/*, callback_function3*/){
    setTimeout(() => {
        opt("Reading Commit Data...");
        // let com_id = "Commit ID"+commitID;
        // callback_function3(com_id);
    })
}