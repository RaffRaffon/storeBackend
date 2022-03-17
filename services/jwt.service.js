const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const verify = (token) => jwt.verify(token, jwtSecret);
const sign = ({ _id, username }) => {
  if (!_id || !username) {
    console.warn('Missing _id or username in sign()');
    return null;
  }
  return jwt.sign({ _id, username }, jwtSecret);
}

module.exports = { sign, verify }