import React from 'react';
import AnimeCard from '../../components/animecard';
import Container from '../../components/container';
import GradientTitle from '../../components/grandietTitle';
import Grid from '../../components/grid';

export async function getServerSideProps(context) {

  const { site, username } = context.params

  console.log("Starting recommendation fetch")
  let url = `https://api.makichan.xyz/anime/${site}/${username}?k=24`;

  console.log(`Calling API: ${url}`);

  let recommendations = null;
  let error_message = null

  let response = await fetch(url)
    switch (response.status) {
        case 200:
          let data = await response.json()
          recommendations = data["recommendations"];
          break;
        case 429:
          console.log("Rate limit hit")
          break;
        case 400:
          //response.json().then((data) => console.log(data["error"]));
          break;
        default:
          console.log(response)
          //this.show_error("Right now I'm unable to reply to you. Retry later!");
          break;
      }

  return {
    props: {
      site: site,
      username: username,
      recommendations: recommendations,
      error_message: error_message
    }, // will be passed to the page component as props
  }
}


class RecommendatiosPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props

  }

  get_page_content() {
    if(this.props.recommendations == null) {
      return  (<h1>Loading...</h1>)
    } else {
      return (
        <Grid>
          <GradientTitle><h3 style={{height:"100%"}}>Hi {this.props.username}!</h3></GradientTitle>
          {this.props.recommendations.map(data => {return (<AnimeCard key={data.id} entry={data}>{data.title} site={this.props.site}</AnimeCard>)})}
        </Grid>
      )
    }
  }

  render() {

    return (
      <Container>{this.get_page_content()}</Container>
    )
  }
}

export default RecommendatiosPage