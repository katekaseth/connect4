class Board {
  constructor(rows, cols, size, spacing) {
    this.rows = rows;
    this.cols = cols;
    this.size = size;
    this.spacing = 10;
    this.points = new Array(rows);

    let width = cols * size;
    let height = rows * size;
    this.d = (height - 70) / rows;
    
    for (let i = 0; i < rows; i++ ) { 
      let rowPoints = new Array(cols);
      let y = (this.d / 2 + spacing) + (i * (this.d + this.spacing));
      for (let j = 0; j < cols; j++) {
        let x = (this.d / 2 + spacing) + (j * (this.d + this.spacing));
        rowPoints[j] = new Point(x, y);
      }
      this.points[i] = rowPoints;
    }
  }
  
  getPointCoord(cell) {
     return (this.d / 2 + this.spacing) + (cell * (this.d + this.spacing));
  }
  
  getDiameter() {
    return this.d; 
  }
  
  getPoints() {
    return this.points;
  }
  
  checkWin(col, row) {
    // check column
    let c = this.points[row][col].color;
    for (let i = this.rows - 1; i >= 3; i--) {
      if (this.points[i][col].color === c && this.points[i - 1][col].color === c && 
          this.points[i - 2][col].color === c && this.points[i - 3][col].color === c) {
        return true;
      }
    }
    // check row
    for (let i = 0; i <= 3; i++) {
      if (this.points[row][i].color === c && this.points[row][i + 1].color === c && 
          this.points[row][i + 2].color === c && this.points[row][i + 3].color === c) {
        return true; 
      }
    }
    // check down-right diagonal
    let sCol = col;
    let sRow = row;
    while (sCol > 0 && sRow > 0) {
      sCol--;
      sRow--;
    }
    for (let i = 0; i < 3; i++) {
      if (sCol + i < 4 && sRow + i < 3 && 
          this.points[sRow + i][sCol + i].color === c && this.points[sRow + i + 1][sCol + i + 1].color === c &&
          this.points[sRow + i + 2][sCol + i + 2].color === c && 
          this.points[sRow + i + 3][sCol + i + 3].color === c) {
          return true;
      }
    }
    // check down-left diagonal
    sCol = col;
    sRow = row;
    while (sCol < this.cols - 1 && sRow > 0) {
      sCol++;
      sRow--;
    }
    for (let i = 0; i < 3; i++) {
      if (sCol - i >= 3 && sRow + i < 3 && 
          this.points[sRow + i][sCol - i].color === c && this.points[sRow + i + 1][sCol - i - 1].color === c &&
          this.points[sRow + i + 2][sCol - i - 2].color === c && 
          this.points[sRow + i + 3][sCol - i - 3].color === c) {
          return true;
      }
    }
    return false;
  }
}