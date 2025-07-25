<script setup>
import { ref, onMounted } from 'vue'
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, PointLight, SphereGeometry, MeshBasicMaterial, Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


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

console.log("props = ", props)


</script>

<template>
<div>
    Earth<br />
     <hr />
    사용자 위도: {{ props.userPosition.lat }}<br />
    사용자 경도: {{ props.userPosition.lng }}
    <hr />
    iss 위도: {{ props.userPosition.lat }}<br />
    iss 경도: {{ props.userPosition.lng }}
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