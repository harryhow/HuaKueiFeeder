// netlify-functions/updateLocationDescription.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with the actual path

// Initialize Firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Add other configuration options if needed
  });

  
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const requestBody = JSON.parse(event.body);
    const locationDescription = requestBody.locationDescription;
    // Update location description in the database here

    const db = admin.firestore();
    
    // Update location description in Firestore
    await db.collection('locations').doc('locationDocumentId').update({
      locationDescription,
    });

    await db.collection('cats').doc('catDocumentId').update({
        catPhotoURL,
      });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Location description updated successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};