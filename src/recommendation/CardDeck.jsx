import React from 'react';
import Card from './Card';
import './CardDeck.css';

class CardDeck extends React.Component {

    render() {

        let recom = this.props.recommendations;
        let deck_body;
        if(recom.length > 0) {
            deck_body = recom.map((anime_data, i) => { return <Card anime={anime_data} />; })
        }
        else {
            deck_body = (
                <div className="position-absolute top-50 start-50 translate-middle text-light text-center">
                    <h1 className="text-center text-light">Hi, sen(pi) ~</h1>
                    <span className="text-muted">Write your username above and enjoy your recommendations!</span>
                </div>
            );
        }

        return <div className="CardDeck row">{deck_body}</div>;
    }
}

export default CardDeck;