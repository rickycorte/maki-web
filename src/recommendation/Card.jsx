import './Card.css';

function Card(props) {
    let mal_link = "https://myanimelist.net/" +  props.anime.mal;
    let anilist_link = "https://anilist.co/anime/" + props.anime.anilist;
    return (
        <div className="col-12 col-lg-6 col-xxl-4">
            <div className="card mb-3 custom-card">

                <div className="row g-0">
                    <div className="col-4 col-md-4">
                        <img src={props.anime.cover_url} className="img-fluid rounded-start anime-cover" alt=""/>
                    </div>

                    <div className="col-8 col-md-8">
                        <div className="card-body h-100">
                            <h5 className="card-title text-truncate">{props.anime.title}</h5>
                            <ul className="list-group list-group-flush custom-list-grop-item text-left">
                                <li className="list-group-item custom-list-grop-item">
                                    <i className="fas fa-tv"></i> {props.anime.format.toUpperCase()} - {props.anime.release_year}
                                </li>
                                <li className="list-group-item custom-list-grop-item">
                                    <i className="fas fa-heart"></i> Affinity: {props.anime.affinity.toFixed(2)}
                                </li>
                            </ul>
                            <div className="position-absolute bottom-0 card-bottom">
                                <a href={anilist_link} target="_blank" rel="noreferrer" className="card-link">Anilist</a>
                                <a href={mal_link} target="_blank" rel="noreferrer" className="card-link">MyAnimeList</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}


export default Card;
