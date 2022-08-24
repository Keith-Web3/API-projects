const colorMode = document.querySelector(".mode")
const backBtn = document.querySelector(".filter__selected")
const countryName = localStorage.getItem("#g28boret")

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then(res => {
    if (!res.ok) {
      throw new Error(`Could not retrieve country data, try again later. Error ${res.status}`)
    }
    return res.json()
  })
  .then(data => {
    console.log(data)
    const { flags: { svg }, population, region, subregion, capital, currencies, languages, borders, tld, name: { nativeName } } = data[0]

    function getData(param, data) {
      let array = Object.values(param)
      array = array.map(item => item[data])
      return array.join(", ")
    }

    document.querySelector(".selected-country").innerHTML = `
      <img src="${svg}" alt="${countryName} flag">
      <div class="selected-country__body">
        <h2 class="selected-country__name">${countryName}</h2>
        <div class="selected-country__info">
          <div class="main-info">
            <p><strong>Native Name:</strong> ${getData(nativeName, "common")}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Sub Region:</strong> ${subregion}</p>
            <p><strong>Capital:</strong> ${capital}</p>
          </div>
          <div class="sub-info">
            <p><strong>Top Level Domain:</strong> ${tld.join(", ")}</p>
            <p><strong>Currencies:</strong> ${getData(currencies, "name")}</p>
            <p><strong>Languages:</strong> ${Object.values(languages).join(", ")}</p>
          </div>
          <div class="borders">
            <strong>Border Countries:</strong>
            <p>${borders?.map(border => "<span class='border'>" + border + "</span>").join(" ") || "No borders"}</p>
          </div>
        </div>
      </div>
    `
  })
  .catch(err => alert(err))

const changeColorMode = function() {
  document.body.classList.toggle("dark-mode")
  document.body.classList.contains("dark-mode") ? 
    (colorMode.children[0].src = "../images/moon-solid.svg", backBtn.children[1].src = "./images/icon-arrow-light.svg") : 
    (colorMode.children[0].src = "../images/icon-moon.svg", backBtn.children[1].src = "./images/icon-arrow.svg")
}

colorMode.addEventListener('click', changeColorMode)
backBtn.addEventListener('click', function() {
  location = "../index.html"
})