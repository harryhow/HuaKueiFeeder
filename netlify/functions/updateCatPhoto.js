// netlify-functions/updateCatPhoto.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with the actual path



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