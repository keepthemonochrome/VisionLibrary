// HOW TO CONFIG
// Rename this file to cloudvision.config.js
// Input the project ID
// Rename credentials json to 'credentials.json' and put it in this config directory

process.env['GCLOUD_PROJECT'] = '';
process.env['GOOGLE_APPLICATION_CREDENTIALS'] = __dirname + '/' + 'credentials.json';

console.log(`Set GCloud security env vars\n --> GCLOUD_PROJECT=${process.env.GCLOUD_PROJECT}\n --> GOOGLE_APPLICATION_CREDENTIAL ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
