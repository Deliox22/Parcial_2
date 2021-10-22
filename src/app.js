// Imports
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

// Configuracion basica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);
const renderer = new THREE.WebGLRenderer({antialias: true});
let loader = new GLTFLoader();

const textureLoader = new THREE.TextureLoader();
let map = textureLoader.load(
  'assets/Texturas/0.png',
);
map.encoding = THREE.sRGBEncoding;
map.flipY = false;

let map2= textureLoader.load(
  'assets/Texturas/1.png',
);
map2.encoding = THREE.sRGBEncoding;
map2.flipY = false;

let map3= textureLoader.load(
  'assets/Texturas/2.png',
);
map3.encoding = THREE.sRGBEncoding;
map3.flipY = false;


let car;
let directionalLight;
let light;
let light2;
let light3;
let light4;

//Dimensionar pantalla
window.onresize = () => {
  scene.background = new THREE.Color('#000000');
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 2, window.innerHeight, true);
};

//Resetear escena
export function reset() {
  scene.children = [];
  renderer.setSize(0, 0, true);
}

// Main
export function main() {
  // Configuracion inicial
  reset();
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
  renderer.shadowMap.enabled = true;
  scene.background = new THREE.Color(0xdddddd);
  document.body.appendChild(renderer.domElement);

  /* const axesHelper = new THREE.axesHelper(20);
  scene.add(axesHelper); */

  // Controls
  cameraConfig();
  controlsConfig();

  // Light
  setupLights();
  
  loadInitialModel()

  // Render
  animate();
}

export function loadInitialModel() {
  loader.load(
    'assets/modelOne/scene.gltf',
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

export function changeModel(assetFolder) {
  scene.children = [];
  // Light
  setupLights();
  loader.load(
    `assets/${assetFolder}/scene.gltf`,
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

//Textura
export function changeTexture() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map;
    }
  });
  //car.material = new THREE.MeshPhongMaterial({ map: map, color: 0xff00ff });
  animate();
}

export function changeTexture2() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map2;
    }
  });
  //car.material = new THREE.MeshPhongMaterial({ map2: map2, color: 0xff00ff });
  animate();
}

export function changeTexture3() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map3;
    }
  });
  //car.material = new THREE.MeshPhongMaterial({ map3: map3, color: 0xff00ff });
  animate();
}


function controlsConfig() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enablePan = false;
}

function cameraConfig() {
  camera.position.x = 8;
  camera.position.y = 2;
  camera.position.z = 8;
}

function setupLights() {
  directionalLight = new THREE.DirectionalLight(0xffffff, 20);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 1.5);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 1.5);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 1.5);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 1.5);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//Update
function updateElements() {
  updateSpotLights();
  updateAmbientLight();
  updateDirectLights();
  updatePointLights();
  renderer.setClearColor(palette.bgColor, 1);
}