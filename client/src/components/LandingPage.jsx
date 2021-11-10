import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import  styles from '../styles/LandingPage.module.css';
import { useDispatch } from "react-redux";
import { getAllRecipes } from '../actions';


export default function LandingPage(){
   const dispatch = useDispatch();
    useEffect(() => {
             dispatch(getAllRecipes()) 
   }, [dispatch]);
   
   return(
                <div className={styles.bkg}>
                     <div className={styles.container}>
                        <h1 className={styles.title}>Recetario</h1>
                        <Link to='/home'>
                              <button className={styles.boton}>Ingresar</button>  
                        </Link>
                     </div>
                </div>
        )
}