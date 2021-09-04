import React, { useState } from 'react';
import {Switch, Route, useRouteMatch, useParams, useHistory} from '@docusaurus/router'
import styles from './search.module.css';
import clsx from 'clsx';
import { Icon, IconButton } from '@material-ui/core';


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


function DeckPage ({supported_sites}) {
    let {o_site, o_username} = useParams();
    let body;

    if (supported_sites.includes(o_site)){
        body = (
        <>
            <ResultPage username={o_username} site={o_site}></ResultPage>
        </>
        )
    } else {
        body =  (
        <>
            <ErrorPage message="Unsupported anime tracking site! Please check what you did and try again!" />
        </>
        )
    }

    return body

}

/***********************************************************************************/

function SearchBar({base_url, supported_sites}){


    let {o_site, o_username} = useParams();
    let site_ok = o_site != null && supported_sites.includes(o_site.toLowerCase())

    const [username, set_username] = useState(o_username == null || !site_ok ? "" : o_username);
    const [site, set_site] = useState(site_ok ? o_site.toLowerCase() : supported_sites[0]);

    const history = useHistory();


    const onFilterButtonClick = (ev) => {
        ev.preventDefault()
        console.log("Filter button clicked")
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        history.push(`${base_url}/${site}/${username}`);
    }

    return (
        <div className={clsx(styles.search_container)}>
            <a href="/" className={clsx(styles.search_container_btn)}><Icon>navigate_before</Icon></a>
            <form onSubmit={onSubmit} style={{width: "92%"}}>
            <input type="text"
                className={clsx(styles.search_container_topbar_input)}
                value={username}
                onChange={(ev)=>set_username(ev.target.value)}
            />
            </form>    
            <a onClick={onFilterButtonClick} className={clsx(styles.search_container_btn)}><Icon>settings</Icon></a>
        </div>
    )
}


/***********************************************************************************/

export default function Search(){
    let match = useRouteMatch();

    const supported_sites = ["mal", "anilist"]

    return (
        <>
        <Switch>
            <Route path={`${match.path}/:o_site/:o_username`}>
                <SearchBar base_url={match.path} supported_sites={supported_sites} />
                <DeckPage supported_sites={supported_sites} />
            </Route>

            <Route path={match.path}>
                <SearchBar base_url={match.path} supported_sites={supported_sites} />
                <ErrorPage 
                    img={require('@site/static/img/character_sad.png').default}
                    message="Please write your username above to get your recommendations!"
                />
            </Route>

        </Switch>
    </>
    )
};