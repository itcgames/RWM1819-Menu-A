'use strict';
var gameNs = {};

/* Used for demo Purposes */
function main()
{
  var game = new Game();
  gameNs.game = game;

  game.initGame();
  gameLoop();
}

function gameLoop()
{
  gameNs.game.update();
  gameNs.game.draw();

  window.requestAnimationFrame(gameLoop);
}
