import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import HomepageFocus from '../components/HomepageFocus';

function HomepageHeader() {
  const [username, set_username] = useState("");

  const preventSearchWithEmptyUsername = (ev) => {
      if (username === "") {
        ev.preventDefault()
      }
    }

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, styles.discovery)}>
      <div className="container">
        <h1 className="hero__title" style={{color: "white"}}>Discover New Anime</h1>
        
        <input type="text" style={{marginBottom: "30px"}} value={username} onChange={(ev)=> set_username(ev.target.value)}></input>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={`/search/mal/${username}`}
            onClick={preventSearchWithEmptyUsername}
            style={{marginRight: "5px", minWidth: "180px"}}
            >
            MyAnimeList 
          </Link>
          <Link
            className="button button--secondary button--lg"
            to={`/search/anilist/${username}`}
            style={{marginLeft: "5px", minWidth: "180px"}}>
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
          img={require('@site/static/img/character_happy.png').default}>
        </HomepageFocus>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
