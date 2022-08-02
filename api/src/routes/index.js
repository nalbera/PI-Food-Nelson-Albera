//api completa
//https://api.spoonacular.com/recipes/complexSearch?apiKey=7a7bf44608604fe7b768f53abb3509fe&addRecipeInformation=true

const routesControllers = require('../controllers/routesControllers');

const { Router } = require('express');
const router = Router();


router.get('/recipes', routesControllers.getRecipes);

router.get('/recipes/:id', routesControllers.getRecipeId);

router.get('/types', routesControllers.getTypes);

router.post('/recipe',routesControllers.postRecipe);


router.get('/', async (req, res) =>{
        res.send("<h1>I'm here</h1>")
})


module.exports = router;
