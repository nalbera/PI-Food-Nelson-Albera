import React from "react";
import styles from '../styles/Card.module.css';

export default function Card({image, name, diet}){
        return(
                <div className={styles.card}>
                        <div>
                                <h4 className={styles.title}>{name}</h4>
                                <img src={image} alt="" width="200px" height="200px"/>
                                <h6 className={styles.descript}>{diet.length > 0 ? diet : <h6>No category</h6>}</h6>
                        </div>
                        
                        
                </div>
        );
}