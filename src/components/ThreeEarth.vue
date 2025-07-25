<script setup>



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