const anime_card_code = `
<div class="col-12 col-lg-6 col-xxl-4">
<div class="card mb-3 custom-card">
  <div class="row g-0">
    <div class="col-4 col-md-4">
      <img src="{anime.cover}" class="img-fluid rounded-start">
    </div>
    <div class="col-8 col-md-8">
      <div class="card-body h-100">
        <h5 class="card-title text-truncate">{anime.title}</h5>
        <ul class="list-group list-group-flush custom-list-grop-item">
          <li class="list-group-item custom-list-grop-item""><i class="fas fa-tv"></i> {anime.type} - {anime.year}</li>
          <li class="list-group-item custom-list-grop-item""><i class="fas fa-heart"></i> Affinity: {anime.affinity}</li>
        </ul>
        <div class="position-absolute bottom-0 card-bottom">
          <a href="https://anilist.co/anime/{anilist.id}" class="card-link">Anilist</a>
          <a href="https://myanimelist.net/anime/{myanimelist.id}" class="card-link">MyAnimeList</a>
        </div>
      </div>
    </div>
</div>
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
            .replace("{anime.cover}", itm["cover_url"])
            .replace("{anime.title}", itm["title"])
            .replace("{anilist.id}", itm["anilist"])
            .replace("{myanimelist.id}", itm["mal"])
            .replace("{anime.type}", itm["format"].toUpperCase())
            .replace("{anime.year}", itm["release_year"])
            .replace("{anime.affinity}", itm["affinity"].toFixed(2))
    
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
    fetch(`https://yasu.lewdostrello.xyz/v1/mal/${usr}?k=12`)
    .then(response => response.json())
    .then(data => generateAnimeSuggestionsUI(data))
    .catch(function() {
        showErrorBox("We could not complete your request, try again later!")
    })
}

suggest_button.onclick = requestSuggestions


// replace submit with enter key
window.addEventListener('keydown', function(e) {
  if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
      if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
          e.preventDefault()
          requestSuggestions()
          return false;
      }
  }
}, true);