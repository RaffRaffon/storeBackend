const mongoose = require('mongoose');

const initDb = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
      console.log('connected to db: ', res.connections[0].name)
    })
    .catch(err => {
      console.error('DB connection failed:', err);
    });
}

module.exports = { initDb };