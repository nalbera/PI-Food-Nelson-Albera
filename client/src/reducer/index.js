
const initialState = {
        recipes: [],
        allRecipes: [],
        recipeTypes: [],
        detail: [],
}

function rootReducer (state = initialState, action){
        switch (action.type) {
                case "GET_RECIPES":
                        return{
                                ...state,
                                recipes: action.payload,
                                allRecipes : action.payload
                        }
                case "FILTER_BY_DIET_TYPES":
                        const allRecipes = state.allRecipes
                        const dietsAPI = []
                        const dietsDB = []
                        allRecipes.forEach(e => {
                            if (e.hasOwnProperty('diets') && e.diets.includes(action.payload)) {
                                dietsAPI.push(e)
                            }
                        })
            
                        allRecipes.forEach(e => {
                            if (e.hasOwnProperty('DietTypes') && e.DietTypes.map(c => c.name === action.payload)) {
                                dietsDB.push(e)
                            }
                        })
                        const find = dietsAPI.concat(dietsDB)
                        if (find.length) {
                            return {
                                ...state,
                                recipes: find
                            }
                        };
                        break;
                        
                case "ORDER_BY_SCORE":
                        let orderArray = action.payload==="asc" ? 
                        state.allRecipes.sort(function (a,b){
                                if(a.score > b.score){
                                        return 1;
                                }
                                if(b.score > a.score){
                                        return -1;
                                }
                                return 0;
                        }) :
                        state.allRecipes.sort(function (a,b){
                                if(a.score > b.score){
                                        return -1;
                                }
                                if(b.score > a.score){
                                        return 1;
                                }
                                return 0;
                        });
                        return{
                                ...state,
                                recipes:orderArray
                        }
                
                case 'ORDER_BY_ALPHA':
                        let alphaArr = action.payload === 'A-Z' ? state.allRecipes.sort(function (a, b) {
                                  if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                                return 1;
                                  };
                                  if (a.name.toLowerCase() < b.name.toLowerCase()) {
                                        return -1;
                                  };
                                  return 0;
                        }) : state.allRecipes.sort(function (a, b) {
                                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                        return -1;
                                };
                                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                                        return 1;
                                };
                                return 0;
                        });
                        return {
                                ...state,
                                recipes: alphaArr
                        }

                case "GET_NAME_RECIPE":
                         return{
                                ...state,
                                recipes : action.payload,
                        }
                case "POST_RECIPE":
                        return{
                                ...state,
                        }
                case "GET_RECIPE_TYPE":
                        return{
                                ...state,
                                recipeTypes: action.payload,
                        }
                case "GET_DETAIL":
                        return{
                                ...state,
                                detail : action.payload,
                        }
                 default:{

                         return state;
                 }
        }

}

export default rootReducer;