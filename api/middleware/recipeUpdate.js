const db = require("../recipes/recipe-model");
const recipeUpdate = (req, res, next) => {
  db.findById(req.params.id).then((data) => {
    if (data["user_id"] === req.decodedToken.user_id) {
      next();
    } else {
      res.status(400).json({
        Message: "You are not authorized to modify or access this resource!",
      });
    }
  });
};

module.exports = recipeUpdate;