const selectFilter = document.querySelector(".filter__selected")
const filterListElements = document.querySelectorAll(".filter__list > li")
const countries = document.querySelector(".countries")
const searchInput = document.querySelector(".search-bar__input")
const colorMode = document.querySelector(".mode")

selectFilter.addEventListener('click', function() {
  this.closest('.filter').classList.toggle('opened')
})
filterListElements.forEach(continent => {
  continent.addEventListener('click', function() {
    selectFilter.children[0].textContent = continent.textContent
    getCountries(`region/${continent.textContent}`)
  })
})

async function getCountries(param) {
  countries.innerHTML = ""
  const res = await fetch(`https://restcountries.com/v3.1/${param}`)
  const data = await res.json()
  data.forEach(country => {
    const { name: { common }, flags: { svg }, population, region, capital } = country
    countries.innerHTML += `
      <div class="country">
        <img src="${svg}" class="country__flag" alt="${common} flag">
        <div class="country__info">
          <h2 class="country__name">${common}</h2>
          <p class="population"><strong>Population:</strong> ${population}</p>
          <p class="region"><strong>Region:</strong> ${region}</p>
          <p class="capital"><strong>Capital:</strong> ${capital}</p>
        </div>
      </div>
    `
  })
}
getCountries("all")

function submitSearchInput() {
  getCountries(`name/${searchInput.value}`)
}
searchInput.addEventListener('keydown', function(e) {
  if (e.key === "Enter") submitSearchInput()
})
searchInput.previousElementSibling.addEventListener("click", submitSearchInput)

colorMode.addEventListener('click', function() {
  document.body.classList.toggle("dark-mode")
  document.body.classList.contains("dark-mode") ? 
    (colorMode.children[0].src = "./images/moon-solid.svg", selectFilter.children[1].src = "./images/icon-arrow-light.svg") : 
    (colorMode.children[0].src = "./images/icon-moon.svg", selectFilter.children[1].src = "./images/icon-arrow.svg")
})