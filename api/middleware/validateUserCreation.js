const db = require("../users/users-model.js");
const validateUserCreation = (req, res, next) => {
  const data = req.body;
  const username = Object.prototype.hasOwnProperty.call(data, "username");
  const password = Object.prototype.hasOwnProperty.call(data, "password");
  if (username === true && password === true) {
    db.getByUsername(req.body.username)
      .then((data) => {
        if (data.length === 0) {
          next();
        } else {
          res.status(200).json({ Message: "User already exists!" });
        }
      })
      .catch((err) => {
        res.status(200).json(err.message);
      });
  } else {
    res.status(400).json({
      Message:
        "Data is not structured in a way that is usable for the API please read the documentation!",
    });
  }
};

module.exports = validateUserCreation;