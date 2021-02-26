const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT || "YUNGBRYAN";

module.exports = function makeToken(user) {
  const payload = {
    id: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "900000s",
  };
  return jwt.sign(payload, jwtSecret, options);
};