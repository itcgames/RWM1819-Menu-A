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
}

/* Used for demo Purposes */
function main()
{
  //Creating the canvas
  var ctx;
  var canvas;
  canvas = document.createElement("canvas");
  canvas.id = 'mycanvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);

  var mManager = new MenuManager(); //Create menuManager

  mManager.addScene("Splash", new Scene('#f4b942')); //Add new scene to the manager
  mManager.draw(ctx); //Draw the current scene

  sleep(3); //Sleep for 1 second

  mManager.removeScene("Splash");
  mManager.draw(ctx);

  console.log("Working");
}


class MyCustomButton
{
  constructor()
  {
    this.highlighted = false; //This will be used by the MenuManager
    this.rect = new MMRect(0, 0, 100, 100); //Rectangle of position 0,0 and a Width and Height of 100 
  }

  update(dt)
  {
    this.rect.setPosition(this.x, this.y);
  }

  draw(ctx)
  {

  }
}