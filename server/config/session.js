// session.js

// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const crypto = require('crypto');

// Generate a random secret for the session
// const sessionSecret = crypto.randomBytes(32).toString('hex');

// Configure the MongoDB session store
// const store = new MongoDBStore({
//   uri: 'mongodb://localhost:27017/onTheGrow',
//   collection: 'sessions', // Collection to store session data
// });

// Handle errors for the session store
// store.on('error', function (error) {
//   console.error('Session store error:', error);
// });

// module.exports = {
//   session,
//   sessionSecret,
//   store,
// };
