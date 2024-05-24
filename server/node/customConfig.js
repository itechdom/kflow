'use strict';
import config from 'config';
import getAWSSecret from './getAWSSecret';

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
        if (key === 'db.host') {
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

export default customConfig;