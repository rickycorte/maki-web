module.exports = {
    supported_sites: ["mal", "anilist"],
    supported_sites_display: {
        "mal": "MyAnimeList",
        "anilist": "AniList",
    },
    supported_sites_filter: [
        {text:"MyAnimeList", value:"mal"},
        {text:"AniList",     value:"anilist"},
    ],
    supported_filters: ["format", "score", "genre", "year"],
    gte_filters: ["score", "year"],
    anime_formats: [
        { text: "TV",       value: "tv" },
        { text: "Short",    value: "short" },
        { text: "Movie",    value: "movie" },
        { text: "OVA",      value: "ova" },
        { text: "ONA",      value: "ona" },
        { text: "Special",  value: "special" },
        { text: "Music",    value: "music" },
    ],
    anime_genres: [
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
    ],
    supported_signs: [
        {text:">", value: "g"},
        {text:"=", value: "e"},
        {text:"<", value: "l"}
    ]
}