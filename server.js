const mongoose = require('mongoose');
const dotenv = require('dotenv');

// globally handled unhandled exception
process.on('uncaughtException', err => {
  console.log('Erroe!!!!!!!', err.name, err.message);
  console.log('Unhandled Exception!, Shutting Down');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then( () => {
  console.log('DB Connection Succesful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// globally handling non-handled rejected promises
process.on('unhandledRejection', err => {
  console.log('Erroe!!!!!!!', err.name);
  console.log('Unhandled rejection!, Shutting Down');
  server.close(() => {
    process.exit(1);
  });
});