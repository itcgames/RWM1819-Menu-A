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

/* Menu Manager Rectangle */
class MMRect
{
  /**
  * MMRect constructor
  * @param {!x} int The X Position of the rectangle
  * @param {!y} int The Y Position of the rectangle
  * @param {!w} int The Width of the rectangle
  * @param {!h} int The Height of the rectangle
  */
  constructor(x, y, w, h)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.min = {x:this.x, y:this.y};
    this.max = {x:this.x + this.w, y:this.y + this.h};
  }

  /**
  * Sets the position of the rectangle
  * @param {!x} int The new X Position of the rectangle
  * @param {!y} int The new Y Position of the rectangle
  */
  setPosition(x, y)
  {
    this.x = x;
    this.y = y;
    this.min = {x:this.x, y:this.y};
    this.max = {x:this.x + this.w, y:this.y + this.h};
  }

  /**
  * Checks if another rectangle intersects this rectangle 
  * @param {!other} MMRect Another rectangle to check collision
  */
  intersects(other)
  {
      // Exit with no intersection if found separated along an axis
    if(this.max.x < other.min.x || this.min.x > other.max.x) return false;
    if(this.max.y < other.min.y || this.min.y > other.max.y) return false;
 
    // No separating axis found, therefor there is at least one overlapping axis
    return true
  }

  draw(ctx)
  {
    ctx.save();
    ctx.strokeStyle = "#db1c1c"; //Red
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}

/* Menu Manager Radio Button */
class MMRadioButton
{
  /**
  * Radio button constructor
  * @param {!x} int The X Position of the radio button
  * @param {!y} int The Y Position of the radio button
  * @param {!r} int The Radius of the radio button
  * @param {!id} str The id of the button
  */
  constructor(x, y, r, id, checked)
  {
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = id;
    this.fillColour = "#000000"; //Set to black
    this.outlineColour = "#000000"; //Set to black
    this.checkRadius = r - 20; //Checked radius is teh radius of the button minus 5
    this.outlineThickness = 10;
    this.highlighted = false;
    this.checked = checked; //Set whether the radio button is checked or not
    this.rect = new MMRect(x - r, y - r, r * 2, r * 2); //Creates a new rectangle
  }

  setFillColour(colour)
  {
    this.fillColour = colour;
  }

  setHighlighted(bool)
  {
    this.highlighted = bool;
  }

  setChecked(bool)
  {
    this.checked = bool;
  }

  check()
  {
    this.checked = !this.checked;
  }

  setOutlineColour(colour)
  {
    this.outlineColour = colour;
  }

  setOutlineThickness(thickness)
  {
    this.outlineThickness = thickness;
  }

  draw(ctx)
  {
    ctx.save(); //Save thhe context state
    ctx.strokeStyle = this.outlineColour;
    ctx.lineWidth = this.outlineThickness;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
      
    //If the checkbox is checked, then draw the inner circle
    ctx.beginPath();
    ctx.strokeStyle = this.fillColour;
    ctx.arc(this.x, this.y, this.checkRadius, 0, 2 * Math.PI);
    if(this.checked)
    {
      ctx.fillStyle = this.fillColour;
      ctx.fill();
    }
    ctx.lineWidth = this.outlineThickness / 2;
    ctx.stroke();

    ctx.restore(); //Restore it
  }
}

