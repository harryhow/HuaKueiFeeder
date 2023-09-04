// netlify-functions/getFeedingHistory.js
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


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://meow-meow-feeder-e4bf9-default-rtdb.asia-southeast1.firebasedatabase.app',
    // Add other configuration options if needed
  });
}

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

    // Initialize Firebase admin SDK
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: 'https://meow-meow-feeder-e4bf9-default-rtdb.asia-southeast1.firebasedatabase.app',
    //   // Add other configuration options if needed
    // });

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
    console.error("Error details:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};