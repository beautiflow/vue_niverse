<script setup>
import { ref, onMounted } from 'vue';
import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry,
  MeshBasicMaterial, Mesh, AmbientLight, PointLight
  } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as THREE from 'three';



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

  // const textureLoader = new THREE.TextureLoader();
  // const earthTexture = textureLoader.load('/earth.png'); 

const createEarth = () => {
  const geometry = new SphereGeometry(1, 64, 64);
  const material = new MeshBasicMaterial({ color: '#141A2E' });
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
  controls.autoRotate = true;
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
    iss 위도: {{ userPosition.lat }}<br />
    iss 경도: {{ userPosition.lng }}
</div>

  <canvas ref="canvasRef"></canvas>
   <!-- <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Earth />
          {position && (
            <Marker lat={position.lat} lng={position.lng} color="#00ff9d" />
          )}
          {issLocation && (
            <Marker lat={issLocation.lat} lng={issLocation.lng} color="#ff4d4d" size={0.03} />
          )}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div> -->
</template>



<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}

</style>