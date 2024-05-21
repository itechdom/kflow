const AWS = require('aws-sdk');
const mongoose = require('mongoose');

const secretName = "/myapp/DB_URI";
let dbUri;

// Create a Secrets Manager client
const client = new AWS.SecretsManager({
    region: "us-east-1"
});

async function getSecretValue() {
    try {
        const data = await client.getSecretValue({ SecretId: secretName }).promise();
        if ('SecretString' in data) {
            const secret = JSON.parse(data.SecretString);
            dbUri = secret.DB_URI;
        } else {
            console.error('SecretString is not found in the secret value.');
        }
    } catch (err) {
        console.error('Error retrieving the secret:', err);
    }
}

getSecretValue().then(() => {
    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
          console.log('MongoDB connected successfully');
      })
      .catch(err => {
          console.error('MongoDB connection error:', err);
      });
});