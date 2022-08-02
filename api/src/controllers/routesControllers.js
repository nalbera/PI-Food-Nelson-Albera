const { getAllRecipie, getAllDataApi } = require('./driverConnection');

const controller = {
    getRecipes: async (req, res) => {
        
        const info = await getAllRecipie();
        const name = req.query.name;
        if(!name){
              return res.status(200).json(info);
        }
        const fillInfo= await info.filter(d => d.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        
        fillInfo.length ? res.status(200).json(fillInfo) : res.status(404).send("There are no matches.");
     
    },

    getRecipeId: async (req, res) =>{
        const id = req.params.id;
        const allRecipe = await getAllRecipie();
        if(id){
           const fillRecipe = await allRecipe.filter(element => element.id.toString() === id);
           fillRecipe.length ? res.status(200).json(fillRecipe) : res.status(404).send("There is no such recipe");
        }
    },

    getTypes: async (req, res) => {
        
        const allData = getAllDataApi();

        const diet = allData.data.results.map(elemento => elemento.diets)
        const diet2 = []
        diet.map(d2 => {
             for(var i=0;i<d2.length; i++){
                     diet2.push(d2[i]);
             }
         })
        
        const dietFilter = diet2.filter((val,index) => {
                return diet2.indexOf(val) === index;
        })

        dietFilter.forEach(element => {
           if(element){     
            DietType.findOrCreate({
                  where: {name: element}
           })
        }
        });
        const allDiet = await DietType.findAll();
        res.json(allDiet);
    },

    postRecipe:  async (req, res) => {   
        try{
           let {
                   name, 
                   score,
                   resume,
                   stepByStep,
                   healthylevel,
                   image,
                   diets,
           } = req.body;
   
           let newRecipe= await Recipe.create({
                   name, 
                   score,
                   resume,
                   stepbystep: stepByStep,
                   healthylevel,
                   image,
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
           res.status(200).send("Recipe Loaded Successfully");
         } catch (error) {
                   console.log(error)
         }
   },

   
};


module.exports = controller;