<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios';
import { useRouter } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue';
import CreateModal from '@/components/CreateCommunity.vue';

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
  console.log("open modal")
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveBoard = async (newBoard) => {
  try {
    const data = {
      id: community.value.length + 1,      
      author: newBoard.author,
      title: newBoard.title,
      content: newBoard.content,
      createDate: new Date().toISOString(),
    };
    const res = await axios.post('board', data);
    console.log('Saved:', res.data);
    showModal.value = false;
    const addRes = await axios.get("board");
    community.value = addRes.data;
  } catch (error) {
    console.error('Error saving board:', error);
  }
};

onMounted(async() => {
      const res = await axios.get("board");
      community.value = res.data
});

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
          <template v-if="community.length > 0">
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
          </template>
          <template v-if="community.length === 0">
            <div>검색 결과가 없습니다.</div>
          </template>
        </div>
      </div>
    </div>
  </div>

 <teleport to="#modal">
    <CreateModal 
      :showModal="showModal"
      @closeModal="closeModal"
      @saveBoard="saveBoard"
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