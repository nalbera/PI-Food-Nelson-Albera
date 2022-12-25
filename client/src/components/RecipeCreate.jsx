import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getRecipeType} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/RecipeCreate.module.css';


function RecipeCreate() {
        const dispatch = useDispatch();
        const types = useSelector((state) => state.recipeTypes)
        const history = useHistory();
        const [err, setErr] = useState({});

        const [btnSend, setBtnSend] = useState(false);
       
        /****control de errores */
        function validar(input){
                let err = {};
                if(!input.name){
                        err.name="Debe ingresar un Nombre.";
                        setBtnSend(false);
                }else if(!input.resume){
                        err.resume="Debe ingresar un Resumen.";
                        setBtnSend(false);
                }else{
                        setBtnSend(true);
                }
                return err;
        }
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
                if(!input.diets.length){
                        return alert("Debe cargar tipo de dieta")
                }else{
                    if(!input.image) input.image="https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png"
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
        }
        
        useEffect(() => {
                dispatch(getRecipeType());
        },[dispatch]);

        
        return (
                <div className={styles.contenedor}>
                        <div className={styles.box}>
                        <h1>Create New Recipe</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                                <div>
                                        <label>Name:</label>
                                        <input type="text" value={input.name} name="name"onChange={(e) => handleChange(e)}/>
                                        {
                                                err.name && (
                                                        <p className={styles.error}>{err.name}</p>
                                                )
                                        }
                                </div>
                                <div>
                                        <label>Score:</label>
                                        <input type="text" value={input.score} name="score"onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                        <label>Healthy Level:</label>
                                        <input type="text" value={input.healthylevel} name="healthylevel"onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                        <label>Resume:</label>
                                        <input type="text" value={input.resume} name="resume"onChange={(e) => handleChange(e)}/>
                                        {
                                                err.resume && (
                                                        <p className={styles.error}>{err.resume}</p>
                                                )
                                        }
                                </div>
                                <div>
                                        <label>Steps:</label>
                                        <input type="text" value={input.stepByStep} name="stepByStep" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                        <label>Image:</label>
                                        <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                        <label>Diet Type:</label>
                                        <select onChange={(e) => handleSelect(e)} name="diets">
                                                {
                                                       types.map((t) => (
                                                            <React.Fragment key={t.id}>
                                                                <option value={t.name} key={t.id}>{t.name}</option>
                                                            </React.Fragment>
                                                        ))
                                                        
                                                }
                                        </select>
                                        
                                </div>
                                <div className={styles.footer}>
                                        <div>
                                               <button className={styles._rcpbotton} type="submit" disabled={!btnSend}>Submit</button>
                                        </div>
                                        <div>
                                                <Link to='/home'><button>Back</button></Link>
                                        </div>
                                </div>

                        </form>
                        </div>
                </div>
        )
}

export default RecipeCreate
