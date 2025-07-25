<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import HomeView from '@/views/HomeView.vue'
</script>

<template>
  <div class="container">
    <!-- 왼쪽 영역 -->
    <div class="left-panel">
      <header>
        <img alt="Vue logo" class="logo" src="@/assets/earthLogo.jpg" width="125" height="125" />
        <div class="wrapper">
          <HelloWorld msg="You did it!" />
        </div>
      </header>
    </div>

    <!-- 오른쪽 영역 -->
    <div class="right-panel">
      <HomeView />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 반반 나누기 */
  height: 100vh;
}

.left-panel,
.right-panel {
  padding: 2rem;
  overflow-y: auto;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  text-align: center;
}

/* 반응형 유지 */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }

  .left-panel,
  .right-panel {
    padding: 1rem;
  }
}
</style>
