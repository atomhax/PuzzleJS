function Block(row, col, color, x, y)
{
    //Game Data
    this.row = row;
    this.col = col;
    this.color = color;

    this.remove = false;
    this.removeTick = 0;
    this.startRemoveAtTick = 0;
    this.fullRemoveAtTick = 0;

    //Unquie Offset
    this.x = x;
    this.y = y;
}; 