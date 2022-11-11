console.log("hello world !!");

const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
let score = 0;
const width = 28; //28 x 28 = 784 squares
const eatenDotsByGhosts = [];
const eatenDotsByPacMan = [];
const eatenPowerPelletsByGhosts = [];
const eatenPowerPelletsByPacMan = [];

//   layout of grid and what is in the squares
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

//   Legend:
// 0 - pac-dot
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const squares = [];
//   Draw the grid and render it
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    squares.push(square);

    // To keep track of squares's index
    square.setAttribute("id", i);

    // Add layout to board
    if (layout[i] === 0) {
      squares[i].classList.add("pac-dot");
    } else if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add("ghost-lair");
    } else if (layout[i] === 3) {
      squares[i].classList.add("power-pellet");
    } else if (layout[i] === 4) {
      squares[i].classList.add("empty");
    }
  }
}

createBoard();

// Pac-man images
let pacManImg = "/img/pac-man-right.png";

// Draw pac-man
function drawPacMan() {
  let image = document.createElement("img");
  image.setAttribute("src", pacManImg);
  squares[pacManCurrentIndex].appendChild(image);
  image.classList.add("pac-man-img");
  squares[pacManCurrentIndex].classList.add("pac-man");
}
// Remove pac-man
function removePacMan() {
  let image = squares[pacManCurrentIndex].querySelector("img");
  if (image) {
    image.classList.remove("pac-man-img");
    squares[pacManCurrentIndex].removeChild(image);
    squares[pacManCurrentIndex].classList.remove("pac-man");
  }
}

// Starting position of pac-man

let pacManCurrentIndex = 490;

drawPacMan();

//   Move pac-man
function movePacMan(e) {
  removePacMan();

  switch (e.keyCode) {
    case 37: // left arrow
      if (
        pacManCurrentIndex % width !== 0 &&
        !squares[pacManCurrentIndex - 1].classList.contains("wall")
      ) {
        pacManCurrentIndex -= 1;
        pacManImg = "/img/pac-man-left.png";
      }

      // If pac-man tries to eat a non scared ghost
      if (
        squares[pacManCurrentIndex - 1].classList.contains("ghost") &&
        !squares[pacManCurrentIndex - 1].classList.contains("scared-ghost")
      ) {
        let ghostName = squares[pacManCurrentIndex - 1].querySelector("img");
        pacManCurrentIndex -= 1;
        pacManImg = `/img/${ghostName.className}-right.png`;
      }

      // Check if pac-man is in the left exit
      if (pacManCurrentIndex - 1 === 363) {
        pacManCurrentIndex = 390;
      }

      break;
    case 38: // up arrow
      if (
        pacManCurrentIndex - width >= 0 &&
        !squares[pacManCurrentIndex - width].classList.contains("wall")
      ) {
        pacManCurrentIndex -= width;
        pacManImg = "/img/pac-man-up.png";
      }

      // If pac-man tries to eat a non scared ghost
      if (
        squares[pacManCurrentIndex - width].classList.contains("ghost") &&
        !squares[pacManCurrentIndex - width].classList.contains("scared-ghost")
      ) {
        let ghostName =
          squares[pacManCurrentIndex - width].querySelector("img");
        pacManCurrentIndex -= width;
        pacManImg = `/img/${ghostName.className}-down.png`;
      }
      break;
    case 39: // right arrow
      if (
        pacManCurrentIndex % width < width - 1 &&
        !squares[pacManCurrentIndex + 1].classList.contains("wall")
      ) {
        // Check if pac-man is in the right exit
        pacManCurrentIndex += 1;
        pacManImg = "/img/pac-man-right.png";
      }

      // If pac-man tries to eat a non scared ghost
      if (
        squares[pacManCurrentIndex + 1].classList.contains("ghost") &&
        !squares[pacManCurrentIndex + 1].classList.contains("scared-ghost")
      ) {
        let ghostName = squares[pacManCurrentIndex + 1].querySelector("img");
        pacManCurrentIndex += 1;
        pacManImg = `/img/${ghostName.className}-left.png`;
      }
      if (pacManCurrentIndex + 1 === 392) {
        pacManCurrentIndex = 365;
      }
      break;
    case 40: // down arrow
      if (
        pacManCurrentIndex + width < width * width &&
        !squares[pacManCurrentIndex + width].classList.contains("wall") &&
        !squares[pacManCurrentIndex + width].classList.contains("ghost-lair")
      ) {
        pacManCurrentIndex += width;
        pacManImg = "/img/pac-man-down.png";
      }

      // If pac-man tries to eat a non scared ghost
      if (
        squares[pacManCurrentIndex + width].classList.contains("ghost") &&
        !squares[pacManCurrentIndex + width].classList.contains("scared-ghost")
      ) {
        let ghostName =
          squares[pacManCurrentIndex + width].querySelector("img");
        pacManCurrentIndex += width;
        pacManImg = `/img/${ghostName.className}-up.png`;
      }
      break;
  }

  drawPacMan();

  ghosts.forEach((ghost) => scaredGhostEaten(ghost));

  pacDotEaten();
  powerPelletEaten();
  checkForGameOver();
  checkForWin();
}

// When pac-man eats a pac-dot
function pacDotEaten() {
  if (squares[pacManCurrentIndex].classList.contains("pac-dot")) {
    squares[pacManCurrentIndex].classList.remove("pac-dot");
    score++;
    scoreDisplay.innerHTML = score;
    eatenDotsByPacMan.push(squares.indexOf(squares[pacManCurrentIndex]));
  }
}

