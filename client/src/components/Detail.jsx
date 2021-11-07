import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { getDetail } from "../actions/index";
import { useDispatch, useSelector } from "react-redux"
import styles from '../styles/Detail.module.css';

function Detail(props) {
        
        const dispatch = useDispatch();
        useEffect(() =>{
                dispatch(getDetail(props.match.params.id))
        },[dispatch])

        const recipe = useSelector((state) => state.detail)
        console.log(recipe);
        return (
                <div className={styles.contenedor}>
                        {
                                recipe.length > 0 ? 
                                        <div className={styles.box}>
                                                <h1>{recipe[0].name}</h1>
                                                <img src={recipe[0].image} alt="" width="200px" height="200px"/>
                                                <p>Resumen: {recipe[0].resume.replace(/<[^>]*>?/g, '')}</p>
                                                <h5>Tipo Dieta: {!recipe[0].createdInDb ? recipe[0].diets?.map((diet) => diet) : recipe[0].DietTypes.map((diet) => diet.name)}</h5>
                                                <h5>Puntuacion: {recipe[0].score}</h5>
                                                <h5>Nivel Saludable: {recipe[0].healthylevel}</h5>
                                                <p>Paso a Paso: {!recipe[0].createdInDb ? recipe[0].stepByStep?.map((step) => step) : recipe[0].stepbystep}</p>
                                                <Link to = '/home'>
                                                        <button>Volver</button>
                                                </Link>
                                        </div> : <p>Cargando....</p>
                        }
                </div>
        )
}

export default Detail


