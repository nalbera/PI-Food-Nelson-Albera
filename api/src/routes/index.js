//api completa
//https://api.spoonacular.com/recipes/complexSearch?apiKey=7a7bf44608604fe7b768f53abb3509fe&addRecipeInformation=true

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios').default;
const {Recipe, DietType} = require('../db')
const router = Router();

const Sequelize = require('sequelize');

const { API_KEY } = process.env;

const Op = Sequelize.Op;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

        const apiInfo = await apiUrl.data.results.map(info => {
                return {
                        name: info.title,
                        resume: info.summary,
                        score: info.spoonacularScore,
                        healthylevel: info.healthScore,
                        stepByStep: info.analyzedInstructions.map(obj => obj.steps.map(obj2 => obj2.step)),
                        image: info.image,
                        id :info.id,
                        diets: info.diets.map((diet) => diet),
                        
                }
        })
        return apiInfo;
}

const getDbInfo = async () =>{
        return await Recipe.findAll({
                include:{
                        model: DietType,
                        atributes:['name'],
                        through:{
                                atributes:[],
                        }
                }
        })
}

const getAllRecipie = async () => {
        const apiInfo = await getApiInfo();
        const dbfInfo = await getDbInfo();
        const allInfo = apiInfo.concat(dbfInfo);
        return allInfo;
}


router.get('/recipes', async (req, res) => {
        
        const info = await getAllRecipie();
        const name = req.query.name;
        if(!name){
              return res.status(200).json(info);
        }
        const fillInfo= await info.filter(d => d.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        
        fillInfo.length ? res.status(200).json(fillInfo) : res.status(404).send("No hay coincidencias.");
     
})

router.get('/recipes/:id', async (req, res) =>{
        const id = req.params.id;
        const allRecipe = await getAllRecipie();
        if(id){
           const fillRecipe = await allRecipe.filter(element => element.id.toString() === id);
           fillRecipe.length ? res.status(200).json(fillRecipe) : res.status(404).send("No existe esa Receta");
        }
        
})

router.get('/types', async (req, res) => {
        const allData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

        const diet = allData.data.results.map(elemento => elemento.diets)
        const diet2 = []
        diet.map(d2 => {
             for(var i=0;i<d2.length; i++){
                     diet2.push(d2[i]);
                  //return d2[i];
             }
         })
        diet2.forEach(element => {
           if(element){     
            DietType.findOrCreate({
                  where: {name: element}
           })
        }
        });
        const allDiet = await DietType.findAll();
        res.json(allDiet);

})

   
router.post('/recipe', async (req, res) => {
       
        try{
        let {
                name, 
                score,
                resume,
                stepByStep,
                healthylevel,
                image,
                //createdInDb,
                diets, /*??*/
        } = req.body;

        let newRecipe= await Recipe.create({
                name, 
                score,
                resume,
                stepbystep: stepByStep,
                healthylevel,
                image,
                //createdInDb
        })

        let arreglo= Array.isArray(diets) ? diets: [diets];

        let dietDb = await DietType.findAll({
                where:{
                        name:{
                                [Op.in] : arreglo,
                                
                        }
                }
        })
        newRecipe.addDietType(dietDb);
        res.send("Receta Cargada con exito");
      } catch (error) {
                console.log(error)
        }
})


router.get('/', async (req, res) =>{
        // const info = await getAllRecipie();
        // res.status(200).json(info);
        res.send("<h1>Hola</h1>")
})


module.exports = router;