class MMSlider
{
  /**
  * Slider constructor
  * @param {!x} int The X Position of the button
  * @param {!y} int The Y Position of the button
  * @param {!w} int The Width of the button
  * @param {!h} int The Height of the button
  * @param {!id} str The id of the button
  */
  constructor(x, y, w, h, minVal, maxVal, id)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.indicator = {x:x + w / 2, y:y + h / 2}; //The position of the indicator (should be at the center)
    this.indicatorColour = "#000000"; //Black for the circle indicator
    this.indicatorSize = 20;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.currentVal = (maxVal - minVal) / 2;
    this.textSize = 20;
    this.textColour = "#ffffff"; //White
    this.text = this.currentVal.toString();
    this.highlighted = false;
    this.id = id; //Set the id of the string
    this.rect = new MMRect(this.indicator.x - 20, this.indicator.y - 20, 40, 40); //Creates a new rectangle for the indicator
  }

  setFillColour(colour)
  {
    this.fillColour = colour;
  }

  setIndicatorColour(colour)
  {
    this.indicatorColour = colour;
  }

  clampIndicatorValue(value)
  {
    //Sets the new value but clamps it to the minimum and maximum values
    if(value < this.minVal)
    {
      this.currentVal = this.minVal;
    }
    else if(value > this.maxVal)
    {
      this.currentVal = this.maxVal;
    }
    else
    {
      this.currentVal = value;
    }

    this.text = this.currentVal.toString();
  }

  setIndicatorValue(value)
  {
    clampIndicatorValue(value);
  }

  increaseValue(amount)
  {
    clampIndicatorValue(this.currentVal + amount);
  }

  decreaseValue(amount)
  {
    clampIndicatorValue(this.currentVal - amount);
  }

  setIndicatorSize(size)
  {
    this.indicatorSize = size;
  }

  setTextSize(size)
  {
    this.textSize = size;
  }

  setTextColour(colour)
  {
    this.textColour = colour;
  }

  draw(ctx)
  {
    ctx.save(); //Save the context state

    ctx.fillStyle = "#f4aa42";
    ctx.fillRect(this.x, this.y, this.w, this.h);

    //Draw the indicator
    ctx.beginPath();
    ctx.fillStyle = this.indicatorColour;
    ctx.arc(this.indicator.x, this.indicator.y, this.indicatorSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //Draw the value of the indicator
    ctx.fillStyle = this.textColour;
    ctx.font = this.textSize.toString() + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h - (this.h / 8));

    ctx.restore(); //Restore it
  }
}


