<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios';

import SideNavbar from '@/components/SideNavbar.vue';
const showModal = ref(false);
    const community = ref({
      id : '',
      title: '',
      content: '',
      author: '',
      createDate: '',
      updateDate: '',
      
    });

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(async() => {
          const res = await axios.get("board");
          console.log("get community = ", res.data);
          community.value = res.data

    });

    const titleError = ref('');
    const authorError = ref('');
    const contentError = ref('');

 const saveBoard = async () => {
      if (!community.value.title) {
        titleError.value = 'Title is required.';
        return;
      }

      if (!community.value.author) {
        authorError.value = 'Author is required.';
        return;
      }

      if (!community.value.content) {
        contentError.value = 'Content is required.';
        return;
      }

  try {
    const data = {
      author: community.value.author,
      title: community.value.title,
      content: community.value.content,
    };

    const res = await axios.post('board', data);
    console.log('Saved:', res.data);
  } catch (error) {
    console.error('Error saving board:', error);
  }
};


</script>

<template>
      <SideNavbar />
<div>  
<div class="container">
    <!-- 페이지 타이틀 -->
    <h1 class="title">community page</h1>

    <!-- 버튼과 테이블 -->
    <div class="table-section">
      <!-- 버튼: 테이블 상단 오른쪽 정렬 -->
      <div class="table-header">
        <button @click="openModal" class="create-button">Create</button>
      </div>

      <!-- 테이블 -->
      <table class="table table-hover community-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>작성자</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성 날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="board in community" :key="board.createDate">
            <td>{{ board.id }}</td>
            <td>{{ board.author }}</td>
            <td>{{ board.title }}</td>
            <td>{{ board.content }}</td>
            <td>{{ new Date(board.createDate).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
    

    <!-- 모달 -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <h2>새 게시물 작성</h2>
        <label>
          제목:
          <input v-model="title" type="text" />
        </label>
        <label>
          작성자:
          <input v-model="author" type="text" />
        </label>
        <label>
          내용:
          <textarea v-model="content"></textarea>
        </label>
        
        <div class="modal-buttons">
          <button class="btn btn-outline-dark" @click="closeModal">취소</button>
          <button class="btn btn-primary" @click="saveBoard">저장</button>

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
  width: 700px;
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

.create-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-button:hover {
  background-color: #0b5ed7;
}

.community-table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  word-break: break-word;
}

.community-table th,
.community-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>