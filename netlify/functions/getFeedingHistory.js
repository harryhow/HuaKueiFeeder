// netlify-functions/getFeedingHistory.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with the actual path


// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add other configuration options if needed
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Retrieve feeding history from your database here
    // Example: You can use a database like MongoDB, Firebase, etc.

    const db = admin.firestore();
    const historyCollection = db.collection('feedingHistory');
    const querySnapshot = await historyCollection.get();

    const feedingHistory = [];

    querySnapshot.forEach(doc => {
      feedingHistory.push(doc.data());
    });
    
    // const feedingHistory = [
    //   { time: '2023-09-01 12:00 PM', food: 'Dry Food' },
    //   { time: '2023-09-02 06:00 AM', food: 'Wet Food' },
    //   // ... Add more feeding history data
    // ];
    
    return {
      statusCode: 200,
      body: JSON.stringify(feedingHistory),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};