import React from 'react';
import Container from '../components/container';
import Footer from '../components/footer';
import {withRouter} from 'next/router'
import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image'

import chicaPic from '../public/img/chica.png'
import confusedPic from '../public/img/confused.png'
import programmingPic from '../public/img/programming.png'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSiteChange = this.onSiteChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state= {
      username: "",
      site: "mal"
    }
  }

  onUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  onSiteChange(event) {
    this.setState({site: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.state.username != null && this.state.username.length > 3)
      this.props.router.push(`${this.state.site}/${this.state.username}`)
  }

  render() {

    return (
      <Container>
        <Head>
          <title>Maki - Anime Recommendations</title>
          <meta
            name="description"
            content="Get personalized anime recommendations based on your MyAnimeList or Anilist profile."
          />
        </Head>
        <div className="front">
          <video autoPlay muted loop>
            <source src="/video/main.mp4" type="video/mp4" alt="Anime sunrise viewed from a japaneese temple"/>
          </video>
          <div className='gradient'/>

          <div className='nav link'>
            <Link href="/">Home</Link>
            <Link href="https://docs.makichan.xyz">Documentation</Link>
            <Link href="https://github.com/rickycorte/maki-web/discussions">Community</Link>
          </div>

          <div className="search">
            
              <form className="container" onSubmit={this.onSubmit}>
                <div className='col'>
                    <select className="fill" value={this.state.site} onChange={this.onSiteChange}>
                      <option value="mal">MyAnimeList</option>
                      <option value="anilist">Anilist</option>
                    </select>
                </div>
                <div className='col-fill'>
                  <input className="fill" type="text" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange}/>
                </div>
                <div className='col'>
                  <button type="submit">Recommend me!</button>
                  </div>
              </form>
          </div>
        </div>

        <div className="f-container columns">
          <div className="column is-centered is-vcentered">
            <Image src={chicaPic} alt="Chika Fujiwara from Love is War"/>
          </div>
          <div className="column is-centered hello">
            <h1 className='is-size-1 is-center-mobile'>Get your anime recommendations!</h1>
            <p>
              Tired of <b>looking for anime recommendations</b> on Reddit or in some other site? 
              Maki is a fully automated recommender system that is able to <b>generate personalized anime recommendations</b> in just a couple of seconds.
            </p>
            <h2 className='is-size-4 mt-6'>What does this mean?</h2>
            <p>
              Maki learns to suggest personalized recommendations using your existing anime list on MyAnimeList or Anilist,no extra step is needed to use Maki, just a public anime list!<br/>
              You can stop searching for generic recommended anime online, with Maki you get recomemndations generated just for you!
            </p>
            <h2 className='is-size-4 mt-6'>I&apos;m looking for a specific genre</h2>
            <p>
              You can ask Maki to generate recommendations only for the genre you want. You can also get &quot;cultured&quot; recommendations that you cannot find anywhere else!
            </p>
          </div>
        </div>
        <div className='darker'>
          <div><h2 className='has-text-centered is-size-3'>ANIME DATABASE</h2></div>
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">MyAnimeList Anime</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Anilist Anime</p>
                <p className="title">N/A</p>
              </div>
            </div>
          </nav>

          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">TV</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Movie</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">ONA</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">OVA</p>
                <p className="title">N/A</p>
              </div>
            </div>
          </nav>
        </div>

        <div className="f-container columns">
          <div className="column is-centered is-vcentered">
            <Image src={confusedPic} alt="Anime girl surrounded by question marks"/>
          </div>
          <div className="column is-centered hello is-vcentered">
            <h2 className='is-size-1 is-center-mobile'>How it works?</h2>
            <p>  
              Maki is backed by a powerful algorithm that is updated every day with all the user lists available in the database.
              This means that you always get up-to-date and meaningful recommendations based on all the data available to Maki!
            </p>
            <h3 className='is-size-4 mt-6'>Why I did not get the perfect recommendations?</h3>
            <p>
              Maki is a fully automated system that works without human supervision.
              It make take a while to learn how to give you proper recommendations and it will never be perfect, afterall its just an algorithm.
            </p>
            <h3 className='is-size-4 mt-6'>What data does Maki use?</h3>
            <p>
              Maki collects and uses only public user lists. No other data is collected and used to generate recommendations.
            </p>
          </div>
        </div>

        <div className='darker'>
          <div><h1 className='has-text-centered is-size-3'>USER DATABASE</h1></div>
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Total list entries</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">MyAnimeList Users</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Anilist Users</p>
                <p className="title">N/A</p>
              </div>
            </div>
          </nav>

          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Most popular format</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Most popular genre</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Average Score</p>
                <p className="title">N/A</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Average list size</p>
                <p className="title">N/A</p>
              </div>
            </div>
          </nav>

        </div>

        <div className="f-container columns">
          <div className="column center is-centered is-vcentered">
            <Image src={programmingPic} alt="Anime girl holding a laptop and a C book"/>
          </div>
          <div className="column is-centered hello is-vcentered">
            <h2 className='is-size-1 is-center-mobile'>Maki for developers</h2>
            <p>  
              Maki is the only anime recommender system that offers a <b>free REST API</b>! If you are intrested to use Maki in your project checkout the documentation!
            </p>
            <h3 className='is-size-4 mt-6'>Why do you offer a free API?</h3>
            <p>
              To allow developers to improve and offer new features in their own anime-related projects!
            </p>
            <h3 className='is-size-4 mt-6'>Where is the catch?</h3>
            <p>
              Maki is not monetized and to keep costs low it runs on low end hardware, it may slow down on heavy load.
            </p>
          </div>
        </div>

        <Footer></Footer>
        </Container>
    )
  }
}

export default withRouter(HomePage)