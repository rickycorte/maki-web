import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Icon from "@material-ui/core/Icon";

const FeatureList = [
  {
    title: 'Simple and Immediate',
    icon: "favorite_border",
    color: "#BF2326",
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Easy to Use',
    icon: "self_improvement",
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: '"Cultured" Animes',
    icon: "block",
    color: "#BF2326",
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: '100% Free',
    icon: "volunteer_activism",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
  {
    title: 'No Data Collected',
    icon: "lock",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({icon, title, description, color="white"}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{paddingTop: "30px"}}>
        <Icon className={styles.featureSvg} style={{color: `${color}`}}>{icon}</Icon>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h1 className={styles.big_title} style={{paddingBottom: "0px"}}>Features</h1>
        <div className="row" style={{display: "flex", justifyContent: "center"}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
