<script setup>
import SideNavbar from '@/components/SideNavbar.vue';
import DatepickerComponent from '@/components/datePickerComponent.vue';
import { ref } from 'vue';

const pickerDate = ref(null);

</script>

<template>
  <SideNavbar />
  <h1 style="text-align: center; font-weight: bold;">
    Date Picker
  </h1>

  <div>
    <DatepickerComponent
      label="등록일시"
      v-model="pickerDate"
      placeholder="Select date"
      format="yyyy년 MM월 dd일"
    />
    <p>선택한 날짜: {{ pickerDate }}</p>
  </div>
</template>
