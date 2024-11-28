
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera,renderer.domElement);

//fazendo uma bola
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("terra.jpg"),
});
const earthMesh = new THREE.Mesh(geometry,material);
scene.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
    map
})
const lightsMesh = new THREE.Mesh(geometry,lighMat)

const stars = getStarfield(numStars: 10000);
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2,-0.5,1.5);
scene.add(sunLight);
