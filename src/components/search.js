import React, { useState } from 'react';
import {Switch, Route, useRouteMatch, useHistory} from '@docusaurus/router'
import styles from './search.module.css';
import clsx from 'clsx';
import { Button, CircularProgress, Icon} from '@material-ui/core';
import { supported_sites, supported_filters, supported_sites_display, supported_sites_filter, anime_genres, supported_signs, gte_filters} from '../../search.config';
import useIsBrowser from '@docusaurus/useIsBrowser';
import queryString from 'query-string'


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

function Card({title, mal, anilist, cover_url, format, release_year, affinity, site}) {

    var anime_link = site == "mal" ? `https://myanimelist.net/anime/${mal}` : `https://anilist.co/anime/${anilist}`;


    return (
        <div className={clsx(styles.card)}>
            <div className={clsx(styles.card_body)}>
                <img src={cover_url} style={{width: "100%", height: "100%"}}/>
                <div className={clsx(styles.card_title)} >
                    <h4 style={{"margin": "15px"}}>{title}</h4>
                </div>
                <div className={clsx(styles.card_dot)}>
                    {parseInt(affinity * 100) + "%"}
                </div>
                <a href={anime_link} target="_blank" />
            </div>
        </div>
    )
}



class CardResultPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let body;

        console.log(this.props.data);

        if(this.props.loading || this.props.data == null) 
        {
            body = (
                <div style={{width: "100%", height:"100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress/>
                </div>
            )
        }
        else
        {
            if(this.props.data.recommendations.length <= 0 )
            {
                body = (
                    <div style={{width: "100%", height:"100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                        <h1>ಥ﹏ಥ</h1>
                        <p style={{margin: "10px"}}>I'm sorry, I can't find anything that you would like</p>
                    </div>
                )
            } 
            else 
            {
                body = (
                    <div className={styles.card_container}>
                            { this.props.data.recommendations.map((data => {return <Card key={data.anilist} site={this.props.site} {...data} />})) }
                    </div>
                )
            }
        }


        return body;
    }
}


/***********************************************************************************/


function ToggableSelect({display_text, selected_item_val, items, set_value}) {

    let def_opt = display_text != null ? <option key="__default" value="__default">{display_text}</option> : null;

    return (
        <div className={styles.filter_select}>
            <select value={selected_item_val} onChange={(e) => set_value(e.target.value)}>
                {def_opt}
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

function FilterModal({current_site, current_genre, site_callback, genre_callback, submit_callback, close_modal}){

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_close_area} onClick={close_modal} ></div>
            <div className={styles.modal}>
            <h3 style={{textAlign: "center", marginTop: "20px"}}>Settings</h3>
            <div style={{margin:"20px"}}>
                <form onSubmit={submit_callback}>
                    <div style={{display: "flex", justifyItems: "center", flexWrap: "wrap"}}>
                            <div className={styles.filter_box}>
                                <ToggableSelect 
                                    selected_item_val={current_site}
                                    items={supported_sites_filter} 
                                    set_value={site_callback}
                                />
                            </div>
                        
                            <div className={styles.filter_box}>
                                <ToggableSelect 
                                    display_text="Genre"
                                    selected_item_val={current_genre}
                                    items={anime_genres} 
                                    set_value={genre_callback} 
                                />
                            </div>
                        </div>
                        <button style={{marginTop:"20px"}} className={clsx(styles.filter_submit_btn, styles.modal_ok)} type="submit">Apply</button>
                    </form>
            </div>
            </div>


        </div>
    )
}


function SearchBar({base_url, username, site, filters, update_parent_state}){

    const history = useHistory();
    const isBrowser = useIsBrowser();

    const [is_modal_open, set_modal_open] = useState(false);

    let page_body;

    // random walkaround goooo
    if (typeof window !== "undefined") {
        page_body = document.querySelector("body");
    } else {
        page_body = {"style": {"overflow": "auto"}}
    }

    const onFilterButtonClick = (ev) => {
        ev.preventDefault()
        set_modal_open(true)
        page_body.style.overflow = "hidden";
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
        update_parent_state("should_fetch_new_data", true);
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

    const submit_and_close_filters = (ev) => {
        onSubmit(ev);
        set_modal_open(false)
        page_body.style.overflow = "auto";
    }

    let modal_render;
    if(is_modal_open) {
        modal_render = (
            <FilterModal
                current_sitesite={site}
                site_callback = {(new_site) => {update_parent_state("site", new_site)}}
                current_genre= {filter_value("genre")}
                genre_callback = {(new_value)=>update_parent_state("filters", {name: "genre", value: new_value})}
                submit_callback={submit_and_close_filters}
                close_modal={() => { set_modal_open(false); page_body.style.overflow = "auto";}} 
            />
        )
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
                <a onClick={onSubmit} className={clsx(styles.search_container_btn)}><Icon>refresh</Icon></a> 
                <a onClick={onFilterButtonClick} className={clsx(styles.search_container_btn)}><Icon>filter_alt</Icon></a>
            </div>
            {modal_render}
       </div>
    )
}

/************************************************************************************/

class SearchParameterWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.update_state = this.update_state.bind(this);

        //parse query params to extract filters
        let query_params = queryString.parse(this.props.location.search);

        let filters = [];
        supported_filters.forEach(f => {
            if(f in query_params)
            {
                if(gte_filters.includes(f) && !this.is_gte_val(query_params[f])) return; // skip invalid values

                filters.push({"name": f, "value": query_params[f], "enabled": true});
                
            }
        });


        // get username and site from url path
        const username = "username" in this.props.match.params ? this.props.match.params.username : "";
        const site = "site" in this.props.match.params ? this.props.match.params.site : "";

        /// generate a base state
        this.state = {
            username: username != null ? username : "",
            site: site != null ? site.toLowerCase() : supported_sites[0],
            filters: filters,
            fetching_new_data: false,
            error: {
                show: true, // set error to not fire a request, later on when we mount the component we check for errors really
                title: null,
                message: "Please wait I'm breaking things right here...",
                img: null,
            }
        };

        console.log("page ready");
    }

    componentDidMount() {
        this.try_data_fetch()
    }

    is_gte_val(val) {
        if (val.length < 2) return false;

        if (!supported_signs.includes(val[0])) return false;

        try {
            val = parseInt(val.substring(1));
            return !Number.isNaN(val);
        }catch {
            return false;
        }
    }

    
    show_error(message, image, title = null ) 
    {
        this.setState({error: { show: true, title: title,  message: message, img: image }});
    }


    validate_data() 
    {
        console.log(`Validating: ${this.state.username} - ${this.state.site}`)
        // chose appropriate body to render based on the checks made before
        if(this.state.username == "" || this.state.site == "") 
        {
            this.show_error(
                "Please write your username above to get your recommendations!",
                require('@site/static/img/character_sad.png').default
            );

             return false;
        }

        if(!supported_sites.includes(this.state.site))
        {
            this.show_error("Unsupported anime tracking site! Please check what you did and try again!");
            return false;
        } 

        if(!this.state.username.match(/^[a-zA-Z0-9_]{3,20}$/g))
        {
            this.show_error("Invalid username! Please check what you did and try again!");
            return false;
        }

        this.setState({error: {show: false}});
        return true;
    }


    fetch_data() {
        console.log("Starting recommendation fetch")
        let url = `https://api.makichan.xyz/anime/${this.state.site}/${this.state.username}?k=12`;

        //add filters to the url
        this.state.filters.forEach((filter) =>{
            if(filter.enabled)
                url += `&${filter.name}=${filter.value}`;
        });
        console.log(`Calling API: ${url}`);

        fetch(url)
        .then(response => {
            switch (response.status)
            {
                case 200:
                    response.json().then((data) => this.setState({fetched_data: data, fetching_new_data: false}) );
                    break;
                case 429:
                    this.show_error("Slow donw a bit sen(pi)! I' can't follow you!");
                    break;
                case 400:
                    response.json().then((data) => this.show_error(data["error"]) ); 
                    break;
                default:
                    this.show_error("Right now I'm unable to reply to you. Retry later!");
                    break;          
            } 
            
        }).catch(error => {
            this.show_error("Right now I'm unable to reply to you. Retry later!")
        })
    }


    try_data_fetch(){
        if(this.validate_data()){
            this.fetch_data()
        }
    }


    update_state(variable, value)
    {
        switch(variable) {
            case "username":
                this.setState({username: value});
                break;

            case "site":
                this.setState({site: value});
                break;
            case "filters":
                // make copy
                let new_filters = [...this.state.filters]
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

                this.setState({filters: new_filters});
                break;
            
            case "should_fetch_new_data":
                this.setState({fetching_new_data: value})
                this.try_data_fetch()
                break;

            case "error":
                this.setState({error: value});
                break;

            default:
                console.error(`No state for ${variable}`)
        }
    }

    render() {

        return (
        <>
            <SearchBar 
                base_url = {this.props.url}
                username = {this.state.username}
                site = {this.state.site}
                filters = {this.state.filters}
                update_parent_state = {this.update_state}
            />
            { this.state.error.show ? 
                <ErrorPageBody {...this.state.error}/>
                : 
                <CardResultPage 
                    loading={this.state.fetching_new_data}
                    data={this.state.fetched_data}
                    site={this.state.site}
                />}
        </>
        )
    }

}


/***********************************************************************************/

export default function Search() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route 
                path={`${match.path}/:site?/:username?`} 
                render={(props) => <SearchParameterWrapper {...props} url={match.path}></SearchParameterWrapper>}
                title="Discover | Maki"
                >
            </Route>

        </Switch>
    )
};