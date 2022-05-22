import React from 'react';
import styles from './animecard.module.css';
import GradientTitle from './grandietTitle';


class AnimeCard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props

        this.tracking_link = this.props.site == "mal" ? `https://myanimelist.net/anime/${props.entry.mal}` : `https://anilist.co/anime/${props.entry.anilist}`;
    }

    render() {
        return (
            <div className={styles.card}>
                <div className={styles.card_body}>
                    <img className={styles.image} src={this.props.entry.cover_url}/>
                    {this.props.children}
                    <div className={styles.footer}>
                        <GradientTitle>
                            <div className={styles.title}>{this.props.entry.title}</div>
                            </GradientTitle>
                    </div>
                    <a className={styles.link} href={this.tracking_link} target="_blank"></a>
                </div>
            </div>
        )
    }
}

export default AnimeCard