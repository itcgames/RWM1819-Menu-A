'use strict';

function sleep(seconds) { //Sleep function
  var t = seconds * 1000;
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > t){
      break;
    }
  }
}

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

//Demo game class
class Game
{
  constructor()
  {
    this.mManager = new MenuManager();

    this.mManager.addScene("Splash", new Scene('#2111dd')); //Add a splash scene to the manager
    this.mManager.addScene("Main Menu", new Scene('#dd6d11')) //Add a main menu to the manager

    this.mManager.fadeSpeed = 4000; //Set the fade in/out to last 4 seconds

    //Fade from our blue splash screen to our orange menu scene
    this.mManager.fadeTo("Main Menu"); //Fade from splash to main
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
