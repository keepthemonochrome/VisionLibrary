// Rename this file to cloudvision.config.js
// Then input the project ID and the application credential file name


process.env['GCLOUD_PROJECT'] = 'supersorter-151822';
process.env['GOOGLE_APPLICATION_CREDENTIALS'] = __dirname + '/credentials.json';
// process.env['DATABASE_URL'] = "mongodb://localhost/visionPhotoLibrary";

console.log(`Set GCloud security env vars\n --> GCLOUD_PROJECT=${process.env.GCLOUD_PROJECT}\n --> GOOGLE_APPLICATION_CREDENTIAL ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
