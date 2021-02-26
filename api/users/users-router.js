const express = require('express')
const Users = require('./users-model')
const bcryptjs = require("bcryptjs");
const makeToken = require("../middleware/makeToken");
const loginValidation = require("../middleware/loginValidation");
const restricted = require('../middleware/restricted')

const router = express.Router()

router.post("/register", (req, res) => {
    const credentials = req.body
    const hash = bcryptjs.hashSync(credentials.password, 10);
    credentials.password = hash;
    
    Users.create(credentials)
    .then((data) => {
      res.status(201).json({message: `Successfully created! ${data}`});
    })
    .catch((err) => {
      res.status(400).json({message: '1', error: err.message});
    });
  });

router.post("/login", loginValidation, (req, res) => {
    Users.getByUsername(req.body.username)
    .then((user) => {
      if (bcryptjs.compareSync(req.body.password, user[0].password)) {
        const token = makeToken(user[0]);
        res.status(200).json({
          message: "Welcome to our API, " + user[0].username,
          token,
        });
      } else {
        res.status(401).json("invalid credentials");
      }
    })
    .catch((err) => {
      res.status(400).json({message: '2', error: err.message});
    });
  });

router.get('/recipes/:user_id', (req, res) => {
    Users.getRecipes(req.params)
        .then(recipes => {
            res.json(recipes)
        })
        .catch(err => {
            res.status(400).json({message: '3', error: err.message})
        })
})

router.get("/recipes", restricted, (req, res) => {
  Users.getRecipes(req.decodedToken.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.put('/recipes/:recipe_id', (req, res) => {
    const recipeId = req.params
    const recipeBody = req.body

    Users.updateRecipe(recipeId, recipeBody)
        .then(recipe => {
            res.status(200).json(recipe)
        })
        .catch(err => {
            res.status(400).json({message: '5', error: err.message})
        })
})

router.delete('/recipes/:recipe_id', (req, res) => {
    Users.removeRecipe(req.params)
        .then(() => {
            res.json({message: 'DELETED 4EVEAR'})
        })
        .catch(err => {
            res.status(400).json({message: '6', error: err.message})
        })
})

router.post('/recipes', (req, res) => {
    Users.makeRecipe(req.body)
        .then(recipe => {
            res.status(201).json(recipe)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
})
module.exports = router

