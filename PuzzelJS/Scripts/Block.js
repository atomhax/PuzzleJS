function Block(row, col, color, img, x, y, visible)
{
    //Game Data
    this.row = row;
    this.col = col;
    this.color = color;

    //Image Data
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.visible = true;

};