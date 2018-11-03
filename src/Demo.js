'use strict';

class Demo
{
  constructor()
  {
    this.ctx;
    this.menuManager = new MenuManager();


    this.menuManager.addScene("Splash", new Scene()); //Add a new scene named 'Splash'
    this.menuManager.removeScene("Splash"); //Remove the scene named 'Splash'
  }

  update()
  {
    this.menuManager.update();
  }

  draw()
  {
    this.menuManager.draw(this.ctx);
  }
}
