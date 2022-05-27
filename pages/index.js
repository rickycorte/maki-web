import React from 'react';
import Container from '../components/container';
import Footer from '../components/footer';
import GradientTitle from '../components/grandietTitle';
import {withRouter} from 'next/router'
import Head from 'next/head';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSiteChange = this.onSiteChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state= {
      username: "",
      site: "anilist"
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
          <title>Maki - Anime Recommender</title>
          <meta
            name="description"
            content="The first anime recommender system ready to be used and integrated anywhere."
          />
        </Head>
        <div className="front">
          <video autoPlay muted loop>
            <source src="/video/main.mp4" type="video/mp4" />
          </video>
          <div className="search">
            <GradientTitle>
                <form onSubmit={this.onSubmit}>
                  <div className='rowFull'>
                      <div className='row'>
                        <h3>Hi</h3>
                        <input style={{marginLeft: "5px", width:"100%"}} placeholder="username" value={this.state.username} onChange={this.onUsernameChange}></input>
                      </div>
                      <div className='row'>
                        <h3>from</h3>
                        <select style={{marginLeft: "5px"}} value={this.state.site} onChange={this.onSiteChange}>
                          <option value="anilist">Anilist</option>
                          <option value="mal">MyAnimeList</option>
                        </select>
                      </div>
                  </div>
                  <button type="submit">Recommend me!</button>
                </form>
            </GradientTitle>
          </div>
        </div>
        <div className="container up">
                <div className="container_body hello">
                    <h1>Hi sen(pi)~</h1>
                    <h3>Welcome to Maki! The first fully automated recommender system for anime!</h3>
                    <p>Maki is 100% free to use and integrate in any application by using its REST API, all you need is a public anime list on Anilist or MyAnimeList!</p>
                </div>
            </div>
        <Footer></Footer>
        </Container>
    )
  }
}

export default withRouter(HomePage)