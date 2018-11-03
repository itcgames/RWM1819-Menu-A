'use strict';

class Scene
{
  constructor(name, colour)
  {
    this.colour = colour;
    this.name = name;
  }

  update()
  {
    console.log("updating " + this.name + " scene");
  }

  draw(ctx)
  {
    ctx.fillStyle = this.colour; //Set colour to the passed in colour
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
  }
}
