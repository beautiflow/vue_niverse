<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios';
import { useRouter } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue';

const router = useRouter();

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

// const titleError = ref('');
// const authorError = ref('');
// const contentError = ref('');

const saveBoard = async () => {
      // if (!community.value.title) {
      //   titleError.value = 'Title is required.';
      //   return;
      // }

      // if (!community.value.author) {
      //   authorError.value = 'Author is required.';
      //   return;
      // }

      // if (!community.value.content) {
      //   contentError.value = 'Content is required.';
      //   return;
      // }

  try {
    const data = {
      id: community.value.length + 1,
      author: community.value.author,
      title: community.value.title,
      content: community.value.content,
      createDate: new Date().toISOString(),
    };
    const res = await axios.post('board', data);
    console.log('Saved:', res.data);
    showModal.value = false;
    const addRes = await axios.get("board");
    console.log("get community = ", addRes.data);
    community.value = addRes.data;
  } catch (error) {
    console.error('Error saving board:', error);
  }
};

const moveToPage = (boardId) => {
  console.log(boardId);
  // router.push('/todos/'+ todoId);
  router.push({
    name: 'boardDetail',
    params: {
      id: boardId
    }
  });
};
</script>

<template>
  <SideNavbar />
  <div>  
    <div class="container">
      <h1 class="title">community page</h1>
        <div class="table-section">
          <div class="table-header">
            <button @click="openModal" class="create-button">Create</button>
          </div>
          <div class="container my-4" style="max-width: 800px;">
              <div
                v-for="board in community"
                :key="board.createDate"
                class="card mb-3 shadow-sm"
                style="border-radius: 1rem;"
              >
                <div 
                  class="card-body p-3"
                  style="cursor: pointer"
                  @click="moveToPage(board.id)">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <h5 class="card-title mb-0 text-truncate" >
                          {{ board.title }}
                        </h5>
                      </div>
                      <div class="text-end mt-2">
                          <span class="badge bg-secondary">No. {{ board.id }}</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <p class="card-text" style="max-height: 80px; overflow: hidden; text-overflow: ellipsis;">
                        {{ board.content }}
                      </p>
                        <small class="text-muted">
                          {{ board.author }}
                          {{ new Date(board.createDate).toLocaleDateString() }}
                        </small>
                    </div>
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
      
    <!-- 모달 -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <h2>새 게시물 작성</h2>
        <label>
          제목:
          <input v-model="community.title" type="text" />
        </label>
        <label>
          작성자:
          <input v-model="community.author" type="text" />
        </label>
        <label>
          내용:
          <textarea v-model="community.content"></textarea>
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