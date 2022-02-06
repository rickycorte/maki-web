import React from 'react';
import styles from './HomepageFeatures.module.css';


export default function HomepageFocus({title, desc, img}) {
  return (
    <section className={styles.features} style={{marginBottom: "50px", transform: "translateY(-140px)", paddingBottom: "15px"}}>
      <div className="container">
        <div className="row">
            <div className="col col--4">
              <img src={img} style={{display: "block", margin: "0 auto"}}></img>
            </div>
            <div className="col col--6" style={{display: "flex", alignItems: "center"}}>
              <div>
                <h1 className={styles.big_title}>{title}</h1>
                <p className={styles.focus_paragraph}>{desc}</p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
