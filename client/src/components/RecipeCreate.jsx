import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getRecipeType} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/RecipeCreate.module.css';

/****control de errores */
function validar(input){
        let err = {};
        if(!input.name){
                err.name="Debe ingresar un Nombre.";
        }else if(!input.resume){
                err.resume="Debe ingresar un Resumen."
        }

        return err;
}

function RecipeCreate() {
        const dispatch = useDispatch();
        const types = useSelector((state) => state.recipeTypes)
        const history = useHistory();
        const [err, setErr] = useState({});

        const [input, setInput] = useState({
                name: "",
                score:"",
                healthylevel:"",
                resume: "",
                stepbystep:"",
                image:"",
                diets:[],
        })

        function handleChange(e){
                setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                })
                console.log(input);
                setErr(validar({
                        ...input,
                        [e.target.name]: e.target.value,
                }))
                
        }

        

        function handleSelect(e){
               
                setInput({
                        ...input,
                        diets: [...input.diets, e.target.value],
                })
        }

        function handleSubmit(e){
                e.preventDefault();
                console.log(input);
                //Object.entries(input.diets).map((data) => input.diets.push(data[0]));
                dispatch(postRecipe(input));
                alert("Receta creada")
                setInput({
                        name: "",
                        score:"",
                        healthylevel:"",
                        resume: "",
                        stepbystep:"",
                        image:"",
                        diets:[],  
                })
                history.push('/home');
        }
        
        useEffect(() => {
                dispatch(getRecipeType());
        },[]);

        
        return (
                <div className={styles.contenedor}>
                        <div className={styles.box}>
                        <h1>Crear Receta Nueva</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                                <div>
                                        <label>Nombre:</label>
                                        <input type="text" value={input.name} name="name"onChange={(e) => handleChange(e)}/>
                                        {
                                                err.name && (
                                                        <p className="error">{err.name}</p>
                                                )
                                        }
                                </div>
                                <div>
                                        <label>Puntaje:</label>
                                        <input type="text" value={input.score} name="score"onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                        <label>Nivel Saludable:</label>
                                        <input type="text" value={input.healthylevel} name="healthylevel"onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                        <label>Resumen:</label>
                                        <input type="text" value={input.resume} name="resume"onChange={(e) => handleChange(e)}/>
                                        {
                                                err.resume && (
                                                        <p className="error">{err.resume}</p>
                                                )
                                        }
                                </div>
                                <div>
                                        <label>Pasos:</label>
                                        <input type="text" value={input.stepByStep} name="stepByStep" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                        <label>Imagen:</label>
                                        <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                        <label>Tipo Dieta:</label>
                                        <select onChange={(e) => handleSelect(e)} name="diets">
                                                {
                                                       types.map((t) => (
                                                            <option value={t.name}>{t.name}</option>
                                                        ))
                                                        
                                                }
                                        </select>
                                        
                                </div>
                                <div className={styles.footer}>
                                        <div>
                                                <button type="submit">Crear Receta</button>
                                        </div>
                                        <div>
                                                <Link to='/home'><button>Volver</button></Link>
                                        </div>
                                </div>
                        
                        </form>
                        </div>
                </div>
        )
}

export default RecipeCreate
