import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import HomepageFocus from '../components/HomepageFocus';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.discovery)}>
      <div className="container">
        <h1 className="hero__title" style={{color: "white"}}>Discover New Anime</h1>
        
        <input type="text" style={{marginBottom: "30px"}}></input>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{marginRight: "5px", minWidth: "200px"}}
            >
            MyAnimeList 
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{marginLeft: "5px", minWidth: "200px"}}>
            Anilist
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFocus 
          title="Why Yasy?"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae ex at lacus egestas elementum nec quis nulla.Suspendisse potenti. Phasellus eu tellus efficitur, hendrerit tortor at, finibus est.Quisque blandit dolor quis erat hendrerit porttitor."
          img="../../static/img/character_happy.png">
        </HomepageFocus>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
