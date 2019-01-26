'use strict';

class Scene{ //Basic scene class
  constructor(colour){
    this.colour = colour;
  }
  draw(ctx)
  {
    ctx.fillStyle = this.colour; //Set colour to the passed in colour
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  update()
  {

  }
}

// Basic Button class
class Button {
  /**
  * Constructor
  * @param {!x} int The x position of the button
  * @param {!y} int The y position of the button
  * @param {!w} int The width of the button
  * @param {!h} int The height of the button
  * @param {!text} str The str to display on the button
  */
  constructor(x, y, w, h, text) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.text = text;
  }
  /**
  * Draws the button
  * @param {!ctx} context The context of the window, used for drawing
  */
  draw(ctx) {
      ctx.save();
      ctx.fillStyle = "#000000"; //Set to black
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.fillStyle = "#ffffff"; //Set to white
      ctx.font = "25px Arial";
      ctx.textAlign = "center";
      ctx.fillText(this.text, this.x + (this.w / 2), this.y + (this.h / 2));
      ctx.restore();
  }
}

//Demo game class
class Game
{
  constructor()
  {
    this.mManager = new MenuManager();
    this.mManager.addScene("Main Menu", new Scene('#dd6d11')) //Add a main menu to the manager
    this.mManager.setCurrentScene("Main Menu"); //Make main menu the current scene
    this.mManager.setButtonAllignment("Main Menu");
    //Set the buttons to start at 400, 150 and have 150 pixels between each other on the Y axis
    this.mManager.setButtonStartAndSpacing(400, 150, 0, 150); 

    //Add our buttons to the menu, with a boolean of true to indicate we want the button alligned for us
    this.mManager.addButtonToScene("Main Menu", new Button(0,0, 150, 50, "PLAY"), true);
    this.mManager.addButtonToScene("Main Menu", new Button(0,0, 150, 50, "OPTIONS"), true);
    this.mManager.addButtonToScene("Main Menu", new Button(0,0, 150, 50, "EXIT"), true);
  }
  initGame()
  {
    //Creating the canvas
    this.ctx;
    this.canvas;
    this.canvas = document.createElement("canvas");
    this.canvas.id = 'mycanvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
  }

  update()
  {
    this.mManager.update();
  }

  draw()
  {
    this.mManager.draw(this.ctx);
  }

}
