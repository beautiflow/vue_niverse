<script setup>
import SideNavbar from '@/components/SideNavbar.vue';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, watch } from 'vue';


const props = defineProps({
  date: String,
  minDate: Boolean,
  maxDate: Boolean,
});

const date = ref(props.date);
const minDate = ref(props.minDate ? new Date() : null);
const maxDate = ref(props.maxDate ? new Date() : null);

// onMounted(() => {
//   const startDate = new Date();
//   const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
// })

watch(() => props.date, (newVal) => {
  date.value = newVal;
})

</script>

<template>
  <SideNavbar />
  <h1 style="text-align: center; font-weight: bold;">
    Date Picker
  </h1>

  <div>
    <Datepicker
      v-model="date"
      placeholder="Select Date"
      locale="ko"
      format="yyyy-MM-dd"
      year-first
      :enable-time-picker="false"
      :always-clearable="true"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <p>선택한 날짜: {{ date }}</p>
  </div>
</template>

<style scoped>

</style>
