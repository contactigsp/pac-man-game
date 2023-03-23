// ========================== LOAD IMAGES ==========================
let images = [
  "pac-man-game/img/pac-man-down.png",
  "pac-man-game/img/pac-man-left.png",
  "pac-man-game/img/pac-man-right.png",
  "pac-man-game/img/pac-man-up.png",
];

// Loads the images one at a time, then calls the callback function when all images
// have been loaded
function loadImages(images, index, callback) {
  if (index < images.length) {
    let img = new Image();
    img.src = images[index];
    images[index] = img;
    images[index].onload = function () {
      loadImages(images, ++index, callback);
    };
  } else {
    callback(images);
  }
}
window.onload = function () {
  loadImages(images, 0, (images) => {
    // Your slideshow code goes here. This is just example code
    // of adding the images to your document once they are all loaded
    images.forEach((item) => {
      document.querySelector("load")?.appendChild(item);
    });
  });
};

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

// Starting position of pac-man

class PacMan {
  constructor(startIndex) {
    this.startIndex = startIndex;
    this.pacManCurrentIndex = startIndex;
  }
}

let pacManCurrentIndex = 490;

const pacMan = new PacMan(490);

function removePacMan() {
  const img = squares[pacManCurrentIndex].querySelector("img");

  if (img) {
    squares[pacManCurrentIndex].removeChild(img);
    squares[pacManCurrentIndex].classList.remove("pac-man");
  }
}

function drawPacMan(side) {
  const img = document.createElement("img");

  img.classList.add("pac-man-img");
  img.setAttribute("src", `pac-man-game/img/pac-man-${side}.png`);

  squares[pacManCurrentIndex].appendChild(img);
  squares[pacManCurrentIndex].classList.add("pac-man");
}

//   Move pac-man
squares[pacManCurrentIndex].classList.add(".pac-man");

// squares[pacManCurrentIndex].setAttribute("src", images[1]);

drawPacMan("left");

function movePacMan(e) {
  squares[pacManCurrentIndex].classList.remove("pac-man");
  // removePacMan();

  switch (e.keyCode) {
    case 37: // left arrow
      if (
        pacManCurrentIndex % width !== 0 &&
        !squares[pacManCurrentIndex - 1].classList.contains("wall")
      ) {
        removePacMan();

        pacManCurrentIndex -= 1;
        drawPacMan("left");
      }

      // Check if pac-man is in the left exit
      if (pacManCurrentIndex - 1 === 363) {
        removePacMan();
        pacManCurrentIndex = 390;

        drawPacMan("left");
      }

      break;
    case 38: // up arrow
      if (
        pacManCurrentIndex - width >= 0 &&
        !squares[pacManCurrentIndex - width].classList.contains("wall")
      ) {
        removePacMan();

        pacManCurrentIndex -= width;
        drawPacMan("up");
      }

      break;
    case 39: // right arrow
      if (
        pacManCurrentIndex % width < width - 1 &&
        !squares[pacManCurrentIndex + 1].classList.contains("wall")
      ) {
        // Check if pac-man is in the right exit

        removePacMan();

        pacManCurrentIndex += 1;
        drawPacMan("right");
      }

      if (pacManCurrentIndex + 1 === 392) {
        removePacMan();
        pacManCurrentIndex = 365;

        drawPacMan("right");
      }

      break;
    case 40: // down arrow
      if (
        pacManCurrentIndex + width < width * width &&
        !squares[pacManCurrentIndex + width].classList.contains("wall") &&
        !squares[pacManCurrentIndex + width].classList.contains("ghost-lair")
      ) {
        removePacMan();

        pacManCurrentIndex += width;
        drawPacMan("down");
      }

      break;
  }

  squares[pacManCurrentIndex].classList.add("pac-man");
  // drawPacMan();

  pacDotEaten();
  powerPelletEaten();
  checkForGameOver();
  checkForWin();
  ghosts.forEach((ghost) => scaredGhostEaten(ghost));
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
      console.log(ghost.isScared);
      setTimeout(unScareGhost, 10000);
      squares[pacManCurrentIndex].classList.remove("power-pellet");
      eatenPowerPelletsByPacMan.push(
        squares.indexOf(squares[pacManCurrentIndex])
      );
    });
  }
}

// Make the ghosts stop flashing
function unScareGhost() {
  ghosts.forEach((ghost) => {
    ghost.isScared = false;
  });
}

// Create Ghosts using Constructors
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.timerId = NaN;
    this.isScared = false;
  }
}

const ghosts = [
  new Ghost("blinky-", 348, 250),
  new Ghost("pinky-", 376, 400),
  new Ghost("inky-", 351, 300),
  new Ghost("clyde-", 379, 500),
];

// Draw ghosts onto the grid

ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add("ghost", ghost.className);
});

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
      squares[ghost.currentIndex].classList.remove(
        "ghost",
        ghost.className,
        "scared-ghost"
      );

      // Change the current index to the new safe square
      ghost.currentIndex += direction;

      // Change Ghost's image according to the result of the variable 'direction'

      if (!ghost.isScared) {
        switch (direction) {
          case +1:
            let strA = ghost.className.slice(0, ghost.className.indexOf("-"));
            ghost.className = `${strA}-right`;
            break;
          case -1:
            let strB = ghost.className.slice(0, ghost.className.indexOf("-"));
            ghost.className = `${strB}-left`;
            break;
          case width:
            let strC = ghost.className.slice(0, ghost.className.indexOf("-"));
            ghost.className = `${strC}-down`;
            break;
          case -width:
            let strD = ghost.className.slice(0, ghost.className.indexOf("-"));
            ghost.className = `${strD}-up`;
            break;
        }
      }

      // Redraw the ghost in the new safe space
      squares[ghost.currentIndex].classList.add("ghost", ghost.className);

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

    ghosts.forEach((ghost) => scaredGhostEaten(ghost));
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
    squares[ghost.currentIndex].classList.remove(
      "ghost",
      ghost.className,
      "scared-ghost"
    );
    ghost.currentIndex = ghost.startIndex;
    score += 100;
    squares[ghost.currentIndex].classList.add("ghost");
  }
}

// Check for game over
function checkForGameOver() {
  if (
    squares[pacManCurrentIndex].classList.contains("ghost") &&
    !squares[pacManCurrentIndex].classList.contains("scared-ghost")
  ) {
    squares[pacManCurrentIndex].classList.remove("pac-man");
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
