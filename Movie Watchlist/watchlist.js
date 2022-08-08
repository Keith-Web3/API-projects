const watchlistMovieContainer = document.querySelector(".watchlist")

let content

content = new Set(JSON.parse(localStorage.getItem("#12moviesearchapp")))
content = [...content]

content.forEach((item, index) => {
  watchlistMovieContainer.innerHTML += item

  const addToWatchListImg = document.querySelectorAll(".add-to-watchlist > img")

  addToWatchListImg[index].src = "./images/minus.svg"
})

document.body.addEventListener('click', function(e) {
  if (e.target.matches(".add-to-watchlist") || e.target.matches(".add-to-watchlist > p") || e.target.matches(".add-to-watchlist > img")) {
    const movie = e.target.closest(".movie")
    movie.remove()
  
    const newLocalStorageArray = [...document.querySelectorAll(".movie")].reduce((acc, mov) => {
      return [...acc, mov.outerHTML]
    }, [])
    console.log(newLocalStorageArray)
  
    localStorage.setItem("#12moviesearchapp", JSON.stringify(newLocalStorageArray))
  }
})

