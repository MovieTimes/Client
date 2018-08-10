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
        <p>Director: ${movie.Director}</p>
        <p>Rating: ${movie.Ratings[0].Value}</p>
        <p>Release date: ${movie.Released}</p>
        <br>
        <p>${movie.Plot}</p>
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

}

