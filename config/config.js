if (process.env.NODE_ENV !== 'production'){
    console.log('NODE_ENV : ' + process.env.NODE_ENV);
}
if (process.env.NODE_ENV !== undefined || process.env.NODE_ENV !== 'development') {
    require('dotenv').config({ path: './env/' + process.env.NODE_ENV + '.env' });
}

module.exports = {
    env: process.env.NODE_ENV || 'development',
    api: {
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || '8000'
    },
    mongodb: process.env.MONGODB_URI || 'mongodb://mongodb:27017/api-android',
    key: {
        privateKey: process.env.PRIVATE_KEY || 'YourPrivateKey',
        tokenExpiration: process.env.TOKEN_EXPIRATION || 3600000,
        tokenExpirationDescription: process.env.TOKEN_EXPIRATION_DESCRIPTION || '1 hour'
    }
};
