fetch('https://www.thecolorapi.com/id?hex=FFF')
  .then(res => res.json())
  .then(data => console.log(data))