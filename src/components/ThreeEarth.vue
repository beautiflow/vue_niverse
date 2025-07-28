<script setup>
import { ref, onMounted, watch } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import earthImg from '@/assets/earth.png';


const props = defineProps({
  userPosition: {
    type: Object,
    required: true,
  },
   issPosition: {
    type: Object,
    required: true,
  }
});
let issMarker = null;

const canvasRef = ref(null)

const initScene = () => {
  const scene = new THREE.Scene();
  return scene;
}

const initCamera = (sizes) => {
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
  camera.position.set(0, 0, 2.5);
  return camera;
}

const initRenderer = (canvas) => {
  const renderer = new THREE.WebGLRenderer({ canvas });
  return renderer;
}

  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load(earthImg); 

const createEarth = () => {
  const geometry = new THREE.SphereGeometry(0.8, 64, 64);
    // const material = new MeshBasicMaterial({ color: '#141A2E' });
const material = new THREE.MeshBasicMaterial({
  map: earthTexture, 
});
const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

const latLngToVector3 = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

  const createMarker = (position, color) => {
  const geometry = new THREE.SphereGeometry(0.01, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color });
  const marker = new THREE.Mesh(geometry, material);
  marker.position.copy(position);
  return marker;
}

const setThree = () => {
  const sizes = { width: 800, height: 600 }
  const scene = initScene();
  const camera = initCamera(sizes);
  const renderer = initRenderer(canvasRef.value);
  renderer.setSize(sizes.width, sizes.height);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const earth = createEarth();
  scene.add(earth);

  const userPoint = latLngToVector3(props.userPosition.lat, props.userPosition.lng, 0.8);
  const issPoint = latLngToVector3(props.issPosition.lat, props.issPosition.lng, 0.8);

  console.log("userVec = ", userPoint);
  console.log("issVec = ", issPoint);

  // 마커 추가
  const userMarker = createMarker(userPoint, '#69F2A0'); 
  issMarker = createMarker(issPoint, '#F24D63');
  scene.add(userMarker);
  scene.add(issMarker);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.2;

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

watch(() => props.issPosition, (newPos) => {
  if (issMarker) {
    const newISS = latLngToVector3(newPos.lat, newPos.lng, 0.8);
    issMarker.position.set(newISS.x, newISS.y, newISS.z);
  }
}, { deep: true });


</script>

<template>
  <canvas ref="canvasRef">
    
  </canvas>
</template>



<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}

</style>