function updateGrid(gridSize){
  // don't update grid if whole number isn't passed
  if(!gridSize || !Number.isInteger(gridSize)) return alert("Canceled.");

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
  let borders = squareBordersUsed(); // remember if borders were active
  let tweaks = grid.firstChild ? grid.firstChild.classList : false; // save tweaks(opacity, random color)
  while(grid.firstChild){
    grid.removeChild(grid.firstChild);
  }

  // add new squares to grid
  for(let i = 0; i < squareNumber; i++){
    let newSquare = square.cloneNode()
    if(tweaks) newSquare.classList = tweaks; // inherit tweaks if they exist
    grid.append(newSquare);
  }

  // add borders to new squares if they were used with old squares
  if(borders == true) toggleSquareBorders();
}

// check if borders are on or off
function squareBordersUsed(){
  const grid = document.querySelector(".grid");

  // return false if grid is empty
  if(!grid.firstElementChild) return false;

  // return true of false, depending on square borders
  return grid.firstChild.style.border == "thin solid black" ? true : false;
}

// turn borders on or off
function toggleSquareBorders(){
  const grid = document.querySelector(".grid");

  if(squareBordersUsed()){
    for(const square of grid.children){
      square.style.border = "none";
    }
  } else {
    for(const square of grid.children){
      square.style.border = "thin solid black";
    }
  }
}

// toggle class for all squares
function toggleSquareClass(classToToggle){
  const grid = document.querySelector(".grid");
  for(const square of grid.children){
    square.classList.toggle(classToToggle);
  }
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
        target.style.backgroundColor = "black";
        break;
      case "square opacity":
        target.style.backgroundColor = "black";
        target.style.opacity = `${Number(target.style.opacity) + 0.1}`
        break;
      case "square random":
        target.style.backgroundColor = getRandomRGB();
        break;
      // becase of pressing order there is two cases for random color + opacity
      case "square random opacity":
        target.style.backgroundColor = getRandomRGB();
        target.style.opacity = `${Number(target.style.opacity) + 0.1}`
        break;
      case "square opacity random":
        target.style.backgroundColor = getRandomRGB();
        target.style.opacity = `${Number(target.style.opacity) + 0.1}`
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
        toggleSquareBorders();
        break;
      case "opacity":
        toggleSquareClass("opacity");
        target.style.backgroundColor = target.style.backgroundColor == "lime" ? "" : "lime";
        break;
      case "random-color":
        toggleSquareClass("random");
        target.style.backgroundColor = target.style.backgroundColor == "lime" ? "" : "lime";
        break;
    }
  })
}
