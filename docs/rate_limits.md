---
sidebar_position: 2
custom_edit_url: null
---

# Rate Limits

Maki is a free service designed to be free for everywhone without limits. 

Running a recommender system and a REST API is expansive in terms of resources usage and to contain costs I've decided to apply strong limits to ensure that computing power of Maki is evenly distributed between its users.

The rate limit is based on the IP address you use to make the requests to the API. The IP adress is temporary stored only for rate limiting purposes and is removed as soon as possible.

The current limit is enought to have good user experiences by making direct calls to Maki from client applications.



:::danger
If you hit the rate limit you will receive a HTTP 429. In that case just slow down a bit and retry your request. 
:::