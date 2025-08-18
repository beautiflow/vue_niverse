<script setup>
import SideNavbar from "@/components/SideNavbar.vue";
import {onMounted, ref} from "vue";
import {getBoardAxios} from "@/axios.js";
import {useRoute , useRouter} from "vue-router";
import CreateModal from "@/components/CreateCommunity.vue";
const route = useRoute();
const router = useRouter();

const showModal = ref(false);
const selectedBoard = ref(null);

const community = ref({
  id : '',
  title: '',
  content: '',
  author: '',
  createDate: '',
  updateDate: '',
});

const updateBoard = async (updateBoard) => {
  try{
    const data = {
      title: updateBoard.title,
      content: updateBoard.content,
    };
    const id = route.params.id
    const res = await getBoardAxios.put(`/board/${id}`, data);
    showModal.value = false;
    community.value = res.data;
  }catch (error){
    console.error('Error updating board: ', error)
  }
}

const goToList = () => {
  router.push({
    name: 'Community',
  });
}

const openModal = () => {
  selectedBoard.value = community.value;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(async () => {
  const id = route.params.id
  const res = await getBoardAxios(`/board/${id}`)
  community.value = res.data;
  console.log("community value = ", community.value);
})
</script>

<template>
  <SideNavbar />
  <h1 class="title">Community Page</h1>

  <div class="community-page">
    <hr />
    <div class="post">
      <h2 class="post-title">{{ community.title }}</h2>
      <p class="meta">
        작성자: {{ community.author }} |
        <span v-if="community.createdAt !== community.updatedAt">
          수정일: {{ new Date(community.updatedAt).toLocaleString() }}
        </span>
        <span v-else>
          작성일: {{ new Date(community.createdAt).toLocaleString() }}
        </span>
        | ID: {{ community.id }}
      </p>
      <p class="post-content">{{ community.content }}</p>

      <div class="post-buttons">
        <button class="btn list-btn" @click="goToList" data-tooltip="go to List"><i class="fa-solid fa-list"></i></button>
        <button class="btn update-btn" @click="openModal" data-tooltip="update"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="btn delete-btn" data-tooltip="delete"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    </div>
    <hr />

  </div>

  <teleport to="#modal">
    <CreateModal
      :showModal="showModal"
      :board="selectedBoard"
      @closeModal="closeModal"
      @updateBoard="updateBoard"
    />
  </teleport>

  <CreateModal v-if="showModal" />
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
  white-space: pre-wrap;
}

.post-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
  position: relative;
}

.list-btn{
  background-color: #ffffff;
  color: #181818;
  border: 1px solid #666666;
}

.list-btn:hover{
  background-color: #181818;
  color: #ffffff;
  border: 1px solid #666666;
}

.update-btn {
  background-color: #ffffff;
  color: #3498db;
  border: 1px solid #3498db;
}

.update-btn:hover {
  color: #ffffff;
  background-color: #3498db;
}

.delete-btn {
  background-color: #ffffff;
  color: #e74c3c;
  border: 1px solid  #e74c3c;
}

.delete-btn:hover {
  color: #ffffff;
  background-color: #e74c3c;
}

.btn::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 150%;
  left: 50%;
  transform: translateX(-50%);

  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;

  padding: 8px 12px;
  border-radius: 8px;
  white-space: nowrap;

  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
}

.btn::before {
  content: '';
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);

  border: 8px solid transparent;
  border-top-color: #ccc;

  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
}

.btn:hover::after,
.btn:hover::before {
  visibility: visible;
  opacity: 1;
}


</style>
