import { cameraHolder, reset, scene } from "./main.js";
import { airplane } from "./airplane.js";
import { Color, CullFaceNone } from '../../build/three.module.js';
import checkingCollision from "./collisionMechanic.js";
import * as THREE from "three";

var angle = 0;
var angle2 = 0;
var speed = 0.05;
var animationOn = true;
export var enemy = [];
export function placeEnemy() {
  let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xB03014 });
  var theEnemy = new THREE.Mesh(cubeGeometry, cubeMaterial);
  let randomPosition = Math.random() * (30 - -30) + -30;
  cameraHolder.add(theEnemy);
  enemy.push(theEnemy);
  theEnemy.position.set(randomPosition, 2.5, -40);

  setInterval(() => {
    theEnemy.translateZ(0.2);
    if (theEnemy.position.z <= -100) {
      cameraHolder.remove(theEnemy);
      enemy = enemy.filter((e) => e.id !== theEnemy.id);
      return;
    }

    if (checkingCollision(airplane, theEnemy)) {
      cameraHolder.remove(theEnemy);
      //deathAnimation();
      reset();
      return;
    }
  }, "10");
  return;
}

function deathAnimation() {
  setInterval(() => {
    airplane.matrixAutoUpdate = false;

  // Set angle's animation speed
  if(animationOn)
  {
    angle+=speed;
    angle2+=speed*2;
    
    var mat4 = new THREE.Matrix4();
    cylinder.matrix.identity();  // reset matrix

    // Will execute T1 and then R1
    cylinder.matrix.multiply(mat4.makeRotationZ(angle)); // R1
    cylinder.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0)); // T1

    // Will execute R2, T1 and R1 in this order
    cylinder2.matrix.multiply(mat4.makeRotationY(angle2)); // R1
    cylinder2.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0)); // T1
    cylinder2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90))); // R2
  }
  }, "10");
}