    
const mongoose = require('mongoose');

module.exports = async () => {
    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,      
      };

    mongoose.connect("mongodb://USER:PASSWORD@localhost:27017/HttpBot", dbOptions)
    .catch(e => {
      console.log(e.message)
    })

    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('err', err => {
        console.log(`Mongoose connection error: ${err.stack}`)
    });

    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose connection lost`)
    });
};

