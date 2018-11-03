'use strict';

class MenuManager
{
  constructor()
  {
    this.scenes = new Map(); //Create our Map
    this.current = undefined; //Set the current scene to undefined
  }

  addScene(name, scene)
  {
    if(this.scenes.has(name))
    {
      throw("There is already scene named " + name);
    }

    this.scenes.set(name, scene); //add scene to our map, with the key 'name'

    if(this.current == undefined) //automatically sets current to the first scene added
    {
      console.log("current set");
      this.current = this.scenes.get(name);
    }
  }

  update() //Updates the current scene
  {
    if(this.current !== undefined)
    {
      this.current.update();
    }
  }

  draw(ctx) //Draws the current scene using the window context
  {
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height); //Clear the canvas

    if(this.current !== undefined)
    {
      this.current.draw(ctx); //Pass ctx to the scene for drawing
    }
    else //If no scene is selected then draw RED to the canvas
    {
      ctx.fillStyle = "#FF0000"; //Set colour to RED
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); //Fill the canvas
    }
  }

  removeScene(name)
  {
    if(this.scenes.has(name))
    {
      this.scenes.delete(name);

      if(this.scenes.keys.length === 0)
      {
        this.current = undefined;
      }
    }
  }

  setAutoTransition(sceneA, sceneB) //Automatically transition from sceneA to SceneB
  {
    //TBI
  }

  setCurrentScene(name)
  {
    if(this.scenes.has(name))
    {
      this.current = this.scenes.get(name);
    }
    else //Temporary
    {
      throw("No scene in dictionary that goes by the name of " + name);
    }
  }
}
