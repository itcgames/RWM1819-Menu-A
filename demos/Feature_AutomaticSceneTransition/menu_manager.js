'use strict';

/* Menu Manager Tuple class, help with scene management */
class MenuManagerTuple
{
  constructor()
  {
    this.key = undefined; //String
    this.value = undefined; //Scene object
  }
}


/* Menu Manager */
class MenuManager
{
  /**
  * Constructor
  */
  constructor()
  {
    this.scenes = new Map(); //Create our Map
    this.current = new MenuManagerTuple(); //Set the current scene to undefined

    //Transition variables
    this.fadeSpeed = 2000; //Speed fade in/out in milliseconds
    this.fading = false; //Boolean to hold if we are fading in/out currently
    this.fadeStartTime; //The time the fade in/out started at
    this.fadeAlpha = 1.0; //The alpha we will draw with
    this.sceneToFadeTo = ""; //The scene we want to fade to
  }

  /**
  * Adds a scene to the menu manager
  * @param {!name} str Name/Key of the scene
  * @param {!scene} obj The scene object itself
  */
  addScene(name, scene)
  {
    if(this.scenes.has(name))
    {
      throw("There is already scene named " + name);
    }

    this.scenes.set(name, scene); //add scene to our map, with the key 'name'

    if(this.current.value == undefined) //automatically sets current to the first scene added
    {
      console.log("current set");
      this.current.value = this.scenes.get(name);
      this.current.key = name;
    }
  }

  /**
  * Updates the current active scene
  */
  update() //Updates the current scene
  {
    if(this.current.value !== undefined)
    {
      this.current.value.update();
    }
    if(!this.fading && this.current.value.sceneEnded)
    {
      this.fadeTo(this.current.value.autoFadeToScene);
      console.log("Fading to scene automatically to scene")
    }

    if(this.fading)
    {
      var timePassed = new Date().getTime() - this.fadeStartTime;

      if(timePassed >= this.fadeSpeed && this.current.key !== this.sceneToFadeTo){
        this.setCurrentScene(this.sceneToFadeTo);
      }

      if(timePassed >= this.fadeSpeed * 2){
        this.fading = false;
        this.fadeAlpha = 1;
      }

      if(timePassed >= this.fadeSpeed && timePassed <= (this.fadeSpeed * 2)){
        timePassed -= this.fadeSpeed; //Take the fadespeed away from the timepassed
        this.fadeAlpha = timePassed / this.fadeSpeed;
      }
      else {//Fade out the current scene
        this.fadeAlpha = 1 - (timePassed / this.fadeSpeed);
      }
    }
  }
  /**
  * Draws the currently active scene
  * @param {!ctx} context Context of the window
  */
  draw(ctx) //Draws the current scene using the window context
  {
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height); //Clear the canvas

    //Draw the current scene if there is one
    if(this.current.value !== undefined)
    {
      //Set the global alpha if it is not set
      if(ctx.globalAlpha !== this.fading){
        ctx.globalAlpha = this.fadeAlpha;
      }
      this.current.value.draw(ctx); //Pass ctx to the scene for drawing
    }
    else //If no scene is selected then draw RED to the canvas
    {
      ctx.fillStyle = "#FF0000"; //Set colour to RED
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); //Fill the canvas
    }
  }

  /**
  * Removes a scene from the scene manager
  * @param {!name} str The name of the scene to be removed
  */
  removeScene(name)
  {
    if(this.scenes.has(name)) //If the key 'name' is in the map
    {
      this.scenes.delete(name); //Delete the scene

      if(this.scenes.keys.length === 0)
      {
        this.current.value = undefined;
        this.current.key = undefined;
      }
    }
  }

  /**
  * Fades to a new scene
  * @param {!name} str Name of the scene to fade to
  */
  fadeTo(name) //Set it to fade from one scene to another
  {
    if(this.scenes.has(name)) {
      this.fading = true;
      this.fadeStartTime = new Date().getTime(); //Get the time
      this.sceneToFadeTo = name; //The name of the scene to fade to
    }
    else {
      console.log("No scene with name " + name);
    }
  }

  /**
  * Sets the scene that from fades to when it ends
  * @param {!from} str Name of the scene to fade from
  * @param {!to} str Name of the scene to fade to
  */
  setAutoFadeTo(from, to)
  {
    //If our scenes array has both scenes named (from) and (to)
    if(this.scenes.has(from) && this.scenes.has(to)){
      //Set the scene from to auto fade to the scene named to automatically
      this.scenes.get(from).autoFadeToScene = to;
    }
    //Else output a message
    else {
      console.log("Menu manager does not contain a scene named either: " + from + " or " + to);
    }
  }

   /**
  * Sets the current scene using the paramater 'name'
  * @param {!name} str Name of the scene to set as the active scene
  */
  setCurrentScene(name)
  {
    if(this.scenes.has(name)){
      this.current.value = this.scenes.get(name); //Set the current scene value
      this.current.key = name; //Set the current key name
    }
    else{
      throw("No scene in dictionary that goes by the name of " + name);
    }
  }

  /**
  * Sets the speed at which the scenes fade in and out from
  * @param {!speed} int The speed of the fade in/out in milliseconds
  */
  setFadeSpeed(speed)
  {
    this.fadeSpeed = speed;
  }
}
