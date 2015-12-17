function Block(row, col, color, x, y){
    this.row = row;
    this.col = col;
    this.color = color;
    this.state = BlockState.None;
    this.ticksToRemove = 0;
    this.removeTick = 0;
}; 