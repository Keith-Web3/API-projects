const searchInput = document.querySelector("input")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.querySelector(".movies-container")
const placeholder = document.querySelector(".placeholder")

async function getMovie() {
  if (searchInput.value.trim() === "") return
  const response = await fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=94a48f77`)
  const data = await response.json()
  
  if (!response.ok || data.Response === "False") {
    searchInput.value = ""
    searchInput.placeholder = "Searching something with no data"
    placeholder.innerHTML = `<p class="error-message">Unable to find what you're looking for. Please try another</p>`
    return
  }
  const moviesArray = data.Search
  
  moviesContainer.innerHTML = ""
  searchInput.placeholder = "Search a movie"

  moviesArray.forEach(async ({ imdbID }) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=94a48f77`)
    const data = await response.json()
    const { Title, Poster, Runtime, Plot, Genre, Ratings } = data
    const movie = document.createElement("div")
    let rating = Ratings.pop().Value
    if (rating.includes("/")) {
      rating = rating.split("/")
      rating = rating.includes("100") ? Number(rating[0]) / 10 : rating[0]
    } else if (rating.includes("%")) {
      rating = rating.slice(0, -1)
    }

    movie.className = "movie"
    movie.innerHTML = `
    <img src="${Poster}" alt="movie poster">
    <h2 class="header">
      <p class="title">${Title}</p>
      <img src="./images/star.svg" alt="rating"> 
      <p class="rating">${rating}</p>
    </h2>
    <div class="subheader">
      <p class="time">${Runtime}</p>
      <p class="genre">${Genre}</p>
      <div class="add-to-watchlist bubble-effect">
        <img src="./images/plus.svg" alt="add to watchlist">
        <p>Watchlist</p>
      </div>
    </div>
    <p class="about-movie">${Plot}</p>
    `
    moviesContainer.appendChild(movie)
  })
}
searchBtn.addEventListener('click', getMovie)
searchInput.addEventListener('keydown', e => {
  if (e.key === "Enter") getMovie()
})

document.body.addEventListener('click', function(e) {
  if (e.target.matches(".add-to-watchlist") || e.target.matches(".add-to-watchlist > p") || e.target.matches(".add-to-watchlist > img")) {
    const movie = e.target.closest(".movie")
    const savedValue = JSON.parse(localStorage.getItem("#12moviesearchapp")) || []

    localStorage.setItem("#12moviesearchapp", JSON.stringify([...savedValue, `${movie.outerHTML}`]))
    }
})






// https://www.omdbapi.com/?i=tt3896198&apikey=94a48f77