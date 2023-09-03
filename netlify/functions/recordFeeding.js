// netlify-functions/recordFeeding.js

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
    const requestBody = JSON.parse(event.body);
    const { time, food } = requestBody;
    // Save feeding data to your database here
     // Store feeding history data in Firestore using admin SDK
     const db = admin.firestore();
     await db.collection('feedingHistory').add({
       time,
       food,
     });
    // Initialize Firebase admin SDK
    admin.initializeApp({
      // Add your Firebase config here
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://meow-meow-feeder-e4bf9-default-rtdb.asia-southeast1.firebasedatabase.app"
      
    });
    
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Feeding recorded successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};