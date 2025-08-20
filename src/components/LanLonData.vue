<script setup lang="ts">

import {reactive} from "vue";

const props = defineProps({
  showPointModal: Boolean,
  selectedPoint: Object
})


const PointForm = reactive({
  name: '',
  lat: props.selectedPoint.lat || '',
  lon: props.selectedPoint.lon || ''
})

console.log("selectedPoint = ", props.selectedPoint);

const emit = defineEmits(['closeModal', 'savePoint'])

const onClose = () => {
  emit('closeModal');
}



const onSavePoint = () => {
  console.log("pointForm = ", PointForm.name)
  if (!PointForm.name) {
    alert('포인트 이름을 입력해주세요.');
    document.getElementById('nameInput')?.focus();
    return;
  }


  emit('savePoint', { ...PointForm });
}


</script>

<template>

  <div v-if="props.showPointModal" class="modal-backdrop">
    <div class="modal-content">
      <div style="text-align: center;">
        <h2>Latitude & Longitude DATA</h2>
        <label>
          이름:
          <input id="nameInput" v-model="PointForm.name" type="text" />
        </label>
        <label>
          위도:
          <input id="latitudeInput" v-model="PointForm.lat" type="text" readonly />
        </label>
        <label>
          경도:
          <input id="longitudeInput" v-model="PointForm.lon" type="text" readonly />
        </label>
      </div>
      <div class="modal-buttons">
        <button class="closeModal btn btn-outline-dark" @click="onClose"><i class="fa-solid fa-rotate-left"></i></button>
        <button class="btn btn-primary" @click="onSavePoint"><i class="fa-regular fa-floppy-disk"></i></button>
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

#latitudeInput,
#longitudeInput {
  background-color: rgba(239, 239, 239, 0.32);
}

.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 30px;
  max-width: 550px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

.modal-content h2 {
  color: #333;
  margin-bottom: 25px;
}

.modal-content label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #555;
}

.modal-content input[type="text"] {
  width: 100%;
  padding: 10px 12px;
  margin-top: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

.modal-content input[readonly] {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.modal-buttons .btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
</style>
