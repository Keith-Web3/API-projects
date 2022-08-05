const dropDown = document.querySelector(".drop-down")
const dropDownList = document.querySelector(".drop-down__list")
const dropDownText = document.querySelector(".drop-down__text")
const colorScheme = document.querySelectorAll('.scheme')
const colorSchemeName = document.querySelectorAll('.list-text')
const colorInput = document.querySelector('input[type=color]')
const getColorBtn = document.querySelector('.get-color-btn')
const colors = document.querySelectorAll('.color')
const colorCodes = document.querySelectorAll('.color-code')
const copiedAlert = document.querySelector('.copied')

let mode = "monochrome"

document.body.addEventListener('click', function(e) {
  if (e.target.matches(".drop-down__arrow") || e.target === dropDown || e.target === dropDownText) return
  dropDown.classList.remove('active')
})
dropDown.addEventListener('click', function() {
  this.classList.toggle('active')
})
dropDownList.addEventListener('click', function(e) {
  e.stopPropagation()
})
function removeActiveFromSchemes() {
  colorScheme.forEach(scheme => {
    scheme.classList.remove('active')
  })
}
colorScheme.forEach((scheme, index) => {
  scheme.addEventListener('click', function() {
    removeActiveFromSchemes()
    this.classList.add('active')
    dropDownText.textContent = mode = colorSchemeName[index].textContent
  })
})

function getScheme() {
  const color = colorInput.value.slice('1')
  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode.toLowerCase()}`)
  .then(res => res.json())
  .then(data => {
    data.colors.forEach(({ hex }, index) => {
      colors[index].style.backgroundColor = hex.value
      colorCodes[index].textContent = hex.value
    })
  })
}
getScheme()

getColorBtn.addEventListener('click', function() {
  getScheme()
})