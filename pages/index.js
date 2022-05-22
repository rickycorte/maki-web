import React from 'react';
import AnimeCard from '../components/animecard';
import Container from '../components/container';
import GradientTitle from '../components/grandietTitle';
import Grid from '../components/grid';

class RecommendatiosPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props

    this.state = {
      site: "anilist",
      username: "xDevily",
      recommendations: null,
      filters: [],
    }
  }

  fetch_data() {
    console.log("Starting recommendation fetch")
    let url = `https://api.makichan.xyz/anime/${this.state.site}/${this.state.username}?k=24`;

    //add filters to the url
    this.state.filters.forEach((filter) => {
      if (filter.enabled)
        url += `&${filter.name}=${filter.value}`;
    });
    console.log(`Calling API: ${url}`);

    fetch(url)
      .then(response => {
        switch (response.status) {
          case 200:
            response.json().then((data) => this.setState({ recommendations: data["recommendations"], }));
            break;
          case 429:
            console.log("Rate limit hit")
            break;
          case 400:
            response.json().then((data) => console.log(data["error"]));
            break;
          default:
            console.log(response)
            //this.show_error("Right now I'm unable to reply to you. Retry later!");
            break;
        }

      }).catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.fetch_data()
  }

  get_page_content() {
    if(this.state.recommendations == null) {
      return  (<h1>Loading...</h1>)
    } else {
      return (
        <Grid>
          <GradientTitle><h3 style={{height:"100%"}}>DEMO PAGE. NOT INTERACTABLE</h3></GradientTitle>
          {this.state.recommendations.map(data => {return (<AnimeCard key={data.id} entry={data}>{data.title} site={this.state.site}</AnimeCard>)})}
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