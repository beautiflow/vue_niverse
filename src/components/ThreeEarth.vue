<script setup>
import { ref, onMounted } from 'vue';
import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry,
   Mesh, AmbientLight, PointLight
  } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import earthImg from '@/assets/earth.png';


defineProps({
  userPosition: {
    type: Object,
    required: true,
  },
   issPosition: {
    type: Object,
    required: true,
  }
});

const canvasRef = ref(null)

const initScene = () => {
  const scene = new Scene();
  return scene;
}

const initCamera = (sizes) => {
  const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
  camera.position.set(0, 0, 2.5);
  return camera;
}

const initRenderer = (canvas) => {
  const renderer = new WebGLRenderer({ canvas });
  return renderer;
}

  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load(earthImg); 

const createEarth = () => {
  const geometry = new SphereGeometry(1, 64, 64);
const material = new THREE.MeshBasicMaterial({
  map: earthTexture, 
});
const mesh = new Mesh(geometry, material);
  return mesh;
}
const setThree = () => {
  const sizes = { width: 800, height: 600 }
  const scene = initScene();
  const camera = initCamera(sizes);
  const renderer = initRenderer(canvasRef.value);
  renderer.setSize(sizes.width, sizes.height);

  const ambientLight = new AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  const earth = createEarth();
  scene.add(earth);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.5;

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

onMounted(() => {
  if (canvasRef.value) {
    setThree();
  }
})


</script>

<template>
<div>
    Earth<br />
     <hr />
    사용자 위도: {{ userPosition.lat }}<br />
    사용자 경도: {{ userPosition.lng }}
    <hr />
    iss 위도: {{ issPosition.lat }}<br />
    iss 경도: {{ issPosition.lng }}
</div>

  <canvas ref="canvasRef"></canvas>
</template>



<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}

</style>