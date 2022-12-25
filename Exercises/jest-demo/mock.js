const axios = require('axios');

const fetchData = async (id) => {
    // axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //     .then((res) => res.data)
    //     .catch(err => console.log(err));
    const result = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return (result.data);
}

module.exports = fetchData;