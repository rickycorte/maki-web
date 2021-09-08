import React, { useState } from 'react';
import {Switch, Route, useRouteMatch, useParams, useHistory, useLocation} from '@docusaurus/router'
import styles from './search.module.css';
import clsx from 'clsx';
import { CircularProgress, Icon} from '@material-ui/core';
import { supported_sites, supported_filters, supported_sites_display, anime_formats, anime_genres} from '../../search.config';
import useIsBrowser from '@docusaurus/useIsBrowser';
import queryString from 'query-string'

/***********************************************************************************/

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

/************************************************************************************/

function ErrorPageBody ({img, title, message}){
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



class CardResultPage extends React.Component {

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
        let url = `https://yasu.lewdostrello.xyz/anime/${this.props.site}/${this.props.username}?k=12`;

        //add filters to the url
        this.props.filters.forEach((filter) =>{
            if(filter.enabled)
                url += `&${filter.name}=${filter.value}`;
        });
        console.log(url);

        fetch(url)
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
            body = <ErrorPageBody message={this.state.error_msg} />
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


/***********************************************************************************/

function SiteSelector({site, set_site}) {
    return (
        <div className={styles.toggle_button_group}>
            {
                supported_sites.map((e) => {
                    return (
                        <button 
                            onClick={()=>set_site(e)}
                            className={clsx({[styles.toggle_bnt_active]: site === e})}
                            key={e}
                        >
                                {supported_sites_display[e]}
                        </button>
                    );
                })
            }
        </div>
    )
}

function ToggableSelect({display_text, selected_item_val, items, set_value}) {
    items
    return (
        <div className={styles.filter_select}>
            <select value={selected_item_val} onChange={(e) => set_value(e.target.value)}>
                <option key="__default" value="__default">{display_text}</option>
                {
                    items.map((e) => {
                        return (
                           <option
                            key={e.value}
                            value={e.value}
                           >{e.text}</option>
                        );
                    })
                }
            </select>
        </div>
    )
}


function SearchBar({base_url, username, site, filters, update_parent_state}){

    const history = useHistory();
    const isBrowser = useIsBrowser();

    const [filter_open, set_filter_open] = useState(false);

    const onFilterButtonClick = (ev) => {
        ev.preventDefault()
        set_filter_open(!filter_open)
        console.log("Filter button clicked")
    }

    const onSubmit = (ev) => {
        if(!isBrowser) return;

        ev.preventDefault();

        let next_url = `${base_url}/${site}/${username}`
        // add fiters
        filters.forEach((filter) =>{
            if(filter.enabled)
                next_url += `&${filter.name}=${filter.value}`;
        });

        next_url = next_url.replace("&", "?"); // replace first & with ? in the link

        history.push(next_url);
        eventPipe.send("refresh_recommendations", null)
    }

    const filter_value = (name) => {
        for(let i =0; i < filters.length; i++)
        {
            let f = filters[i];
            if(f.name === name)
            {
                if(!f.enabled) 
                    return "__default";
                else 
                    return f.value;
            }
        }

        return "__default";

    }

    return (
        <div>
            <div className={styles.search_container}>
                <a href="/" className={styles.search_container_btn}><Icon>navigate_before</Icon></a>
                <form onSubmit={onSubmit} style={{flexGrow: 1}}>
                <input type="text"
                    className={styles.search_container_topbar_input}
                    value={username}
                    onChange={(ev)=>update_parent_state("username", ev.target.value)}
                    placeholder={`${supported_sites_display[site]} Username`}
                />
                </form>    
                <a onClick={onFilterButtonClick} className={clsx(styles.search_container_btn)}><Icon>filter_alt</Icon></a>
            </div>
        <div className={clsx(styles.filter_container, {[styles.filter_container_open]: filter_open})}>
            <SiteSelector site={site} set_site={(new_site) => {update_parent_state("site", new_site)}}/>
            <div style={{display: "flex", justifyItems: "center", flexWrap: "wrap"}}>
                <div className={styles.filter_box}>
                    <ToggableSelect 
                        className="test"
                        display_text="Format"
                        selected_item_val={filter_value("format")}
                        items={anime_formats} 
                        set_value={(new_value)=>update_parent_state("filters", {name: "format", value: new_value})} 
                    />
                </div>
                <div className={styles.filter_box}>
                    <ToggableSelect 
                        className="test"
                        display_text="Genre"
                        selected_item_val={filter_value("genre")}
                        items={anime_genres} 
                        set_value={(new_value)=>update_parent_state("filters", {name: "genre", value: new_value})} 
                    />
                </div>
            </div>
        </div>
       </div>
    )
}

/************************************************************************************/

// extract parameters from link and pass them down to the search page
function SearchParameterWrapper({match_url}) {
    let {site, username} = useParams();
    let location = useLocation();
    let query_params = queryString.parse(location.search);

    let filters = [];
    supported_filters.forEach(f => {
        if(f in query_params)
        {
            filters.push({"name": f, "value": query_params[f], "enabled": true});
        }
    });


    console.log("Re-render page")

    // setup shared page state 
    const [current_username, set_username] = useState(username != null ? username : "");
    const [current_site, set_site] = useState(site != null ? site.toLowerCase() : supported_sites[0]);
    const [current_filters, set_filters] = useState(filters);

    // do checks and set error state later
    let has_errors = false;
    let error_msg = null;
    let error_img = null;

    // check for data errors from url
    const is_site_ok = current_site != null && supported_sites.includes(current_site);
    const is_username_ok = current_username != null && current_username.match(/^[a-zA-Z0-9_]{3,20}$/g);


    // chose appropriate body to render based on the checks made before
    if(current_username == null || current_site == null) 
    {
        has_errors = true;
        error_msg = "Please write your username above to get your recommendations!";
        error_img = require('@site/static/img/character_sad.png').default;
    }
    else if(!is_site_ok)
    {
        has_errors = true;
        error_msg = "Unsupported anime tracking site! Please check what you did and try again!";
    } 
    else if(!is_username_ok)
    {
        has_errors = true;
        error_msg = "Invalid username! Please check what you did and try again!";
    }

    const [current_error, set_error] = useState({show: has_errors, title: null, message: error_msg, img: error_img})


    const update_state = (variable, value) => {
        switch(variable) {
            case "username":
                set_username(value);
                break;
            case "site":
                set_site(value);
                break;
            case "filters":
                // make copy
                let new_filters = [...current_filters]
                let updated_filter = false;
                // update values
                new_filters.forEach(f => {
                    if(f.name === value.name) {
                        f.enabled = value.value !== "__default";
                        f.value = value.value;
                        updated_filter = true;
                    }
                });

                if(!updated_filter) {
                    // not found the item so we need to add it
                    value["enabled"] = value.value !== "__default";
                    new_filters.push(value);
                }

                console.log(new_filters)

                set_filters(new_filters);
                break;
            case "error":
                set_error(value);
                break;
            default:
                console.error(`No state for ${variable}`)
        }
    }

    return (
        <>
            <SearchBar 
                base_url = {match_url}
                username = {current_username}
                site = {current_site}
                filters = {current_filters}
                update_parent_state = {update_state}
            />
            { current_error.show ? 
                <ErrorPageBody {...current_error}/>
                : 
                <CardResultPage username={current_username} site={current_site} filters={current_filters} />}
        </>
    )

}


/***********************************************************************************/

export default function Search() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:site?/:username?`}>
                <SearchParameterWrapper match_url={match.path} />
            </Route>

        </Switch>
    )
};