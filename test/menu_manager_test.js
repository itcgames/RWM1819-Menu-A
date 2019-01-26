/* Testing */
var mManager = new MenuManager(); //Create a menu manager

/* Scene class, this is only defined in the test to avoid conflicts */
class Scene {
    /**
    * Constructor
    * @param {!name} str the name of the scene
    * @param {!colour} colour the colour of the screen
    */
    constructor(name, colour) {
        this.colour = colour;
        this.name = name;
    }
    /**
    * Updates the current scene
    */
    update() {
    }
    /**
    * Draws the current scene
    * @param {!ctx} context The context of the window, used for drawing
    */
    draw(ctx) {
        ctx.fillStyle = this.colour; //Set colour to the passed in colour
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

/* MenuScene class, this is only defined in the test to avoid conflicts */
class MenuScene {
  /**
  * Constructor
  * @param {!colour} colour the colour of the screen
  */
  constructor(colour) {
      this.colour = colour;
  }
  /**
  * Updates the current scene
  */
  update() {
  }
  /**
  * Draws the current scene
  * @param {!ctx} context The context of the window, used for drawing
  */
  draw(ctx) {
      ctx.fillStyle = this.colour; //Set colour to the passed in colour
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}

/* Button class, this is only defined in the test to avoid conflicts */
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


//Create our scenes
var scenes = [
  new Scene("Scene1", "#f48942"),
  new Scene("Scene2", "#f4f141"),
  new Scene("Scene3", "#55f441"),
  new Scene("Scene4", "#41f4e8"),
  new Scene("Scene5", "#136fd8"),
  new Scene("Scene6", "#b312d8")
];


var ctx;
var canvas;
canvas = document.createElement("canvas");
canvas.id = 'mycanvas';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = this.canvas.getContext("2d");
document.body.appendChild(this.canvas);

/**
* Loop for a specified amount of time (essentially pausing the execution of the program)
* @param {!milliseconds} int The amount of milliseconds to pause for
*/
function sleep(milliseconds) { //Sleep function
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

/**
* Updates and draws a specified scene
* @param {!name} str The name of the scene to update and draw
*/
function drawScene(name, sleepTime){
  mManager.setCurrentScene(name);
  mManager.update();
  mManager.draw(ctx);
  sleep(sleepTime);
  expect(mManager.scenes.size).to.equal(3);
} //Draw a scene for testing purposes

describe('MenuManager', function () {
  'use strict';

  it('exists', function () { //Checking that menu manager exists and all of its functions are defined
    expect(MenuManager).to.be.a('function');
    expect(mManager.addScene).to.be.a('function');
    expect(mManager.removeScene).to.be.a('function');
    expect(mManager.fadeTo).to.be.a('function');
    expect(mManager.setCurrentScene).to.be.a('function');
    expect(mManager.setFadeSpeed).to.be.a('function');
    expect(mManager.update).to.be.a('function');
    expect(mManager.draw).to.be.a('function');
    expect(mManager.setButtonAllignment).to.be.a('function');
    expect(mManager.setButtonStartAndSpacing).to.be.a('function');
    expect(mManager.addButtonToScene).to.be.a('function');
  });

  //Add 6 scenes
  it('Add 6 Scenes', function () {
    mManager.addScene(scenes[0].name, scenes[0]);
    mManager.addScene(scenes[1].name, scenes[1]);
    mManager.addScene(scenes[2].name, scenes[2]);
    mManager.addScene(scenes[3].name, scenes[3]);
    mManager.addScene(scenes[4].name, scenes[4]);
    mManager.addScene(scenes[5].name, scenes[5]);
    expect(mManager.scenes.size).to.equal(6); //Should have 6 scenes in the map
  });

  it('Delete 3 Scenes', function () {
    mManager.removeScene("Scene6");
    mManager.removeScene("Scene5");
    mManager.removeScene("Scene4");
    expect(mManager.scenes.size).to.equal(3);
  });

  it('Draw Scene1', function () {
      drawScene("Scene1",1000);
  });

  it('Draw Scene2', function () {
      drawScene("Scene2", 1000);
  });

  it('Draw Scene3', function () {
      drawScene("Scene3", 1000);
  });

  it('Fade Test', function () {
    mManager.fadeSpeed = 500;
    mManager.fadeTo("Scene1"); //Set it to fade to "Scene1"

    var start = new Date().getTime(); //Start timer

    while(true)
    {
      if ((new Date().getTime() - start) > 2000){ // If  seconds have passed
        break;
      }
      //Update/draw the scene
      mManager.update();
      mManager.draw(ctx);
    }

    expect(mManager.current.key).to.equal("Scene1"); //Should be at scene1 now after the fade
  });

  //Testing button allignment
  it('Button Allignment test', function (){
    var playButton = new Button(0,0, 150, 50, "PLAY");
    var optionsButton = new Button(0,0,150, 50, "OPTIONS");
    var exitButton = new Button(0,0,150, 50, "EXIT");
    var menuScene = new MenuScene("#42f4f4");
    mManager.removeScene("Main Menu");
    mManager.addScene("Main Menu", menuScene); //Add the main menu to the menu manager
    mManager.setCurrentScene("Main Menu"); //Make main menu the current scene
    mManager.setButtonAllignment("Main Menu");
    //Set the buttons to start at 400, 150 and have 150 pixels between each other on the Y axis
    mManager.setButtonStartAndSpacing(400, 150, 0, 150); 

    //Add the 3 buttons to the scene
    mManager.addButtonToScene("Main Menu", playButton, true);
    mManager.addButtonToScene("Main Menu", optionsButton, true);
    mManager.addButtonToScene("Main Menu", exitButton, true);

    mManager.draw(ctx);
  });

  it('Testing Widgets', function (){
    // var playButton = new Button(0,0, 150, 50, "PLAY");
    // var optionsButton = new Button(0,0,150, 50, "OPTIONS");
    // var exitButton = new Button(0,0,150, 50, "EXIT");
    // var menuScene = new MenuScene("#42f4f4");
    // mManager.removeScene("Main Menu");
    // mManager.addScene("Main Menu", menuScene); //Add the main menu to the menu manager
    // mManager.setCurrentScene("Main Menu"); //Make main menu the current scene
    // mManager.setButtonAllignment("Main Menu");
    // //Set the buttons to start at 400, 150 and have 150 pixels between each other on the Y axis
    // mManager.setButtonStartAndSpacing(400, 150, 0, 150); 

    // //Add the 3 buttons to the scene
    // mManager.addButtonToScene("Main Menu", playButton, true);
    // mManager.addButtonToScene("Main Menu", optionsButton, true);
    // mManager.addButtonToScene("Main Menu", exitButton);

    // mManager.draw(ctx);
  });
});
