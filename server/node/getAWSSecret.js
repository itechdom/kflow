import {  SecretsManagerClient, GetSecretValueCommand  } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'us-east-1' }); // Specify the correct region

const getAWSSecret = async () => {
    const command = new GetSecretValueCommand({ SecretId: 'arn:aws:secretsmanager:us-east-1:035958020148:secret:kflow-OcEMIB' }); // Use your ARN here
    try {
        const data = await client.send(command);
        const secret = JSON.parse(data.SecretString); // Parse the secret string to get the key-value pairs
        return secret.DB_URI; // Return the DB_URI value
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default getAWSSecret; // If you're exporting a single function/value
