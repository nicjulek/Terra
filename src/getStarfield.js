import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}) {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    //angulos em coordenadas esféricas
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    //convertidos em coordenadas cartesianas
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,//define cor azul
      minDist: radius,
    };
  }
  const verts = [];
  const colors = [];
  const positions = [];
  let col;
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();//posicao aleatoria
    const { pos, hue } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());//cor e brilho aleatorios
    verts.push(pos.x, pos.y, pos.z);//adiciona a coordenada na lista correspondente 
    colors.push(col.r, col.g, col.b);//adiciona a cor na lista correspondente 
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ //rederiza as estrelas
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load(
      "./texturas/circulo.png"
    ),
  });
  const points = new THREE.Points(geo, mat);
  return points;
}