// onload -> get movie lists, append to jquery
const BASE_URL = 'http://localhost:3000'
const token = localStorage.getItem('token')

window.onload = function() {
  axios({
    method: 'post',
    url: `${BASE_URL}/movies/title`,
    headers: {
      token: token
    },
    data: {
      title: 'Mission Impossible'
    }
  })
  .then(response => {
    const results = response.data
    console.log('success -->', results.data.Search)
    listMovies(results.data.Search)
  })
  .catch(err => {
    console.log('error -->', err.response)
    if (err.response.request.status === 400) {
      window.location = '/index.html'
    }
  })
}

function listMovies(searchData) {
  $("#list").html = ""
  $.each(searchData, function(key, data) {
    console.log(key)
    $("#list").append(`
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title"><strong>${data.Title}</strong></span>
            <p style="color: #f9a825">Released: ${data.Year}</p>
            <p style="color:#888888" id="desc_${key}">
            </p>
          </div>
          <div class="card-action">
            <a href="/details.html?${data.imdbID}">Details</a>
          </div>
        </div>
    </div>
    `)
    addDescription(data.imdbID, key)
  })
}

function addDescription(imdbID, key) {
  axios({
    method: 'post',
    url: `${BASE_URL}/movies/id`,
    headers: {
      token: token
    },
    data: {
      id: imdbID
    }
  })
  .then(response => {
    console.log('description imdbID')
    let plot = response.data.data.Plot
    if (plot === 'N/A') plot = 'No description'
    $("#desc_" + key).append(plot)
  })
  .catch(err => {
    console.log('error -->', err.response)
  })
}