import * as THREE from 'three';
import KeyboardState from '../../libs/util/KeyboardState.js';
import { enemy, enemy2, enemy3 } from "./enemySettings.js";
import { cameraHolder, reset, scene } from "./main.js";
import checkingCollision from "./collisionMechanic.js";
import { degreesToRadians } from "../../libs/util/util.js";

const geometry = new THREE.ConeGeometry(.7, 2.7, 30);
const airplaneMaterial = new THREE.MeshLambertMaterial({ color: 0xFAFAD2 });
export var airplane = new THREE.Mesh(geometry, airplaneMaterial);
export var cd = 0;
airplane.position.set(0, 27, 40);
airplane.rotateX(degreesToRadians(-90));

var keyboard = new KeyboardState();
export function keyboardUpdate() {
  keyboard.update();
  if (keyboard.pressed("left")) airplane.translateX(-.3);
  if (keyboard.pressed("right")) airplane.translateX(.3);
  if (keyboard.pressed("up")) airplane.translateY(.3);
  if (keyboard.pressed("down")) airplane.translateY(-.3);
  if (keyboard.pressed("ctrl")) shoot();
  if (keyboard.pressed("space")) shoot();
}

export var missiles = [];
export function shoot() {
  if (cd!=5) { cd++; return; } else cd = 0;
  const missileGeometry = new THREE.SphereGeometry(0.4, 14, 10);
  const material = new THREE.MeshLambertMaterial({ color: 0x202020 });
  var missile = new THREE.Mesh(missileGeometry, material);
  missiles.push(missile);
  missile.position.set(airplane.position.x, airplane.position.y, airplane.position.z);
  cameraHolder.add(missile);

  setInterval(() => {
    missile.translateZ(-0.2);

    if (missile.position.z >= 160) {
      cameraHolder.remove(missile);
      missiles = missiles.filter((p) => p.id !== missile.id);
      return;
    }

    enemy.forEach((enemyHit) => {
      if (checkingCollision(missile, enemyHit)) {
        cameraHolder.remove(missile);
        scene.remove(missile);
        enemyHit.position.set(0, 0, 0);
        cameraHolder.remove(enemyHit);
        scene.remove(enemyHit);
        return;
      }
    });
    enemy2.forEach((enemyHit2) => {
      if (checkingCollision(missile, enemyHit2)) {
        cameraHolder.remove(missile);
        scene.remove(missile);
        enemyHit2.position.set(0, 0, 0);
        cameraHolder.remove(enemyHit2);
        scene.remove(enemyHit2);
        return;
      }
    });
    enemy3.forEach((enemyHit3) => {
      if (checkingCollision(missile, enemyHit3)) {
        cameraHolder.remove(missile);
        scene.remove(missile);
        enemyHit3.position.set(0, 0, 0);
        cameraHolder.remove(enemyHit3);
        scene.remove(enemyHit3);
        return;
      }
    });
  }, "10");

  return;
}
