import React from 'react';
import './App.css';
import CardDeck from './recommendation/CardDeck';
import SearchBar from './search/SearchBar';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      recommendations: []
    };

    this.setRecommendations = this.setRecommendations.bind(this);
  }

  setRecommendations(new_rec) {
    this.setState({recommendations: new_rec});
  }

  render() {
    return (
      <div className="App container-fluid">
        <SearchBar newRecommendations={this.setRecommendations}/>     
        <CardDeck recommendations={this.state.recommendations} />
      </div>
    );
  }

}

export default App;
