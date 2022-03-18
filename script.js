const gridContainer = document.querySelector('.gridContainer');
const grid = document.createElement('div');
grid.classList.add('grid');
gridContainer.appendChild(grid)

// show size of grid
const showSize = document.querySelector('.showSize');
const sizeNumber = document.createElement('p');
showSize.appendChild(sizeNumber);

//button for reset
const resetButton = document.querySelector('.resetButton');
const rainbowButton = document.querySelector('.rainbowButton');
const blackButton = document.querySelector('.blackButton');

const defaultSize = 16;
const inputSize = document.querySelector('.inputSize');

//get random color for rainbow and apply
const colorValue =() => {
  return Math.floor(Math.random() * 256);
}

let count = 0;
const rainbow = (e) => {
  let randomColor = "rgb(" + colorValue() + "," + colorValue() + "," + colorValue() + ")";
  count += 1;
  if (e.target.matches('.square')) {
    if (count % 10 === 0) {
      e.target.style.backgroundColor = "rgb(0,0,0)";
    } else {
    e.target.style.backgroundColor = randomColor ;}
  }
}
//

//reset the grid
const reset = () => {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  createGrid(inputSize.value)
}

//create the grid with size
const createGrid = (size) => {

  sizeNumber.textContent = `${size}x${size}`;

  for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {

      const square = document.createElement('div');
      square.classList.add('square')

      //set size of square and
      const squareSize = 370 / size;
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      square.style.background = "white";

      square.style.gridArea = `${y} / ${x} / ${y + 1} / ${x + 1}`; 

      grid.appendChild(square);
    }
  }  
}

const updateGrid = (size) => {
  reset();
  createGrid(size);
}

const blackColor = (e) => {
  if (e.target.matches('.square')) {
    e.target.classList.add('active');
  }
}

const rainbowColor = () => {
  grid.removeEventListener('mouseover', blackColor);
  grid.addEventListener('mouseover',rainbow );
  
}

const backToBlack = () => {
  grid.removeEventListener('mouseover', rainbow);
  grid.addEventListener('mouseover', blackColor );
}

grid.addEventListener('mouseover', blackColor);
resetButton.addEventListener('click', reset);
rainbowButton.addEventListener('click', rainbowColor);
blackButton.addEventListener('click', backToBlack);

createGrid(defaultSize);