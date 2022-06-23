import { cameraHolder, reset, scene } from "./main.js";
import { airplane } from "./airplane.js";
import checkingCollision from "./collisionMechanic.js";
import * as THREE from "three";

var angle = 0;
var angle2 = 0;
var speed = 0.05;
var animationOn = true;
export var enemy = [];
export var enemy2 = [];
export var enemy3 = [];
export function placeVerticalEnemy() {
  let cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xB03014 });
  var theEnemy = new THREE.Mesh(cubeGeometry, cubeMaterial);
  let randomPosition = Math.random() * (30 - -30) + -30;
  cameraHolder.add(theEnemy);
  enemy.push(theEnemy);
  theEnemy.position.set(randomPosition, 27, -40);

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

export function placeHorizontalEnemy() {
  let cubeGeometry2 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const cubeMaterial2 = new THREE.MeshLambertMaterial({ color: 0xFAFAD2 });
  var theEnemy2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
  let randomPosition = Math.random() * (30 - -30) + -30;
  cameraHolder.add(theEnemy2);
  enemy2.push(theEnemy2);
  theEnemy2.position.set(-40, 27, randomPosition);

  setInterval(() => {
    theEnemy2.translateX(0.15);
    if (theEnemy2.position.x <= -100) {
      cameraHolder.remove(theEnemy2);
      enemy2 = enemy2.filter((e) => e.id !== theEnemy2.id);
      return;
    }

    if (checkingCollision(airplane, theEnemy2)) {
      cameraHolder.remove(theEnemy2);
      //deathAnimation();
      reset();
      return;
    }
  }, "10");
  return;
}

export function placeReverseHorizontalEnemy() {
  let cubeGeometry3 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const cubeMaterial3 = new THREE.MeshLambertMaterial({ color: 0x202020 });
  var theEnemy3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3);
  let randomPosition = Math.random() * (30 - -30) + -30;
  cameraHolder.add(theEnemy3);
  enemy3.push(theEnemy3);
  theEnemy3.position.set(40, 27, randomPosition);

  setInterval(() => {
    theEnemy3.translateX(-0.15);
    if (theEnemy3.position.x <= -100) {
      cameraHolder.remove(theEnemy3);
      enemy3 = enemy3.filter((e) => e.id !== theEnemy3.id);
      return;
    }

    if (checkingCollision(airplane, theEnemy3)) {
      cameraHolder.remove(theEnemy3);
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