import { changeColorMode } from "./utils.js"

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
  try {
    const res = await fetch(`https://restcountries.com/v3.1/${param}`)
    if (!res.ok) throw new Error("Error fetching data")

    countries.innerHTML = ""
    const data = await res.json()
    data.forEach(country => {
      const { name: { common, official }, flags: { svg }, population, region, capital } = country
      countries.innerHTML += `
        <div class="country" >
          <img src="${svg}" class="country__flag" alt="${common} flag">
          <div class="country__info">
            <h2 class="country__name">${common}</h2>
            <p class="population"><strong>Population:</strong> ${population}</p>
            <p class="region"><strong>Region:</strong> ${region}</p>
            <p class="capital"><strong>Capital:</strong> ${capital}</p>
            <span id="official-name">${official}</span>
          </div>
        </div>
      `
      document.querySelectorAll(".country").forEach(country => {
        country.addEventListener("click", function() {
          localStorage.setItem("#g28boret", this.children[1].lastElementChild.textContent)
          location = "./info/info.html"
        })
      })
    })
  } catch(err) {
    alert(err)
    console.error(err)
  }
}
getCountries("all")

function submitSearchInput() {
  getCountries(`name/${searchInput.value}`)
}
searchInput.addEventListener('keydown', function(e) {
  if (e.key === "Enter") submitSearchInput()
})
searchInput.previousElementSibling.addEventListener("click", submitSearchInput)

colorMode.addEventListener('click', changeColorMode)
export { colorMode, selectFilter }