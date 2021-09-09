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
      description="Tired of asking anime recommendations? Yasu is the first fully automated platform and public API that allows you to get personalized recommendations in a metter os seconds!">
      <HomepageHeader />
      <main>
        <HomepageFocus 
          title="Why Yasy?"
          desc={(
            <>Searching new anime to watch could be boring and time consuming, you need to scroll hundreds of titles or posts or ask someone else and wait for a reply.
            <br/><br/>Yasu is a <b>step forward</b> compared to big anime tracking sites like MyAnimeList that rely purely on users because maks <b>fully automated recommendations accessible to anyone</b>: users and developers.
            </>
          )}
          img={require('@site/static/img/character_happy.png').default}>
        </HomepageFocus>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
