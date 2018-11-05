'use strict';

/* Demo Class Not to Be Used, for user guide only */
class DemoClassNTBU 
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
