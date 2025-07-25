<script setup>
import { ref } from 'vue'

import SideNavbar from '@/components/SideNavbar.vue';
const showModal = ref(false);
const community = ref({
  title: '',
  content: '',
  author: '',
  createDate: '',
  updateDate: '',
  
})
const openModal = () => {
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
}
</script>

<template>
      <SideNavbar />

  <div>community page</div>
    <button @click="openModal">Create</button>

    <!-- 모달 -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <h2>새 게시물 작성</h2>
        <label>
          제목:
          <input v-model="title" type="text" />
        </label>
        <label>
          내용:
          <textarea v-model="content"></textarea>
        </label>

        <div class="modal-buttons">
          <button @click="save">저장</button>
          <button @click="closeModal">취소</button>
        </div>
      </div>
    </div>
</template>


<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 300px;
}

.modal-content label {
  display: block;
  margin-bottom: 1rem;
}

.modal-content input,
.modal-content textarea {
  width: 100%;
  padding: 0.4rem;
  margin-top: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>