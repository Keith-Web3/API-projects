const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const modalInfo = document.querySelectorAll(".info > p")
const fullScreenIcon = document.getElementById("compress-icon")
const mapDiv = document.getElementById("map")

let map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
map.locate({setView: true, maxZoom: 16});

map.addEventListener('locationfound', function(e) {
  var radius = e.accuracy;

  L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
});

map.addEventListener('locationerror', function(e) {
  alert(e.message);
});

async function* getMap() {
  try {
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_Nttt6NEHmOgVm6UwfeZr41wSLpvsR&ipAddress=${searchInput.value}`)

    if (!res.ok) {
      searchInput.value = ""
      searchInput.placeholder = "Invalid IP Address"
      searchInput.classList.add("error")
      fullScreenIcon.style.display = "none"
      throw new Error("Error, code: " + res.status)
    }
    searchInput.classList.remove("error")
    searchInput.placeholder = "Search for any IP Address"

    const { ip, location: { lat, lng, country, city, timezone }, isp} = await res.json()
    modalInfo[0].textContent = ip
    modalInfo[1].textContent = `${country} ${city}`
    modalInfo[2].textContent = "UTC" + timezone
    modalInfo[3].textContent = isp

    yield 1 // first stop
    if (map !== undefined && map !== null) {
      map.remove()
    }
    map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
    let marker = L.marker([lat, lng]).addTo(map);
    map.addEventListener('click', onMapClick);
    fullScreenIcon.style.display = "block"
  } catch(error) {
    console.error(error)
  }
  yield 2 //complete function
}

const generatorMap = getMap()
generatorMap.next()

function completeGetMapFunction() {
  const generatorMap = getMap()
  generatorMap.next()
  generatorMap.next()
}
searchBtn.addEventListener('click', completeGetMapFunction)

searchInput.addEventListener('keydown', function(e) {
  const permittedKeys = [".", "0", "Backspace"]
  e.key === "Enter" ? completeGetMapFunction() : ""
  if (Number(e.key) || permittedKeys.includes(e.key)) return
  e.preventDefault()
})
function onMapClick(e) {
  alert("You clicked the map at " + e.latlng)
}
fullScreenIcon.addEventListener('click', function(e) {
  e.stopPropagation()
  mapDiv.classList.toggle("full-screen")
  this.src = mapDiv.classList.contains("full-screen") ? "./images/compress-solid.svg" : "./images/expand-solid.svg"
})