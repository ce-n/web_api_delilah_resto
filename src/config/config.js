const config = {
    SERVER_PORT: 3000,
    DDBB: {
        NAME: 'delilah_resto',
        USER: 'root',
        PASS: '',
        PORT: '3306',
        HOST: '127.0.0.1'
    },
    JWT: {
        PRIVATE_KEY: 'secret_key',
        EXPIRES_TIME: 10
    }
}

module.exports = config