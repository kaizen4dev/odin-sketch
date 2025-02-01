// tweaks and their (defalult) values
let tweaks = {
  borders: true,
  randomColor: false, 
  opacity: false
};

// create new grid
function updateGrid(gridSize){
  // don't update grid if whole number isn't passed
  if(!gridSize || !Number.isInteger(Number(gridSize))) return alert("Canceled.");

  // select/create grid and single square
  const grid = document.querySelector(".grid");
  const square = document.createElement("div");

  // find number and size of new squares
  const squareNumber = gridSize ** 2;
  // const squareSize = Math.sqrt((grid.clientHeight * grid.clientWidth) / squareNumber);
  const squareSize = grid.clientHeight / gridSize; // simplified version of above.

  // apply styles/classes to new squares
  square.style.width = `${squareSize}px`;
  square.style.height = `${squareSize}px`;
  square.classList.add("square");

  // remove old squares from grid
  while(grid.firstChild){
    grid.removeChild(grid.firstChild);
  }

  // add new squares to grid
  for(let i = 0; i < squareNumber; i++){
    grid.append(square.cloneNode());
  }

  // add borders to new squares if they turned on
  if(tweaks.borders) toggleSquareBorders();
}

// turn borders on or off
function toggleSquareBorders(switchTweaks){
  const grid = document.querySelector(".grid");
  for(const square of grid.children){
    square.style.border = square.style.border == "" ? "thin solid black" : "";
  }
  if(switchTweaks) tweaks.borders = !tweaks.borders;
}

function getRandomRGB(){
  function randomNumber(){
    return Math.floor(Math.random() * 226);
  } 
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`
}

// listen for events
function listen(){
  addEventListener('mouseover', (event) => {
    let target = event.target;
    switch(target.className){
      case "square":
        target.style.backgroundColor = tweaks.randomColor ? getRandomRGB() : "black";
        target.style.opacity = tweaks.opacity ? `${Number(target.style.opacity) + 0.1}` : null;
        break;
    }
  })

  addEventListener('click', (event) => {
    let target = event.target;
    switch(target.className){
      case "new-grid":
        updateGrid(prompt('Size of new grid'));
        break;
      case "toggle-square-borders":
        toggleSquareBorders(true);
        break;
      case "opacity":
        tweaks.opacity = !tweaks.opacity;
        target.style.backgroundColor = target.style.backgroundColor == "lime" ? "" : "lime";
        break;
      case "random-color":
        tweaks.randomColor = !tweaks.randomColor;
        target.style.backgroundColor = target.style.backgroundColor == "lime" ? "" : "lime";
        break;
    }
  })
}
