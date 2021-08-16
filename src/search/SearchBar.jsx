import React from 'react';
import ErrorBlock from './ErrorBlock';
import './SearchBar.css'
import SiteSelector from './SiteSelector';
import ToggableSelect from './ToggableSelect';
import ToggableSignedInput from './ToggableSignedInput';

class SearchBar extends React.Component {

    formats = [
        { text: "TV",       value: "tv" },
        { text: "Short",    value: "short" },
        { text: "Movie",    value: "movie" },
        { text: "OVA",      value: "ova" },
        { text: "ONA",      value: "ona" },
        { text: "Special",  value: "special" },
        { text: "Music",    value: "music" },
    ];

    genres = [
        {text: "Action",        value: "action"},
        {text: "Adventure",     value: "adventure"},
        {text: "Comedy",        value: "comedy"},
        {text: "Drama",         value: "drama"},
        {text: "Ecchi",         value: "ecchi"},
        {text: "Fantasy",       value: "fantasy"},
        {text: "Horror",        value: "horror"},
        {text: "Maho Shoujo",   value: "mahou_shoujo"},
        {text: "Mecha",         value: "mecha"},
        {text: "Music",         value: "music"},
        {text: "Mistery",       value: "mystery"},
        {text: "Psychological", value: "psychological"},
        {text: "Romance",       value: "romance"},
        {text: "Sci-Fi",        value: "sci_fi"},
        {text: "Slice of Life", value: "slice_of_life"},
        {text: "Sports",        value: "sports"},
        {text: "Supernatural",  value: "supernatural"},
        {text: "Thriller",      value: "thriller"},
        {text: "Hentai",        value: "hentai"},
    ]

    supported_sites = [
        {text: "MyAnimeList", value: "mal"},
        {text: "Anilist",     value: "anilist"}
    ]; 
    
    site_short_name = {
        "anilist": "ANL",
        "mal": "MAL"
    }

    base_api_url = "https://yasu.lewdostrello.xyz/"
    candidates_per_request = 12

    constructor(props) {
        super(props);

        this.state = {
            site: "mal",
            username: this.autoFillUser(),
            filters: {},
            error_box: {
                show:false,
                message: ""
            }
        }


        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSiteChange = this.onSiteChange.bind(this)

        this.onFilterUpdate = this.onFilterUpdate.bind(this)

        this.onDisplayErrorBox = this.onDisplayErrorBox.bind(this)

    }


    autoFillUser(){
        let url = window.location.href;
        let sep_pos = url.indexOf("#");
        if(sep_pos !== -1) {
            let usrs = [...url.split("#")[1].matchAll(/\?u=([a-zA-Z0-9_]{3,20})\?/g)];
            if(usrs.length >= 1){
                return  usrs[0][1];
            }
        }

        return "";
    }

    onUsernameChange(event) {
        this.onDisplayErrorBox(false);
        this.setState({username: event.target.value})
    }

    onSiteChange(new_site) {
        this.onDisplayErrorBox(false);

        this.setState({site: new_site})
        // clear old recommendations
        this.props.newRecommendations([])
    }

    onSearchSubmit(event) {
        this.onDisplayErrorBox(false);

        event.preventDefault();

        // prepare link with filters
        
        let req_url = this.base_api_url +`v1/${this.state.site}/${this.state.username}`;

        let filters = `k=${this.candidates_per_request}`
        for (let key in this.state.filters) {
            if(this.state.filters[key].enabled)
            {
                filters += `&${key}=${this.state.filters[key].value}`
            }
        }

        req_url += "?" + filters;

        console.log(req_url)

        fetch(req_url)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then((data) => { this.props.newRecommendations(data["recommendations"])})
        .catch((err) => {
            this.onDisplayErrorBox(true, "Something went wrong with your request. Check your data and retry!")
        })
    }

    onFilterUpdate(name, enable, value) {
        let filters = this.state.filters;
        filters[name] = { enabled: enable, value: value};
        this.setState({filters: filters})
    }


    onDisplayErrorBox(show, message ="") {
        this.setState({error_box: { show: show, message: message}})
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light custom-nav">
                    <form className="container-fluid focus-parent" onSubmit={this.onSearchSubmit}>
                        <a className="position-absolute badge bg-danger text-red site-badge" data-bs-toggle="collapse" href="#site-collapse" role="button">
                            {this.site_short_name[this.state.site]}
                        </a>
                        <div className="input-group border rounded red-border border-2">
                            <input type="text" className="form-control custom-in-text border-end-0" 
                                placeholder="Username" value={this.state.username} aria-label="Username" aria-describedby="basic-addon1"
                                onChange={this.onUsernameChange}
                            />
                            <button className="btn text-red btn-red" data-bs-toggle="collapse"
                                 data-bs-target="#filter-collapse" aria-expanded="false" type="button">
                                <i className="fas fa-filter"></i>
                            </button>
                            <button className="btn text-red btn-red" type="submit"><i className="fas fa-search"></i></button>
                        </div>
                    </form>
                </nav>
                <div className="collapse" id="site-collapse">
                        <div className="container-fluid bottom-margin">
                            <div className="row">
                                <SiteSelector items={this.supported_sites} selected_site={this.state.site} changeSelectedSite={this.onSiteChange}/>
                            </div>
                        </div>
                </div>
                <div className="collapse filters" id="filter-collapse">
                    <div className="container-fluid">
                        <div className="row">

                            <ToggableSelect top_label="Filter by format" select_options={this.formats} 
                                select_text="Select Format"
                                filter_name="format"
                                changeValue={this.onFilterUpdate}
                            />

                            <ToggableSelect top_label="Filter by genre" select_options={this.genres}
                                select_text="Select Genre"
                                filter_name="genre"
                                changeValue={this.onFilterUpdate}
                            />

                            <ToggableSignedInput top_label="Filter by score" placeholder="Score"
                                filter_name="score"
                                changeValue={this.onFilterUpdate}
                                int_range={[50,100]}
                            />
                            <ToggableSignedInput top_label="Filter by year" placeholder="Release Year"
                                filter_name="year"
                                changeValue={this.onFilterUpdate}
                                int_range={[1960, new Date().getFullYear()]}
                            />
                        </div>
                    </div>
                </div>

                <ErrorBlock show={this.state.error_box.show} message={this.state.error_box.message}/>
            </div>
        );
    }
}

export default SearchBar;