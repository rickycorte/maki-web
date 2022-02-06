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

By default Maki will never return hentai entries unless you explicitly set the genre filter to `hentai`.

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
      "affinity": 0.85,
      "genres": ["action", "adventure"]
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



All the following parameters may be used in any combination you want. If one of them has an invalid value the request is rejected.

At the moment Maki supports only filter by genre. Putting too many filters would defeat the purpose of a recommender system.
### (query) k

Number of recommendations that should be generated.

Range: `1-40`


### (query) genre
Force Maki to generate recommendations only for items with the requested genre.
Filtering with multiple genres is not possible by design.

**Note:** Maki never return `hentai`. To receive them you must ask for them by setting this parameter to `hentai`.

Genre must be one of: `action`, `adventure`, `comedy`, `drama`, `ecchi`, `fantasy`, `hentai`, `horror`, `mahou_shoujo`, `mecha`, `music`, `mystery`, `psychological`, `romance`, `sci-fi`, `slice_of_life`, `sports`, `supernatural`, `thriller`

#### Example

We suppose out `test_user` has a public list on `MyAnimeList`.

To apply filters you must append a query to the base url. For example let's say that we want to get recommendations about anime released before 2000.

```shell
GET https://api.makichan.xyz/anime/mal/test_user?genre=action
```

## Conclusion

In just a few minutes you got your recommendations!

With Maki you can focus only on your application, Make takes care about the complex stuff so you don't have to.