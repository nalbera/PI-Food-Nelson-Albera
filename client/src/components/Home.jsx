import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllRecipes, orderByAlphabetics, orderByScore, setFilterByDietTypes } from "../actions";
import {NavLink} from 'react-router-dom';
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import styles from '../styles/Home.module.css';

export default function Home(){

        const dispatch = useDispatch();
        const allRecipes = useSelector((state) => state.recipes)//GLOBAL
        const [actualPage, setActualPage] = useState(1); //currentpage
                           // eslint-disable-next-line 
        const [recipeXPage, setRecipeXPage] = useState(9);
              // eslint-disable-next-line
        const [orden,setOrden] = useState('');//LOCAL
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
                            <NavLink to ='/recipe'><button>Nueva Receta</button></NavLink>
                         </div>
                            <Paged recipeXPage={recipeXPage} allRecipes={allRecipes.length} paginado={paginado} />
                            <button onClick={e => {handleClick(e)}}>Recargar Recetas</button>
                            <span className={styles.cards}>
                            {
                             
                             actualRecipes && actualRecipes?.map(element => {
                                     
                                     return(
                                        <React.Fragment key={element.id}>     
                                        <div>
                                            <NavLink className={styles.a} to={'/recipes/' + element.id}>
                                               <Card image={element.image} name={element.name} diet={element.createdInDb ? element.DietTypes.map((dt) => dt.name) : element.diets}  key={element.id}/>
                                    
                                            </NavLink>
                                        </div>
                                        </React.Fragment>
                              );
                            })}
                          </span> 
                        </div>
                </div>
        )

}