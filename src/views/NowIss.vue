<script setup>
import SideNavbar from '@/components/SideNavbar.vue';
import ThreeEarth from '@/components/ThreeEarth.vue';
import { ref, onMounted } from 'vue';

const userloading = ref(true);
const issLoading = ref(true);

// 사용자 현재 위치 가져오기
const userPosition = ref({ 
  lat: null, lng: null 
});

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userPosition.value = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }
        console.log("lat = ", userPosition.value.lat , " lng = ", userPosition.value.lng);
        userloading.value = false;
      },
      (err) => {
        console.error('위치 정보를 가져올 수 없습니다.', err);
        userloading.value = false;
      }
    )
  } else {
    console.error('위치 정보가 지원되지 않습니다.');
    userloading.value = false;
  }
});

// ISS 위치 가져오기
const IssPosition = ref({ lat: null, lng: null});

onMounted(() => {
  let isConnected = true;
    
  async function fetchISS() {
    try {
      const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      if (!res.ok) {
        throw new Error('ISS 위치 정보를 가져올 수 없습니다.');
      }
      const data = await res.json();
      if (isConnected) {
        IssPosition.value = { 
          lat: data.latitude, 
          lng: data.longitude }
      }
      console.log("iss lat = ", IssPosition.value.lat , " lng = ", IssPosition.value.lng);

    } catch (error) {
      console.error("ISS Fetch Error:", error);
      if (isConnected) {
        console.error('ISS 위치 정보를 가져오는 데 실패했습니다.');
        issLoading.value = false;
      }
    }
  }
  fetchISS();
  const intervalId = setInterval(fetchISS, 10000); // 10초마다 업데이트

  return () => {
    isConnected = false;
    clearInterval(intervalId);
  };
})
</script>

<template>
  <SideNavbar />
  <div class="nowiss-layout">
    <div class="nowiss-content">
      <div className="nowiss-header">
        <h1 className="nowiss-header-title">
          ISS 실시간 위치 추적
        </h1>
      </div>
      <div v-if="issLoading && !userloading">
        <div class="space-y-4 mb-8">
          <div>
            <p class="text-center text-cyan-300 text-xl">
              🛰️ ISS 현재 위치: 위도 {{ IssPosition.lat }}° / 경도 {{ IssPosition.lng }}°
            </p>
          </div>
          <div>
            <p class="text-center text-[#00ff9d] text-xl">
              👤 내 현재 위치: 위도 {{ userPosition.lat }}° / 경도 {{ userPosition.lng }}°
            </p>
          </div>
          <!-- <div v-if="issError">
            <p class="text-center text-red-500">{{ issError }}</p>
          </div> -->
        </div>
        <!-- Three.js 컴포넌트에 ISS 위치 전달 -->
        <div class="rounded-xl overflow-hidden shadow-2xl mb-8">
          <!-- 위치 표시 설명 추가 -->
          <div class="bg-black/50 p-4 text-center space-y-2">
            <p class="text-[#00ff9d]">🟢 초록색 점: 내 현재 위치</p>
            <p class="text-red-400">🔴 빨간색 점: ISS 🛰️ 위치</p>
          </div>
          <ThreeEarth :user-position="userPosition" :iss-position="IssPosition" />
        </div>
      </div>
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

.nowiss-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem; 
}

.nowiss-header-title {
  font-size: 1.875rem;           
  font-weight: bold;             
  color: #ffffff;                
  text-align: center;            
  margin-bottom: 0.5rem;         
  text-shadow: 0 0 10px rgb(2, 5, 215); 
}
</style>