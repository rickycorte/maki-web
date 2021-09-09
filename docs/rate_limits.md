---
sidebar_position: 2
custom_edit_url: null
---

# Rate Limits

Yasu is a free service designed to be free for everywhone without limits. 

Running a recommender system and a rest API could be expansive in terms of resources usage and to contains costs I've decided to apply strong limits to ensure that computing power of Yasu is evenly distributed.

The rate limit is based on the IP adress you use to make the requests to the API and it's enought to have good user experiences by making direct calls to Yasu from client applications.

:::danger
If you hit rate limits you will receive an HTTP 429. In that case just slow down a bit and retry your request. 
:::