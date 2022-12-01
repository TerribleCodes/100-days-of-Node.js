# Async JavaScript

> const opt = require('debug')('app:startup')

Synchronous (Blocking)| Asynchronous (Non Blocking)
------------ | ------------- 
`opt('1');`  `opt('2');`|`opt(1);`  `setTimeout(()=>{opt(3)},2000);`  `opt('3')`
`1`, `2`| `1`, `3`, `2`
2nd line will be executed after the 1st one| `setTimeout` function will be executed after 2 seconds of other code executions

- There are 3 patterns to handle Async
    > Callbacks  
    > Promise  
    > Async/ Await

## Callbacks



