let board;
let size = 80;
let c;
let red;
let yellow;
let winner;
let end;
const boardX = 50;
const boardY = 50;
const spacing = 10;

function setup() {
  createCanvas(1000, 1000);
  red = color('#f65058ff');
  yellow = color('#fbde44ff');
  c = red;
  board = new Board(6, 7, size, spacing);
  end = false;
  let width = board.cols * size;
  let height = board.rows * size;
  rect(boardX, boardY, width, height);
  let d = board.getDiameter();
  let points = board.getPoints();
  for (let i = 0; i < points.length; i++) {
    let rowPoints = points[i];
    for (let j = 0; j < rowPoints.length; j++) {
      circle(boardX + rowPoints[j].x, boardY + rowPoints[j].y, d);
    }
  }
}

function draw() {
  //ellipse(mouseX, mouseY, 80, 80);
  if (end) {
    background(0,0,0,200);
    textSize(64);
    noStroke();
    fill(c);
    text(winner + " Wins!", (boardX + board.cols * size) / 2 - 100, (boardY + board.rows * size) / 2);
    noLoop();
  }
}

// on mouse click, draws the circle if the mouse click is valid
// also switches color for the next time
function mouseClicked() {
  noStroke();
  fill(c);
  let col = snap(mouseX, true);
  let row = snap(mouseY, false);
  if (typeof(col) !== 'undefined' && typeof(row) !== 'undefined') {
    let coord = checkFilled(col, row);
    if (coord) {
      let point = board.getPoints()[coord[0]][coord[1]];
      circle(boardX + point.x, boardY + point.y, board.getDiameter());
      if (board.checkWin(coord[1], coord[0])) {
        end = true;
        if (c === red) {
          winner = "Red";
        } else {
          winner = "Yellow";
        }
      } else {
        if (c === red) {
          c = yellow;
        } else {
          c = red;
        }
      }
    }
  }
}

// returns the next open point in the column
function checkFilled(col, row) {
  let points = board.getPoints();
  for (let i = points.length - 1; i >= 0; i--) {
    let point = points[i][col];
    if (point.color == null) {
      point.setColor(c);
      return [i, col];
    }
  }
}

// given the x or y coordinate, fits to a grid point
// if the coordinate is outside a grid point, returns undefined
function snap(x, isX) {
  x = x - boardX;
  let d = board.getDiameter();
  let cell;
  if (x >= spacing && x <= d + spacing) {
    cell = 0;
  } else if (x >= d + 2 * spacing && x <= 2 * d + 2 * spacing) {
    cell = 1;
  } else if (x >= 2 * d + 3 * spacing && x <= 3 * d + 3 * spacing) {
    cell = 2;
  } else if (x >= 3 * d + 4 * spacing && x <= 4 * d + 4 * spacing) {
    cell = 3;
  } else if (x >= 4 * d + 5 * spacing && x <= 5 * d + 5 * spacing) {
    cell = 4;
  } else if (x >= 5 * d + 6 * spacing && x <= 6 * d + 6 * spacing) {
    cell = 5;
  } else if (isX && x >= 6 * d + 7 * spacing && x <= 7 * d + 7 * spacing) {
    cell = 6;
  }
  return cell;
}