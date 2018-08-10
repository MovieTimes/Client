const BASE_URL = 'http://localhost:3000'
const token = localStorage.getItem('token')

window.onload = function() {
  let imdbID = window.location.href.split('?')[1]
  axios({
    method: 'post',
    url: `${BASE_URL}/movies/id`,
    headers: {
      token
    },
    data: {
      id: imdbID
    }
  })
  .then(response => {
    console.log('success -->', response.data.data)
    let movie = response.data.data
    getMovieInfo(movie)
    getNYTimesReview(movie.Title)
    getVideo(movie.Title)
    getImgur(movie.Title)
  })
  .catch(err => {
    console.log('error -->', err.response)
  })
}

function getMovieInfo(movie) {
  $('#movie-info').append(`
    <div class="card">
      <div class="card-image" id="poster">
        <img src="${movie.Poster}" alt="test">
      </div>
      <div class="card-content">
        <span class="card-title">${movie.Title}</span>
        <p><strong style="color: #f9a825">Director:</strong> ${movie.Director}</p>
        <p><strong style="color: #f9a825">Rating:</strong> ${movie.Ratings[0].Value}</p>
        <p><strong style="color: #f9a825">Release date:</strong> ${movie.Released}</p>
        <p><strong style="color: #f9a825">Actors:</strong> ${movie.Actors}</p>
        <br>
        <p style="color: #888888">${movie.Plot}</p>
      </div>
  </div>
  `)
}

function getNYTimesReview(movieName) {
  axios({
    method: 'post',
    url: `${BASE_URL}/news`,
    headers: {
      token
    },
    data: {
      title: movieName
    }
  })
  .then(response => {
    console.log('NY Times',response.data)
    let reviewer = response.data.data[0].reviewer
    let summary = response.data.data[0].summary_short
    $('#nytimes').append(`
    <div class="card">
      <div class="card-content">
        <span class="card-title">NY Times Review</span>
        <p>Reviewer: ${reviewer}</p>
        <p>${summary}</p>
      </div>
    </div>
    <br>
    `)
  })
  .catch(err => {
    console.log(err.response)
  })
}

function getVideo(movieName) {
  axios({
    method: 'post',
    url: `${BASE_URL}/youtube/trailer`,
    headers: {
      token
    },
    data: {
      title: movieName
    }
  })
  .then(response => {
    console.log('Youtube -->', response.data)
    let videoURL = response.data.data[0].url
    $('#youtube').append(`
      <h5>Related Video</h5>
      <div class="video-container">
        <iframe src="${videoURL}" frameborder="0" allowfullscreen></iframe>
      </div>
    `)
  })
  .catch(err => {
    console.log('error -->', err.response)
  })
}

function getImgur(movieName) {
  axios({
    method: 'post',
    url: `${BASE_URL}/imgur`,
    headers: {
      token
    },
    data: {
      title: movieName
    }
  })
  .then(response => {
    console.log('imgur -->', response.data)
    let imgUrl = response.data.data
    $('#imgur').append(`
    <h5>Related Images</h5>
    <div class="row">
      <div class="col s4">
        <div class="card">
          <div class="card-image">
            <img src="${imgUrl}" alt="">
          </div>
        </div>
      </div>
    </div>
    `)
  })
  .catch(err => {
    console.log(err.response)
  })
}

