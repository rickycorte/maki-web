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
        All you need is a public list on <a href="https://myanimelist.com">MyAnimeList</a> or <a href="https://anilist.co">AniList</a>.
      </>
    ),
  },
  {
    title: 'Easy to Use',
    icon: "self_improvement",
    description: (
      <>
        Scroll back to beginning of the page and try!
      </>
    ),
  },
  {
    title: '"Cultured" Animes',
    icon: "block",
    color: "#BF2326",
    description: (
      <>
        Yes, they are exactly what you are thinking!
      </>
    ),
  },
  {
    title: 'Developer Friendly',
    icon: "code",
    description: (
      <>
        Maki is also a public API open to everyone! If you are intrested check our <a href="/docs">documentation</a>.
      </>
    ),
  },
  {
    title: '100% Free',
    icon: "volunteer_activism",
    description: (
      <>
        If you like this project or use the API you may consider a donation to help keep Maki up and running.
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
    <section className={styles.features} style={{transform: "translateY(-100px)"}}>
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
