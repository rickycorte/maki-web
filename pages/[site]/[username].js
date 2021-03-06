import React from 'react';
import Link from 'next/link';
import AnimeCard from '../../components/animecard';
import Container from '../../components/container';
import GradientTitle from '../../components/grandietTitle';
import Grid from '../../components/grid';
import ErrorPageBody from '../../components/errorPageBody'

import { supported_sites, anime_genres} from '../../recommendations.config';
import Footer from '../../components/footer';

import {withRouter} from 'next/router'
import Head from 'next/head';

function isValidUsername(username)
{
  return username.match(/^[a-zA-Z0-9_-]{3,30}$/g)
}

function isValidSite(site) {
  return supported_sites.includes(site)
}

export async function getServerSideProps(context) {

  const { site, username } = context.params
  const {genre} = context.query


  console.log("Starting recommendation fetch")
  let url = `https://api.makichan.xyz/anime/${site}/${username}?k=32`

  if(genre != undefined)
    url += `&genre=${genre}`

  console.log(`Calling API: ${url}`);

  let recommendations = null;
  let error_message = null

  if( isValidSite(site) && isValidUsername(username))
  {
    let response = await fetch(url)
    switch (response.status) {
        case 200:
          let data = await response.json()
          recommendations = data["recommendations"]
          break;
        case 429:
          console.log("Rate limit hit")
          error_message = "Please slow down a bit, I can't follow you!"
          break;
        case 400:
          console.log(await response.json())
          error_message = "Something went wrong with your request! Please check your data!"
          break;
        default:
          console.log(response)
          error_message = "Right now I'm unable to reply to you. Retry later!";
          break;
      }
  } else {
    if(!isValidUsername(username))
      error_message = "Invalid username"
    if(!isValidSite(site))
      error_message = `Invalid tracking site. Must be one of: ${supported_sites}`
  }

  return {
    props: {
      site: site,
      username: username,
      recommendations: recommendations,
      error_message: error_message,
      genre: genre == undefined ? "" : genre,
    }, // will be passed to the page component as props
  }
}


class RecommendatiosPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props

    this.state = {
      username: props.username,
      genre: props.genre
    }
  }

  getPushUrl(site, username, genre)
  {
    let url = `/${site}/${username}`
    if(genre != null && genre != "null")
      url += `?genre=${genre}`

    return url
  }

  onSiteChange = instance =>  e => 
  {
    e.preventDefault()
    instance.props.router.push(this.getPushUrl(e.target.value, instance.props.username, instance.props.genre))
  }

  onUsernameChange = instance => e => {
    e.preventDefault()
    instance.setState({username: e.target.value})
  }

  onUsernameSubmit = instance => e => {
    e.preventDefault()
    instance.props.router.push(this.getPushUrl(instance.props.site, instance.state.username, instance.props.genre))
  }

  onChangeGenre = instance =>  e => {
    e.preventDefault()
    instance.props.router.push(this.getPushUrl(instance.props.site, instance.state.username, e.target.value))
  }

  get_page_content() {
    if (this.props.error_message != null) {
      return (
      <Container>
          <GradientTitle>
              <Link href="/">
                  <a style={{width: "100%", textAlign: "center"}}>
                      <h3 style={{width: "100%", textAlign: "center"}}>Maki</h3>
                  </a>
              </Link>
          </GradientTitle>
        <ErrorPageBody message={this.props.error_message}></ErrorPageBody>
      </Container>
      )
    }
    if(this.props.recommendations == null) {
      return  (<h1>Loading...</h1>)
    } else {
      return (
        <Grid>
          <GradientTitle>
          <Container>
            <Link href="/">
                      <a style={{width: "100%", textAlign: "center"}}>
                          <h3 style={{width: "100%", textAlign: "center", marginBottom: "0px"}}>Maki</h3>
                      </a>
              </Link>
              <div className="rowFull" style={{height: "100%", width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between", flexDirection:"row"}}>

                <div className="rowFull"></div>
                <div style={{height: "100%", display: "flex", flexWrap: "wrap", alignItems:"center"}}>
                  <div style={{display: "flex", alignItems:"center"}}>
                    <h3 style={{height:"100%"}}>Hi</h3>
                    <form onSubmit={this.onUsernameSubmit(this)}>
                      <input value={this.state.username} style={{height:"30px"}} onChange={this.onUsernameChange(this)}></input>
                    </form>
                  </div>
                  <div style={{height: "100%", display: "flex", alignItems:"center"}}>
                    <h3>from</h3>
                    <select name="site" id="site" style={{marginLeft: "10px",marginRight:"10px"}} onChange={this.onSiteChange(this)} value={this.props.site}>
                      <option value="anilist">Anilist</option>
                      <option value="mal">MyAnimeList</option>
                    </select>
                  </div>
                </div>

                <div style={{display: "flex", alignItems:"center", textAlign: "center"}}>
                  <select style={{height:"30px"}} className="pad_mobile" name="genre" id="genre" onChange={this.onChangeGenre(this)} value={this.props.genre}>
                    <option value="null">Filter by Genre</option>
                    {anime_genres.map(i => ( <option key={i.value} value={i.value}>{i.text}</option>))}
                  </select>
                </div>

              </div>
            </Container>
          </GradientTitle>
          {this.props.recommendations.map(data => {return (<AnimeCard key={data.id} entry={data} site={this.props.site}>{data.title}</AnimeCard>)})}
        </Grid>
      )
    }
  }

  render() {

    return (
      <Container>
        <Head>
          <title>Recommendations | Maki</title>
          <meta
              name="description"
              content="Recommended anime from Maki API"
          />
        </Head>
        {this.get_page_content()}
        <Footer></Footer>
        </Container>
    )
  }
}

export default withRouter(RecommendatiosPage)
