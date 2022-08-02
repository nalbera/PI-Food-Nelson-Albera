const axios = require('axios').default;
const {Recipe, DietType} = require('../db');

const Sequelize = require('sequelize');

const { API_KEY } = process.env;

const Op = Sequelize.Op;


const getApiInfo = async () =>{
    try{
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
    }catch(err){
            console.log(err);
    }
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

const getAllDataApi = async () => {
        const allData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

        return allData;
}

module.exports = {
    getAllRecipie,
    getAllDataApi,
};