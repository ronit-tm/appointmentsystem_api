const express = require('express');
const app = express();
app.use((req,res,next)=>{
    res.setHeader('Acces-Control-Allow-Origin','*');
    res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
    next(); 
})
require('./src/startUp/prodconfig')(app);
require('./src/startUp/route')(app);
require('./src/startUp/dbconnect');

const port = process.env.PORT || 13000;
app.listen(port,() => console.log(`Listening on port ${port}.... `) );