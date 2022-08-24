import { colorMode, selectFilter } from "./app.js"

const changeColorMode = function() {
  document.body.classList.toggle("dark-mode")
  document.body.classList.contains("dark-mode") ? 
    (colorMode.children[0].src = "./images/moon-solid.svg", selectFilter.children[1].src = "./images/icon-arrow-light.svg") : 
    (colorMode.children[0].src = "./images/icon-moon.svg", selectFilter.children[1].src = "./images/icon-arrow.svg")
}

export { changeColorMode }