<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  showModal: Boolean,
  board: Object
});

const emit = defineEmits(['closeModal', 'saveBoard', 'updateBoard'])

const isEditing = ref(false);

const defaultBoard = {
    title: '',
    content: '',
    author: '',
};

const onClose = () => {
  emit('closeModal');
}

const handleSave = () => {
  if (!BoardForm.value.title || !BoardForm.value.author || !BoardForm.value.content) {
    if (!BoardForm.value.title) {
      document.getElementById('titleInput')?.focus();
    } else if (!BoardForm.value.author) {
      document.getElementById('authorInput')?.focus();
    } else if (!BoardForm.value.content) {
      document.getElementById('contentInput')?.focus();
    }
    alert('모든 필드를 입력해주세요.');
    return;
  }

  if (isEditing.value) {
    emit('updateBoard', BoardForm.value);
  } else {
    emit('saveBoard', BoardForm.value);
  }
}

const BoardForm = ref({...defaultBoard});

watch(() => props.board, (newVal) => {
  if (newVal) {
    isEditing.value = true;
    Object.assign(BoardForm.value, newVal);
  } else {
    isEditing.value = false;
    Object.assign(BoardForm.value, { id: null, title: '', content: '', author: '' })
  }
}, { immediate: true });

</script>

<template>
  <div v-if="props.showModal" class="modal-backdrop">
    <div class="modal-content">
      <h2>{{ isEditing ? '게시글 수정' : '새 게시물 작성' }}</h2>
    <label>
        제목:
        <input id="titleInput" v-model="BoardForm.title" type="text" />
    </label>
    <label>
        작성자:
      <input id="authorInput" v-model="BoardForm.author" type="text" :disabled="isEditing" />
    </label>
    <label>
        내용:
        <textarea id="contentInput" v-model="BoardForm.content"></textarea>
    </label>
    <div class="modal-buttons">
        <button class="closeModal btn btn-outline-dark" @click="onClose">취소</button>
        <button class="btn btn-primary" @click="handleSave">{{ isEditing ? "수정" : "저장" }}</button>
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

</style>