/* Menu Manager Radio Button */
class MMButton
{
  /**
  * Menu button constructor
  * @param {!x} int The X Position of the button
  * @param {!y} int The Y Position of the button
  * @param {!w} int The Width of the button
  * @param {!h} int The Height of the button
  * @param {!id} str The id of the button
  * @param {!text} str The text to display in the button
  */
  constructor(x, y, w, h, id, text = "")
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.text = text;
    this.textSize = 50;
    this.textColour = "#000000"; //Black text
    this.outlineColour = "#000000"; //Black outline colour
    this.fillColour = "#ffffff"; //White
    this.outlineThickness = 5;
    this.highlighted = false;
    this.rect = new MMRect(x, y, w, h); //Creates a new rectangle
  }

  setFillColour(colour)
  {
    this.fillColour = colour;
  }

  setOutlineColour(colour)
  {
    this.outlineColour = colour;
  }

  setTextSize(size)
  {
    this.textSize = size;
  }

  setOutlineThickness(thickness)
  {
    this.outlineThickness = thickness;
  }

  draw(ctx)
  {
    ctx.save(); //Save the context state

    ctx.strokeStyle = this.outlineColour;
    ctx.lineWidth = this.outlineThickness;
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle = this.fillColour;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle = this.textColour;
    ctx.font = this.textSize.toString() + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h - (this.h / 8));

    ctx.restore(); //Restore it
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

    //Allignment variables
    this.useButtonAllignment = new Map(); //A map of bools for our scenes

    //Button variables
    this.sceneButtons = new Map(); //A map of scene buttons
    this.allignedButtons = new Map(); //A map of button indexes which are alligned
    this.buttonSpacingX = 0;
    this.buttonSpacingY = 0; 
    this.buttonStartLocationX = 0;
    this.buttonStartLocationY = 0;

    //Event variables, we wiil use these to fire events on buttons
    this.highlightEvent = new CustomEvent('MMButtonHighlighted', {detail: {button:0}});
    this.unlightedEvent = new CustomEvent('MMButtonUnhighlighted', {detail: {button:0}});
    this.pressedEvent = new CustomEvent('MMButtonPressed', {detail: {button:0}});

    this.mousePosition = {x:0, y:0};
    this.mouseRect = new MMRect(0, 0, 1, 1);
    document.addEventListener("mousemove", this.mouseMove.bind(this));
    document.addEventListener("mousedown", this.mouseDown.bind(this));
    document.addEventListener("MMButtonHighlighted", this.buttonHighlighted.bind(this));
    document.addEventListener("MMButtonUnhighlighted", this.buttonUnhighlighted.bind(this));
    document.addEventListener("MMButtonPressed", this.buttonPressed.bind(this));

    this.mouse = undefined;
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

  /**
  * Updates the mouse position
  * @param {!e} event Mouse event
  */
  mouseMove(e)
  {
    //Check if there is currently a scene
    if(this.current.value !== undefined)
    {
      //Update the mouse position
      this.mousePosition.x = e.offsetX;
      this.mousePosition.y = e.offsetY;
      this.mouseRect.setPosition(e.offsetX, e.offsetY); //Update the mouse rect

      for(let btn of this.sceneButtons.get(this.current.key))
      {
        if(btn.rect.intersects(this.mouseRect))
        {
          //Since we highlighted a button, set the event button to be the highlighted button
          if(btn.highlighted === false)
          {
            //Only fire the event if we havnt fired it already
            this.highlightEvent.detail.button = btn;
            btn.highlighted = true;
            document.dispatchEvent(this.highlightEvent); //Fire that event
          }
          break;
        }
        else if(btn.highlighted) //Else if the button is highlighted and the mouse isnt intersecting it, fire an unhighlighted event
        {
          this.unlightedEvent.detail.button = btn; //Set the button to be in the event
          btn.highlighted = false; //Set highlighted to false
          document.dispatchEvent(this.unlightedEvent); //Fire the unhighlight event
          break;
        }
      }
    }
  }

  /**
  * Updates the mouse position and checks if the left mouse button has been clicked
  * @param {!e} event Mouse event
  */
  mouseDown(e)
  {
    //Check if there is currently a scene
    if(this.current.value !== undefined)
    {
      //Update the mouse position
      this.mousePosition.x = e.offsetX;
      this.mousePosition.y = e.offsetY;
      this.mouseRect.setPosition(e.offsetX, e.offsetY); //Update the mouse rect

      //If the left mouse button is clicked
      if(e.button === 0)
      {
        //Loop through all the buttons for the scene
        for(let btn of this.sceneButtons.get(this.current.key))
        {
          if(btn.rect.intersects(this.mouseRect))
          {
            this.pressedEvent.detail.button = btn;
            document.dispatchEvent(this.pressedEvent);
            break; //Break out as we know we have clicked on a button
          }
        }
      }
    }
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
    this.sceneButtons.set(name, []); //Initialise empty button list
    this.allignedButtons.set(name, []); //Initialise to empty list
    this.useButtonAllignment.set(name, false); //Dont use button allignment for this scene

    if(this.current.value == undefined) //automatically sets current to the first scene added
    {
      this.current.value = this.scenes.get(name);
      this.current.key = name;
    }
  }

  /**
  * Updates the current active scene
  */
  update(dt) //Updates the current scene
  {
    if(this.current.value !== undefined)
    {
      this.current.value.update(dt);
    }
    if(!this.fading && this.current.value.sceneEnded)
    {
      this.fadeTo(this.current.value.autoFadeToScene);
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
    //ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height); //Clear the canvas

    //Draw the current scene if there is one
    if(this.current.value !== undefined)
    {
      //Set the global alpha if it is not set
      if(ctx.globalAlpha !== this.fading){
        ctx.globalAlpha = this.fadeAlpha;
      }
      this.current.value.draw(ctx); //Pass ctx to the scene for drawing

      //If this scene has buttons, draw them
      if(this.sceneButtons.has(this.current.key))
      {
        for(let btn of this.sceneButtons.get(this.current.key))
        {
          btn.draw(ctx);
        }
      }
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

  /**
  * Sets the scene to use button allignment
  * @param {!sceneName} str The name of the scene we want to set the allignment of
  */
  setButtonAllignment(sceneName)
  {
      //If the scene exists
      if(this.scenes.has(sceneName)){
          //Use button allignment
          this.useButtonAllignment.set(sceneName,true); 
      }
  }

    /**
  * Sets the start location of buttons and the space between buttons on the screen
  * @param {!startX} int The starting X position of the buttons
  * @param {!startY} int The starting Y position of the buttons
  * @param {!spaceBetweenX} int The amount of space between the buttons on the X axis
  * @param {!spaceBetweenY} int The amount of space between the buttons on the Y axis
  */
  setButtonStartAndSpacing(startX, startY, spaceBetweenX, spaceBetweenY)
  {
    this.buttonSpacingX = spaceBetweenX;
    this.buttonSpacingY = spaceBetweenY;
    this.buttonStartLocationX = startX;
    this.buttonStartLocationY = startY;
  }

  /**
  * Sets the allignment of buttons for a scene. This allows a user to decide
  * if a scenes buttons should be distributed accross the top/bottom/left/right
  * of the scene
  * @param {!sceneName} str The name of the scene we want to add a button to
  * @param {!button} button The button to add to the scene class
  * @param {!useAllignment} bool Bool to indicate wheter its part of the allignment or not
  */
  addButtonToScene(sceneName, button, useAllignment)
  {
    //If the scene exists
    if(this.scenes.has(sceneName)){

      //Add button to the scene
      this.sceneButtons.get(sceneName).push(button);
      
      //If use allignment, then add it to the allignment map
      if(useAllignment)
      {
        //Add the button index to the list
        this.allignedButtons.get(sceneName).push(this.sceneButtons.get(sceneName).length -1);
      }

      //If using button allignment, allign the button
      if(this.useButtonAllignment.has(sceneName)){
        let loopLength = this.allignedButtons.get(sceneName).length;

        for(let i = 0; i < loopLength; i++)
        {
          //If i is 0, set the x to the start location
          if(i === 0)
          {
            this.sceneButtons.get(sceneName)[this.allignedButtons.get(sceneName)[i]].x = this.buttonStartLocationX;
            this.sceneButtons.get(sceneName)[this.allignedButtons.get(sceneName)[i]].y = this.buttonStartLocationY;
          }
          else
          {
            //Set the x and y of the other buttons
            this.sceneButtons.get(sceneName)[this.allignedButtons.get(sceneName)[i]].x = this.buttonStartLocationX + (this.buttonSpacingX * i);
            this.sceneButtons.get(sceneName)[this.allignedButtons.get(sceneName)[i]].y = this.buttonStartLocationY + (this.buttonSpacingY * i);
          }
        }
      }
    }
  }

  /**
  * Returns a radio button
  * @param {!x} int The X Position of the radio button
  * @param {!y} int The Y Position of the radio button
  * @param {!r} int The Radius of the radio button
  * @param {!id} str The id of the button
  * @return {MMRadioButton}
  */
  createRadioButton(x, y, r, id, checked)
  {
    return new MMRadioButton(x, y, r, id, checked);
  }

  /**
  * Returns a menu button using the parameters passed to it
  *  @param {!x} int The X Position of the button
  * @param {!y} int The Y Position of the button
  * @param {!w} int The Width of the button
  * @param {!h} int The Height of the button
  * @param {!id} str The id of the button
  * @param {!text} str The text to display in the button
  * @return {MMButton} 
  */
  createMenuButton(x, y, w, h, id, text = "")
  {
    return new MMButton(x, y, w, h, id, text);
  }

  /**
  * Returns a slider
  * @param {!x} int The X Position of the button
  * @param {!y} int The Y Position of the button
  * @param {!w} int The Width of the button
  * @param {!h} int The Height of the button
  * @param {!id} str The id of the button
  * @return {MMSlider}
  */
  createSlider(x, y, w, h, minVal, maxVal, id)
  {
    return new MMSlider(x, y, w, h, minVal, maxVal, id);
  }
}

