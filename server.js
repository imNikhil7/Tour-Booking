const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>',
 process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
    useNewUrlParser: true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology: true
} ).then(() => {
    console.log('DB connection successful');
});


const port = process.env.PORT ;
const server = app.listen(port, () =>{
    console.log(`App running on port ${port}...`);
});

process.on('unhandleRejection' , err =>{
    consoele.log(err.name, err.message);
    console.log('Unhandle Rejection shutting down');
    server.close(()=>{
        process.exit(1);
    });
});

