import React from "react";
import styles from '../styles/Card.module.css';

export default function Card({image, name, diet}){
        return(
                <div className={styles.card}>
                        <div>
                                <h4 className={styles.title}>{name}</h4>
                                <img src={image} alt="" width="200px" height="200px"/>
                                <h6>{diet}</h6>
                                <div className={styles.footer}>
                                        <h3>Ver Receta</h3>
                                </div>
                        
                        </div>
                </div>
        );
}