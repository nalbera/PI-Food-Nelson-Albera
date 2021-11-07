import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllRecipes, orderByAlphabetics, orderByScore, setFilterByDietTypes } from "../actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import styles from '../styles/Home.module.css';

export default function Home(){

        const dispatch = useDispatch();
        const allRecipes = useSelector((state) => state.recipes)

        const [actualPage, setActualPage] = useState(1); //currentpage
        const [recipeXPage, setRecipeXPage] = useState(9);
        const [orden,setOrden] = useState('');
        const indexLastRecipe = actualPage * recipeXPage;
        const indexFirstRecipe = indexLastRecipe - recipeXPage;
        const actualRecipes = allRecipes.slice(indexFirstRecipe,indexLastRecipe);//guardo todas las recetas por pagina
        const paginado = (pageNumber) =>{
                setActualPage(pageNumber);
        }

        useEffect(()=>{
                dispatch(getAllRecipes());
        },[dispatch])

        function handleClick(e){
                e.preventDefault();
                dispatch(getAllRecipes());
        }

        function handleFilterByDietType(e){
                
                dispatch(setFilterByDietTypes(e.target.value));
        }

        function handleOrderByScore(e){
                e.preventDefault();
                dispatch(orderByScore(e.target.value));
                setActualPage(1);
                setOrden(`Ordenado ${e.target.value}`);
        }

        function handleOrderByAlpha(e){
                e.preventDefault();
                dispatch(orderByAlphabetics(e.target.value));
                setActualPage(1);
                setOrden(`Ordenado ${e.target.value}`);
        }

        return(
                <div>
                        
                        <h1>Recetario</h1>
                       
                        <div>
                           <div className={styles.controls}>
                            <select onChange={e => handleOrderByScore(e)}>
                                    <option value="asc">Ascendente</option>
                                    <option value="desc">Descendente</option>
                            </select> 
                            <select onChange={e => handleOrderByAlpha(e)}>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                            </select> 
                                
                            <select onChange={e => handleFilterByDietType(e)}>
                                    <option value="gluten free">Gluten Free</option>
                                    <option value="dairy free">Dairy Free</option>
                                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                    <option value="paleolithic">Paleolithic</option>
                                    <option value="primal">Primal</option>
                                    <option value="pescatarian">Pescatarian</option>
                                    <option value="fodmap friendly">Fodmap Friendly</option>
                                    <option value="whole 30">Whole 30</option>
                            </select>
                            <SearchBar />
                            <Link to ='/recipe'><button>Nueva Receta</button></Link>
                         </div>
                            <Paged recipeXPage={recipeXPage} allRecipes={allRecipes.length} paginado={paginado} />
                            <button onClick={e => {handleClick(e)}}>Recargar Recetas</button>
                            <span className={styles.cards}>
                            {
                             
                             actualRecipes && actualRecipes?.map(element => {
                                     return(
                                        <div>
                                            <Link to={'/recipes/' + element.id}>
                                               <Card image={element.image? element.image : <img src="https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png"/>} name={element.name} diet={element.diets} />
                                    
                                 </Link>
                                </div>
                              );
                            })}
                          </span> 
                        </div>
                </div>
        )

}