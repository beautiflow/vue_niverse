<script setup>
import SideNavbar from "@/components/SideNavbar.vue";
import {onMounted, ref} from "vue";
import {getJsonAxios} from "@/axios.js";
import {useRoute} from "vue-router";
const route = useRoute();

const community = ref({
  id : '',
  title: '',
  content: '',
  author: '',
  createDate: '',
  updateDate: '',
});

onMounted(async () => {
  const id = route.params.id
  const res = await getJsonAxios(`/board/${id}`)
  community.value = res.data;
  console.log(community.value);
})
</script>

<template>
  <SideNavbar />
  <h1 class="title">Community Page</h1>

  <div class="community-page">
    <div class="post">
      <h2 class="post-title">{{ community.title }}</h2>
      <p class="meta">
        작성자: {{ community.author }} | 작성일: {{ community.createdAt }} | ID: {{ community.id }}
      </p>
      <p class="post-content">{{ community.content }}</p>

      <div class="post-buttons">
        <button class="btn update-btn">Update</button>
        <button class="btn delete-btn">Delete</button>
      </div>
    </div>
  </div>
</template>
<style scoped>

.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.table-section {
  width: 100%;
}

.table-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.table-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.community-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.post {
  margin-bottom: 40px;
}

.post-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
}

.meta {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.post-content {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-wrap; /* 줄바꿈 유지 */
}

.post-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.update-btn {
  background-color: #3498db;
}

.update-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c0392b;
}


</style>
