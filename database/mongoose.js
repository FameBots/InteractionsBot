const mongoose = require('mongoose');

require("dotenv").config();

module.exports = async () => {
    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,      
      };

    mongoose.connect(process.env.MONGO_URL, dbOptions)
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

