<script setup>

import SideNavbar from '@/components/SideNavbar.vue';

</script>


<template>
    <div class="nowiss-layout">
      <SideNavbar />
      <div class="nowiss-content">
        <div>NowISS View</div>
        <h1>안녕하세요</h1>
        <p>반갑습니다.</p>
      </div>
  </div>
</template>



<style scoped>
.nowiss-layout {
  display: flex;
  padding-left: 270px;
}

.nowiss-content {
  flex: 1;
  padding: 24px;
}
</style>