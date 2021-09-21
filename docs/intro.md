---
sidebar_position: 1
custom_edit_url: null
---

# Getting Recommendations
Integrating Maki in any kind of application is really simple and takes just a few minutes thanks to it public REST interface.

```shell title="Endpoint URL"
https://api.makichan.xyz
```
## GET /

This path is used to check if the API is online.
You may not hit this path many times because it's counted towards rate limits, just do a normal request on other endpoints and handle the error later on.

:::danger
This endpoint may return HTTP 429 if your request exceed the quota allowed by the rate limit
:::

## GET /anime/{site}/{username}

To get recommendation you must do a `GET` request to this endpoint with both a site and a username.

The site parameter must be one of: `mal`, `anilist`

The username must contain only alphanumeric characters and '_', it also must be between 3 and 20 characters.

```shell title="Example Request"
GET https://api.makichan.xyz/anime/mal/test_user
```


```json title="Example response"
{
  "code": 200,
  "user": "test_username",
  "id": 123456,
  "recommendations": [
    {
      "mal": 134,
      "anilist": 134,
      "title": "Gunslinger Girl",
      "cover_url": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx134-f3dmmMOijYdn.png",
      "format": "tv",
      "release_year": 2003,
      "score": 70,
      "affinity": 6.278204858747053
    }
  ]
}
```

:::danger
This endpoint may return HTTP 400 if there is a problem in the request. Further details will be provided in the json error
:::

:::danger
This endpoint may return HTTP 429 if your request exceed the quota allowed by the rate limit
:::


Maki also offer the possibility to apply filters to your queries to generate more specific recommendations.

All the following parameters may be used in any combination you want. If one of them has an invalid value the request is rejected.

### (query) k

Number of recommendations that should be generated.

Range: `1-20`

### (query) format

Force Maki to generate recommendations only for items with the requested broadcast format.
Filtering with multiple formats is not possible by design.

Format must be one of: `tv`, `short`, `movie`, `special`, `ova`, `ona`, `music`

### (query) genre
Force Maki to generate recommendations only for items with the requested genre.
Filtering with multiple genres is not possible by design.

**Note:** Maki never return `hentai`. To receive them you must ask for them by setting this parameter to `hentai`.

Genre must be one of: `action`, `adventure`, `comedy`, `drama`, `ecchi`, `fantasy`, `hentai`, `horror`, `mahou_shoujo`, `mecha`, `music`, `mystery`, `psychological`, `romance`, `sci-fi`, `slice_of_life`, `sports`, `supernatural`, `thriller`

### (query) year
Filter by anime release year from 1960 up to now.

You must also specify a direction in which you want to apply the filter with either: `g` (greater), `e` (equal), `l` (lower).

For example if you want to filter anime released from 2010 up to now you should pass `g2009`, this will include all the animes from 2010 or later.

### (query) score
Filter by anime score in range 50-100.

You must also specify a direction in which you want to apply the filter with either: `g` (greater), `e` (equal), `l` (lower).

For example if you want to filter anime with a score of 87 up to now you should pass `e87`, this will include all the animes with the exact score of 87.

## Examples

In this section we made a few examples of complex queries with parameters.



### Apply one filter
We suppose out `test_user` has a public list on `MyAnimeList`.

To apply filters you must append a query to the base url. For example let's say that we want to get recommendations about anime released before 2000.

```shell
GET https://api.makichan.xyz/anime/mal/test_user?year=l2000
```

### Multiple filters
We suppose out `test_user` has a public list on `AniList`.

Let's say he wants the finest tv animes.
We could give him recommendations with:
```shell
GET https://api.makichan.xyz/anime/anilist/test_user?score=g80&format=tv
```
:::tip
The query parameters can be ordered in any way you want!
:::

### All filters
We suppose out `test_user` has a public list on `AniList`.

With this user we want to be super specific in what we recommend to him.
Let's give him as much suggessions as possible on anime released in 2010 with a score greater than 75 aired on tv and that contain action.

```shell
GET https://api.makichan.xyz/anime/anilist/test_user?k=20&score=g75&format=tv&genre=action&year=e2010
```

### Hentai

As stated before, you must ask explicitly to recommend hentai.

We suppose out `test_user` has a public list on `MyAnimeList`.

```shell
GET https://api.makichan.xyz/anime/anilist/test_user?genre=hentai
```

## Conclusion

In just a few minutes you got your recommendations!

With Maki you can focus only on your application, Make takes care about the complex stuff so you don't have to.