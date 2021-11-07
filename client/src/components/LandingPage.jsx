import React from 'react';
import {Link} from 'react-router-dom';
import  styles from '../styles/LandingPage.module.css';


export default function(){
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