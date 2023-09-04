// netlify-functions/updateCatPhoto.js
const admin = require('firebase-admin');
const firebasePrivateKey = process.env.FIREBASE_ADMIN_KEY.replace(/\\n/g, '\n');
const serviceAccount = {
    "type": "service_account",
    "project_id": "meow-meow-feeder-e4bf9",
    "private_key_id": "506b25ab4c35814673ca485188cc0b48a54595c9",
    "private_key": firebasePrivateKey,
    "client_email": "firebase-adminsdk-ezppt@meow-meow-feeder-e4bf9.iam.gserviceaccount.com",
    "client_id": "110605251930159038744",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ezppt%40meow-meow-feeder-e4bf9.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};


exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {

    // Initialize Firebase admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://meow-meow-feeder-e4bf9-default-rtdb.asia-southeast1.firebasedatabase.app',
      // Add other configuration options if needed
    });
    const requestBody = JSON.parse(event.body);
    const catPhotoURL = requestBody.catPhotoURL;
    // Update cat's photo URL in the database here

    const db = admin.firestore();
    
    // Update cat's photo URL in Firestore
    await db.collection('cats').doc('catDocumentId').update({
      catPhotoURL,
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Cat photo updated successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};