// What happens when you eat a power-pellet
function powerPelletEaten() {
  if (squares[pacManCurrentIndex].classList.contains("power-pellet")) {
    score += 10;
    ghosts.forEach((ghost) => {
      ghost.isScared = true;
      setTimeout(unScareGhost, 10000);
      squares[pacManCurrentIndex].classList.remove("power-pellet");
      eatenPowerPelletsByPacMan.push(
        squares.indexOf(squares[pacManCurrentIndex])
      );
      ghost.img = "/img/scared.png";
    });
  }
}

// Make the ghosts stop flashing
function unScareGhost() {
  ghosts.forEach((ghost) => {
    ghost.isScared = false;
    ghost.img = `/img/${ghost.className}-right.png`;
  });
}

// Create Ghosts using Constructors
class Ghost {
  constructor(className, startIndex, speed, img) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.img = img;
    this.currentIndex = startIndex;
    this.timerId = NaN;
    this.isScared = false;
  }
}

const ghosts = [
  new Ghost("blinky", 348, 250, "/img/blinky-left.png"),
  new Ghost("pinky", 376, 400, "/img/pinky-down.png"),
  new Ghost("inky", 351, 300, "/img/inky-right.png"),
  new Ghost("clyde", 379, 500, "/img/clyde-up.png"),
];

// Draw ghosts onto the grid

function drawGhost(ghost) {
  let image = document.createElement("img");
  image.setAttribute("src", ghost.img);
  squares[ghost.currentIndex].appendChild(image);
  image.classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add("ghost");
}

ghosts.forEach((ghost) => drawGhost(ghost));

function removeGhost(ghost) {
  let image = squares[ghost.currentIndex].querySelector("img");
  if (image) {
    image.classList.remove(ghost.className);
    squares[ghost.currentIndex].removeChild(image);
    squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
  }
}

// Move the ghosts randomly
ghosts.forEach((ghost) => moveGhost(ghost));

// Function to move Ghosts randomly
function moveGhost(ghost) {
  const directions = [+1, -1, width, -width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    // If the next square your ghost is going to go in does NOT contain a wall and a ghost, you can go there
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      // You can go there
      // remove all ghost related classes
      removeGhost(ghost);

      // Change the current index to the new safe square
      ghost.currentIndex += direction;

      // Change Ghost's image according to the result of the variable 'direction'

      if (ghost.img !== "/img/scared.png") {
        switch (direction) {
          case +1:
            ghost.img = `/img/${ghost.className}-right.png`;
            break;
          case -1:
            ghost.img = `/img/${ghost.className}-left.png`;
            break;
          case width:
            ghost.img = `/img/${ghost.className}-down.png`;
            break;
          case -width:
            ghost.img = `/img/${ghost.className}-up.png`;
            break;
        }
      }

      // Redraw the ghost in the new safe space
      drawGhost(ghost);

      // Else find a new direction to try
    } else direction = directions[Math.floor(Math.random() * directions.length)];

    // If the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }

    // If Ghost meets pac-dot
    if (
      squares[ghost.currentIndex].classList.contains("pac-dot") &&
      squares[ghost.currentIndex].classList.contains("ghost")
    ) {
      squares[ghost.currentIndex].classList.remove("pac-dot");
      eatenDotsByGhosts.push(squares.indexOf(squares[ghost.currentIndex]));
    }

    // If Ghost meets power-pellet
    if (
      squares[ghost.currentIndex].classList.contains("power-pellet") &&
      squares[ghost.currentIndex].classList.contains("ghost")
    ) {
      squares[ghost.currentIndex].classList.remove("power-pellet");
      eatenPowerPelletsByGhosts.push(
        squares.indexOf(squares[ghost.currentIndex])
      );
    }

    // Redraw eaten dots by Ghosts
    eatenDotsByGhosts.forEach((dot) => {
      if (
        !squares[dot].classList.contains("ghost") &&
        !eatenDotsByPacMan.includes(dot) &&
        !squares[dot].classList.contains("pac-man")
      ) {
        squares[dot].classList.add("pac-dot");
      }
    });

    // Redraw eaten power pellets by Ghosts
    eatenPowerPelletsByGhosts.forEach((powerPellet) => {
      if (
        !squares[powerPellet].classList.contains("ghost") &&
        !eatenPowerPelletsByPacMan.includes(powerPellet) &&
        !squares[powerPellet].classList.contains("pac-man")
      ) {
        squares[powerPellet].classList.add("power-pellet");
      }
    });
    checkForGameOver();
  }, ghost.speed);
}

// Check if pac-man ate a scared ghost
function scaredGhostEaten(ghost) {
  // If ghost is scared and pac-man runs into it
  if (
    ghost.isScared &&
    squares[ghost.currentIndex].classList.contains("pac-man")
  ) {
    removeGhost(ghost);
    ghost.currentIndex = ghost.startIndex;
    score += 100;
    drawGhost(ghost);
  }
}

// Check for game over
function checkForGameOver() {
  if (
    squares[pacManCurrentIndex].classList.contains("ghost") &&
    !squares[pacManCurrentIndex].classList.contains("scared-ghost")
  ) {
    removePacMan();
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", movePacMan);
    setTimeout(function () {
      alert("Game Over!");
    }, 500);
    scoreDisplay.innerHTML = "GAME OVER";
  }
}

// Check for a win
function checkForWin() {
  if (score === 274 || score > 274) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", movePacMan);
    scoreDisplay.innerHTML = "YOU WON!";
    setTimeout(function () {
      alert("YOU WON!");
    }, 500);
  }
}

document.addEventListener("keyup", movePacMan);
