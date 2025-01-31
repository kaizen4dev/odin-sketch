function updateGrid(gridSize){
  // select/create grid and single square
  const grid = document.querySelector(".grid");
  const square = document.createElement("div");

  // find number and size of new squares
  const squareNumber = gridSize ** 2;
  const squareSize = Math.sqrt((grid.clientHeight * grid.clientWidth) / squareNumber);

  // apply styles/classes to new squares
  square.style.width = `${squareSize}px`;
  square.style.height = `${squareSize}px`;
  square.classList.add("square");

  // remove old squares from grid
  let borders = squareBordersUsed(); // remember if borders were active
  while(grid.firstChild){
    grid.removeChild(grid.firstChild);
  }

  // add new squares to grid
  for(let i = 0; i < squareNumber; i++){
    grid.append(square.cloneNode());
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
    for(square of grid.children){
      square.style.border = "none";
    }
  } else {
    for(square of grid.children){
      square.style.border = "thin solid black";
    }
  }
}
