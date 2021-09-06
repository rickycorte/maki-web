import React, { useState } from 'react';
import {Switch, Route, useRouteMatch, useParams, useHistory} from '@docusaurus/router'
import styles from './search.module.css';
import clsx from 'clsx';
import { CircularProgress, Icon} from '@material-ui/core';


const eventPipe = {

    on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail));
    },
  
    send(event, data) {
        document.dispatchEvent(new CustomEvent(event, data));
    },
  
    remove(event, callback) {  
        document.removeEventListener(event, callback);
    },
  
  };


/***********************************************************************************/

function Card({title, mal, anilist, cover_url, format, release_year, affinity}) {

    return (
        <div className={clsx(styles.card)}>
            <div className={styles.card_body}>
                <img src={cover_url} />
                <div className={styles.card_side}>
                    <h3>{title}</h3>
                    <div className={styles.desc_text}>
                        <Icon>podcasts</Icon>
                        <span style={{marginLeft: "5px"}}>{format.toUpperCase()} - {release_year}</span>
                    </div>
                    <div className={styles.desc_text}>
                        <Icon>favorite</Icon>
                        <span style={{marginLeft: "5px"}}>Affinity: {affinity.toFixed(2)}</span>
                    </div>
                    <div className={styles.card_side_bottom}>
                        <a href={`https://anilist.co/anime/${anilist}`} target="_blank" rel="noopener noreferrer">AniList</a>
                        <a href={`https://myanimelist.net/anime/${mal}`} target="_blank" rel="noopener noreferrer">MyAnimeList</a>
                    </div>
                </div>
            </div>
        </div>
    )
}



class ResultPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data : { },
            error: false,
            error_msg: ""
        }

        this.start_fetch()
    }

    componentDidMount() {
        

        eventPipe.on("refresh_recommendations", (data) => {
            if(this.state.loading) return;

            console.log("Refreshing submit page");
            this.start_fetch();
        });
    }

    componentWillUnmount() {
        eventPipe.remove("refresh_recommendations");
    }

    start_fetch() {
        console.log("Starting recommendation fetch")
        fetch(`https://yasu.lewdostrello.xyz/anime/${this.props.site}/${this.props.username}?k=12`)
        .then(response => response.json())
        .then(fetch_data => {
        this.setState({data: fetch_data, loading: false, error: false})
        console.log("fetched")
        })
        .catch(error => {
            if (typeof error.json === "function") {
                error.json().then(jsonErr => {
                    this.setState({error: true, error_msg: jsonErr["error:"]}) //TODO: fix backend  
                });
            } else{
                this.setState({error: true, error_msg: "Right now I'm unable to reply to you. Retry later!"})
            }
        })
    }

    render() {
        let body;


        if(this.state.error){
            body = <ErrorPage message={this.state.error_msg} />
        } else {
            if(this.state.loading ) {
                body = (
                    <div style={{width: "100%", height:"100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress/>
                    </div>
                )
            }else {
                body = (
                    <div className={styles.card_container}>
                            { this.state.data["recommendations"].map((data => {return <Card key={data.anilist} {...data} />})) }
                    </div>
                )
            }
        }


        return body;
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


    if (!supported_sites.includes(o_site)){
        body =  <ErrorPage message="Unsupported anime tracking site! Please check what you did and try again!" />

    } else if(!o_username.match(/^[a-zA-Z0-9_]{3,20}$/g)){
        body =  <ErrorPage message="Invalid username! Please check what you did and try again!" />
    } else {
        body = (
            <ResultPage
                username={o_username}
                site={o_site} 
            />
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
        let next_url = `${base_url}/${site}/${username}`
        history.push(next_url);
        if(location.pathname === next_url ) {
            eventPipe.send("refresh_recommendations", null)
        }
    }

    return (
        <div className={styles.search_container}>
            <a href="/" className={styles.search_container_btn}><Icon>navigate_before</Icon></a>
            <form onSubmit={onSubmit} style={{flexGrow: 1}}>
            <input type="text"
                className={styles.search_container_topbar_input}
                value={username}
                onChange={(ev)=>set_username(ev.target.value)}
                placeholder={`${site} username`}
            />
            </form>    
            <a onClick={onFilterButtonClick} className={clsx(styles.search_container_btn)}><Icon>filter_alt</Icon></a>
        </div>
    )
}


/***********************************************************************************/

export default function Search(){
    let match = useRouteMatch();

    const supported_sites = ["mal", "anilist"]

    return (
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
    )
};