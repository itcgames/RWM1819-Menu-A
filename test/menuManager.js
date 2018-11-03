/* global MenuManager, describe, it, expect, should */

var mManager = new MenuManager(); //Create a menu manager

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


function sleep(milliseconds) { //Sleep function
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function drawScene(name){
  mManager.setCurrentScene(name);
  mManager.update();
  mManager.draw(ctx);
  sleep(2250);
  expect(mManager.scenes.size).to.equal(3);
} //Draw a scene for testing purposes

describe('MenuManager', function () {
  'use strict';

  it('exists', function () { //Checking that menu manager exists and all of its functions are defined
    expect(MenuManager).to.be.a('function');
    expect(mManager.addScene).to.be.a('function');
    expect(mManager.removeScene).to.be.a('function');
    expect(mManager.setAutoTransition).to.be.a('function');
    expect(mManager.setCurrentScene).to.be.a('function');
    expect(mManager.update).to.be.a('function');
    expect(mManager.draw).to.be.a('function');
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
      drawScene("Scene1");
  });

  it('Draw Scene2', function () {
      drawScene("Scene2");
  });

  it('Draw Scene3', function () {
      drawScene("Scene3");
  });
});
