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


//Demo game class
class Game
{
  constructor()
  {
    this.mManager = new MenuManager();
    this.mManager.addScene("Options", new Scene('#ffffff')) //Add an options menu to the manager
    this.mManager.setCurrentScene("Options"); //Make moptions the current scene

    //Tell the menu manager to create a slider using the following parameters and return it
    var audioSlider = this.mManager.createSlider(200, 300, 300, 15, 0, 100, "Audio Slider");
    var playButton = this.mManager.createMenuButton(200, 200, 300, 50, "Play Button", "PLAY");
    var audioRadioButton = this.mManager.createRadioButton(350, 100, 50, "Audio Checkbox", false);

    //Add the slider to the menu manager
    this.mManager.addButtonToScene("Options", audioSlider, false);
    this.mManager.addButtonToScene("Options", playButton, false);
    this.mManager.addButtonToScene("Options", audioRadioButton, false);

    document.addEventListener("MMButtonHighlighted", this.buttonHighlighted.bind(this));
    document.addEventListener("MMButtonUnhighlighted", this.buttonUnhighlighted.bind(this));
    document.addEventListener("MMButtonPressed", this.buttonPressed.bind(this));
  }

  
  buttonHighlighted(e)
  {
    console.log("Caught event for button highlight");
    e.detail.button.fillColour = "#4bc64f";
  }

  buttonUnhighlighted(e)
  {
    console.log("Caught event for button unhighlight");
    e.detail.button.fillColour = "#ffffff";
  }

  buttonPressed(e)
  {
    console.log("Caught event for button pressed");
    e.detail.button.text = "CLICKED";
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
