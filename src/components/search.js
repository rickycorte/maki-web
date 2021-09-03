import React from 'react';
import {Switch, Route, useRouteMatch, useParams} from '@docusaurus/router'


class ResultPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
            <h1>Hi there {this.props.username} looking for {this.props.site}?</h1>

            <h2>Too bad a raccoon ate {this.props.site}</h2>
            </>
        );
    }
}


function ErrorPage ({img, title, message}){
    if (message == null){
        message = "Something went wrong with your request!"
    }
    if(title == null) {
        title = "Wait Sen(pi)!?!?"
    }
    if(img == null) {
        img = require('@site/static/img/character_frightened.png').default
    }

    return (
        <div className="container" style={{height: "100%"}}>
            <div className="row" style={{height:"100%", display:'flex', alignItems: 'center', justifyContent: "center"}}>
                <div className="col col--4">
                    <img src={img} style={{display: "block", margin: "0 auto"}}></img>
                </div>
                <div className="col col--4" style={{textAlign: "center"}}>
                    <h1>{title}</h1>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

function DeckPage () {
    let {site, username} = useParams();
    let body;

    let supported_sites = ["mal", "anilist"]

    if (supported_sites.includes(site)){
        body = (<ResultPage username={username} site={site}></ResultPage>)
    } else {
        body =  (<ErrorPage message="Unsupported anime tracking site!" />)
    }

    return body

}



export default function Search(){
    let match = useRouteMatch();
    return (
        <>
        <Switch>
            <Route path={`${match.path}/:site/:username`}>
                <DeckPage>
                </DeckPage>
            </Route>

            <Route path={match.path}>
                <ErrorPage 
                    img={require('@site/static/img/character_sad.png').default}
                    message="Please fill the form above to get your recommendations!"
                />
            </Route>

        </Switch>
    </>
    )
};