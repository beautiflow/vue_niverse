<script setup>

const props = defineProps({
  deleteModal: Boolean,
})

const emit = defineEmits(['closeModal', 'deleteBoard'])

const onClose = () => {
  emit('closeModal');
}

const deleteBoard = () => {
  emit('deleteBoard');
}

</script>

<template>
  <div v-if="props.deleteModal" class="modal-backdrop">
    <div class="modal-content">
      <div style="text-align: center;">
        <h2>Delete Board</h2>
        <div>
          Are you sure you want to delete this Board?
        </div>
      </div>
      <div class="modal-buttons">
        <button class="closeModal btn btn-outline-dark" @click='onClose'><i class="fa-solid fa-rotate-left"></i></button>
        <button class="btn btn-danger" @click="deleteBoard"><i class="fa-regular fa-trash-can"></i></button>
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
