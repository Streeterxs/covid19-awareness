import mongoose from 'mongoose';
import config from './config';

export const connectDatabase = () => {
    console.log('config dburl: ', config.dburl);
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection closed.'))
            .once('open', () => resolve(mongoose.connections[0]));

        mongoose.connect(config.dburl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    });
};
