import React from "react";
import styles from '../styles/Paged.module.css';

function Paged({recipeXPage, allRecipes, paginado}) {
        const pageNumbers = [];

        for(let i=1; i<=Math.ceil(allRecipes/recipeXPage); i++){
                pageNumbers.push(i);
        }

        return (
                <nav>
                        <ul className=''>
                                {
                                        pageNumbers && pageNumbers.map(num => (
                                                <li className='' key={num}>
                                                        <a onClick={() => paginado(num)}>{num}</a>
                                                </li>
                                        ))
                                }
                        </ul>
                        
                </nav>
        )
}

export default Paged
