import React from "react";
import  styles from "../styles/Paged.module.css";

function Paged({recipeXPage, allRecipes, paginado}) {
        const pageNumbers = [];

        for(let i=1; i<=Math.ceil(allRecipes/recipeXPage); i++){
                pageNumbers.push(i);
        }

        return (
                <nav>
                        <ul className={styles.barra}>
                                {
                                        pageNumbers && pageNumbers.map(num => (
                                                <li className={styles.btnBarra} key={num}>
                                                        <button onClick={() => paginado(num)}>{num}</button>
                                                </li>
                                        ))
                                }
                        </ul>
                        
                </nav>
        )
}

export default Paged
