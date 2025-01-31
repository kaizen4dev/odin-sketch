function updateGrid(gridSize){
  // select/create grid and single square
  const grid = document.querySelector(".grid");
  const square = document.createElement("div");

  // find number and size of new squares
  const squareNumber = gridSize ** 2;
  const squareSize = Math.sqrt((grid.clientHeight * grid.clientWidth) / squareNumber)

  // apply styles/classes to new squares
  square.style.width = `${squareSize}px`;
  square.style.height = `${squareSize}px`;
  square.classList.add("square")

  // remove old squares from grid
  while(grid.firstChild){
    grid.removeChild(grid.firstChild)
  }

  // add new squares to grid
  for(let i = 0; i < squareNumber; i++){
    grid.append(square.cloneNode());
  }
}
