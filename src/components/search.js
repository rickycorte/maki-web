import React from 'react';
import {Switch, Route, useRouteMatch, useParams} from '@docusaurus/router'

function DeckPage () {
    let {site, username} = useParams();
    return (
        <>
            <h1>Hi there {username} looking for {site}?</h1>

            <h2>Too bad a raccoon ate {site}</h2>
        </>
    )
}




/*
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {match: useRouteMatch()};
    }


    render() {
        return (
        <div>
            <Switch>
                <Route path={`${this.state.match.path}/:site/:username`}>
                    <DeckPage {...useParams()}></DeckPage>
                </Route>

                <Route path={this.state.match.path}>
                    <h3>HELLO THERE :3</h3>
                </Route>

            </Switch>
        </div>
        );
    }
}
*/

export default function Search(){
    let match = useRouteMatch();
    return (
        <div>
        <Switch>
            <Route path={`${match.path}/:site/:username`}>
                <DeckPage ></DeckPage>
            </Route>

            <Route path={match.path}>
                <h3>HELLO THERE :3</h3>
            </Route>

        </Switch>
    </div>
    )
};