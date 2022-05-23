import React from 'react';
import AnimeCard from '../components/animecard';
import Container from '../components/container';
import GradientTitle from '../components/grandietTitle';
import Grid from '../components/grid';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props

  }

  render() {

    return (
      <Container><GradientTitle><h3 style={{height:"100%"}}>Hello there :3</h3></GradientTitle></Container>
    )
  }
}

export default HomePage