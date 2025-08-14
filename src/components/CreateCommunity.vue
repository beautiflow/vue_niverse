<script setup>
import { ref } from 'vue';

const emit = defineEmits(['closeModal', 'saveBoard'])


const defaultBoard = {
    title: '',
    content: '',
    author: '',
};
const onClose = () => {
  emit('closeModal');
}

const saveBoard = () => {
  if (!newBoard.value.title || !newBoard.value.author || !newBoard.value.content) {
    if (!newBoard.value.title) {
      document.getElementById('titleInput')?.focus();
    } else if (!newBoard.value.author) {
      document.getElementById('authorInput')?.focus();
    } else if (!newBoard.value.content) {
      document.getElementById('contentInput')?.focus();
    }
    alert('모든 필드를 입력해주세요.');
    return;
  }

  emit('saveBoard', {
    ...newBoard.value
  });

  newBoard.value = {...defaultBoard};
}

const props = defineProps({
  showModal: Boolean,
})

 const newBoard = ref({...defaultBoard});

</script>

<template>
  <div v-if="props.showModal" class="modal-backdrop">
    <div class="modal-content">
    <h2>새 게시물 작성</h2>
    <label>
        제목:
        <input id="titleInput" v-model="newBoard.title" type="text" />
    </label>
    <label>
        작성자:
        <input id="authorInput" v-model="newBoard.author" type="text" />
    </label>
    <label>
        내용:
        <textarea id="contentInput" v-model="newBoard.content"></textarea>
    </label>
    <div class="modal-buttons">
        <button class="closeModal btn btn-outline-dark" @click='onClose'>취소</button>
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

</style>
