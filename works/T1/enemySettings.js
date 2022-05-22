import { reset, scene } from "./main.js";
import { airplane } from "./airplane.js";
import { Color, CullFaceNone } from '../../build/three.module.js';
import checkingCollision from "./collisionMechanic.js";
import * as THREE from "three";

export var enemy = [];
export function placeEnemy() 
{
    let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xB03014 });
    var theEnemy = new THREE.Mesh(cubeGeometry,cubeMaterial);
    let randomPosition = Math.random() * (30 - -30) + -30;
    scene.add(theEnemy);
    enemy.push(theEnemy);
    theEnemy.position.set(randomPosition, 2, -40);

  setInterval(() => 
  {
    theEnemy.translateZ(0.2);
    if (theEnemy.position.z <= -100) 
    {
      scene.remove(theEnemy);
      enemy = enemy.filter((e) => e.id !== theEnemy.id);
      return;
    }

    if (checkingCollision(airplane, theEnemy)) 
    {
      scene.remove(theEnemy);
      deathAnimation();
      reset();
      return;
    }
  }, "10");
  return;
}

function deathAnimation()
{
  setInterval(() =>
        {
        airplane.rotateY(-1);
        }, "10000");
}