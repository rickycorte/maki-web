const anime_card_code = `
<div class="col-12 col-md-6 col-xl-4">
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-4 col-md-4">
        <img src="{anime.cover}" class="img-fluid rounded-start">
      </div>
      <div class="col-8 col-md-8">
        <div class="card-body">
          <h5 class="card-title text-truncate">{anime.title}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><a href="https://anilist.co/anime/{anilist.id}">Anilist</a></li>
            <li class="list-group-item"><a href="https://myanimelist.net/anime/{myanimelist.id}">MyAnimeList</a></li>
          </ul>
        </div>
      </div>
    </div>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {anime.score}
    </span>
  </div>
</div>
`

var username_input = document.getElementById("form-username")
var suggest_button = document.getElementById("suggest-btn")
var anime_container = document.getElementById("anime-card-holder")
var error_box = document.getElementById("error-box")
var slow_warn_box = document.getElementById("slow-alert-box")

function hideErrorBox() {
    error_box.classList.add("visually-hidden")
}

function showErrorBox(msg) {
    error_box.innerHTML = msg
    error_box.classList.remove("visually-hidden")
}


function showSlowWarnBox(on) {
    if(on) slow_warn_box.classList.remove("visually-hidden")
    else slow_warn_box.classList.add("visually-hidden")
}


function clearAnimeSuggestonUI() {
    anime_container.innerHTML = ""
    console.log("Cleared old list")
}

function generateAnimeSuggestionsUI(rjson) {
    clearAnimeSuggestonUI()
    console.log(rjson)
    console.log("Generating new list")
    rjson["recommendations"].forEach(itm => {
        var card = anime_card_code
            .replace("{anime.cover}", itm["cover"])
            .replace("{anime.title}", itm["title"])
            .replace("{anilist.id}", itm["anilist"])
            .replace("{myanimelist.id}", itm["mal"])
            .replace("{anime.score}", itm["score"])
    
        anime_container.innerHTML += card
    })
    showSlowWarnBox(false)
    console.log("ok")
}

function requestSuggestions() {
    var usr = username_input.value
    //skip null usr
    if(usr == null || usr == "") 
    {
        showErrorBox("Username must not be null")
        console.error("Null username")
        return
    }
    hideErrorBox()
    showSlowWarnBox(true)
    console.log("Fetching suggestions for "+ usr)
    fetch(`https://yasu-api.rickycorte.com/v1/mal/${usr}?opt=1`)
    .then(response => response.json())
    .then(data => generateAnimeSuggestionsUI(data))
    .catch(function() {
        showErrorBox("We could not complete your request, try again later!")
    })
}

suggest_button.onclick = requestSuggestions

