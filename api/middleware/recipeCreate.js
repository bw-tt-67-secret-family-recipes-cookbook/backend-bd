const recipeCreate = (req, res, next) => {
    const data = req.body;
    const title = Object.prototype.hasOwnProperty.call(data, "title");
    const source = Object.prototype.hasOwnProperty.call(data, "source");
    const ingredients = Object.prototype.hasOwnProperty.call(
      data,
      "ingredients"
    );
    const instructions = Object.prototype.hasOwnProperty.call(data, 'instructions');
    const category = Object.prototype.hasOwnProperty.call(data, 'category');
    if (
      title === true &&
      source === true &&
      ingredients === true &&
      instructions === true &&
      category === true &&
      Object.keys(data).length
    ) {
      next();
    } else {
      res.status(400).json({
        Message:
          "Data is not structured in a way that is usable for the API please read the documentation!",
      });
    }
  };
  
  module.exports = recipeCreate;