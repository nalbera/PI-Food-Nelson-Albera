import axios from 'axios';

export function getAllRecipes(){
        return async function(dispatch){
                var json = await axios.get('http://localhost:3001/recipes');
                
                return dispatch({
                        type: "GET_RECIPES",
                        payload: json.data
                })
        }
}

export function getNameRecipe(payload){
        return async function(dispatch){
                try{
                        var json = await axios.get('http://localhost:3001/recipes?name='+payload);
                        return dispatch({
                                type: "GET_NAME_RECIPE",
                                payload: json.data
                        })
                }catch(error){
                        console.log(error);
                }

        }
}

export function getRecipeType(){
        return async function (dispatch){
                var rTypes = await axios.get('http://localhost:3001/types');
                return dispatch({
                        type: "GET_RECIPE_TYPE",
                        payload: rTypes.data,
                })
        }
}

export function postRecipe(payload){
        return async function (dispatch){
                const response = await axios.post('http://localhost:3001/recipe',payload)
                return response;
        }
}

export function setFilterByDietTypes(payload){
        //console.log(payload);
        return{
                type: "FILTER_BY_DIET_TYPES",
                payload
        }
}

export function orderByScore(payload){
        return{
                type: "ORDER_BY_SCORE",
                payload
        }
}

export function orderByAlphabetics(payload) {
        return {
            type: 'ORDER_BY_ALPHA',
            payload
        }
}

export function getDetail(id){
        return async function(dispatch){
                try{
                        var detail = await axios.get('http://localhost:3001/recipes/'+id);
                        return dispatch({
                                type: "GET_DETAIL",
                                payload: detail.data
                        })
                }catch(error){
                        console.log(error);
                }
        }
}