const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('Checking MongoDB connection...');

if (!process.env.MONGO_URL) {
  console.error('MONGO_URL is not defined in .env file');
  console.log('Please make sure you have created a .env file with MONGO_URL');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    console.log('MongoDB connection URL:', process.env.MONGO_URL.replace(/:([^:@]{4,}@)/g, ':****@'));
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('\nYour MongoDB connection is working correctly!');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed!');
    console.error('Error message:', error.message);
    console.error('\nPossible reasons for connection failure:');
    console.error('1. MongoDB server is not running');
    console.error('2. MongoDB connection string in .env file is incorrect');
    console.error('3. Network issues preventing connection to MongoDB server');
    console.error('4. Authentication credentials are incorrect');

    console.log('\nSuggested actions:');
    console.log('1. Check if your MongoDB server is running');
    console.log('2. Verify your MONGO_URL in the .env file');
    console.log('3. If using MongoDB Atlas, check your IP whitelist');
    console.log('4. Ensure username and password in the connection string are correct');
  })
  .finally(() => {
    // Close the connection after checking
    setTimeout(() => {
      mongoose.connection.close();
      process.exit(0);
    }, 1000);
  });
