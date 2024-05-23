'use strict';
const config = require('config');
const getAWSSecret = require('./getAWSSecret');

let DB_URI;

const fetchDbHost = async () => {
    if (!DB_URI) {
        DB_URI = await getAWSSecret();
    }
};

const customConfig = {
    async initialize() {
        await fetchDbHost();
    },
    get(key) {
        if (key === 'test') {
            return DB_URI;
        } else {
            return config.get(key);
        }
    },
    has(key) {
        return config.has(key);
    },
    // Add more methods as required
};

module.exports = customConfig;
