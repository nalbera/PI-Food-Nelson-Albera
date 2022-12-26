import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Detail.module.css";

function Detail(props) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  
  
  return (
    <>
      {recipe.length > 0 ? (
        <div className={styles.card}>
          <section className={styles.principal}>
            <img src={recipe[0].image} alt="" width="200px" height="200px" />
            <div className={styles.info}>
              <div className={styles.title}>
                <h3>{recipe[0].name}</h3>
              </div>
              <div className={styles.resume}>
                <p>Resume</p>
                <textarea name="" id="" cols="60" rows="6" readOnly>
                        {recipe[0].resume.replace(/<[^>]*>?/g, '')}
                </textarea>
              </div>
              <div className={styles.pastpast}>
                <p>Step by Step</p>
                <textarea name="" id="" cols="60" rows="6" readOnly>
                        {!recipe[0].createdInDb ? recipe[0].stepByStep?.map((step) => step) : recipe[0].stepbystep}
                </textarea>
              </div>
            </div>
          </section>
          <section className={styles.footer}>
            <section className={styles.diettype}>
              <div>
                <h3>Diet:</h3>
                <h4>
                    {!recipe[0].createdInDb ? recipe[0].diets?.map((diet) => diet) : recipe[0].DietTypes.map((diet) => diet.name)}
                </h4>
              </div>
            </section>
            <section className={styles.level}>
              <div>
                <h3>Level:</h3>
                <h4>
                   {recipe[0].healthylevel}
                </h4>
              </div>
            </section>
            <section className={styles.score}>
              <div>
                <h3>Score:</h3>
                <h4>
                  {recipe[0].score}
                </h4>
              </div>
            </section>
            <section className={styles.button}>
              <div>
                <Link to = '/home'>
                   <button>Back...</button>
                </Link>
              </div>
            </section>
          </section>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}

export default Detail;
