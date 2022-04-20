const mongoose = require('mongoose');
const config = require( '../config/defult.json')


if (!config.jwtPrivatKey){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}
console.log('Database :>> ', config.DB_URL);
mongoose.connect(config.DB_URL,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>{
    
    console.log('Connected to MongoDB..................')
    
} ).catch((err) => {
    console.error('Could not connect to Mongodb...', err)
}) 

exports.mongoose = mongoose;