const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    if(req.files){
        var file = req.files.file;
        var fileName = file.name;
        console.log('File Uploaded -->',fileName);

        file.mv(fileName, (err)=>{
            if (err){
                res.send(err);
            }else{
                res.send('File uploaded')
            }
        });
    }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));