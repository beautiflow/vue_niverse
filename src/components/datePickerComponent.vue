<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from "@vuepic/vue-datepicker";
import { ref, computed, watch } from 'vue';

let pickerDate = ref();

let props = defineProps({
  label: { Type: String, default: '' },
  date: [String, Date, null],
  minDate: {type: Date, default: null},
  maxDate: {type: Date, default: null},
  placeholder: { type: String },
  enableTimePicker: { type: Boolean, default: false},
  alwaysClearable: {type: Boolean, default: true},
  showYearFirst: {type: Boolean, default: true},
  format: {type: String, default: 'yyyy-MM-dd'},
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  selectText: { type: String, default: 'Select' },
  cancelText: { type: String, default: 'Cancel' },
});
let emits = defineEmits(['update:modelValue']);


const compuedModelType = computed(() => {
  return props.format;
});


watch(pickerDate, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

<template>
  <div>
  <label>{{ label }}</label>

  <Datepicker
    v-model="pickerDate"
    :placeholder="placeholder"
    locale="ko"
    :model-type="compuedModelType"
    :year-first="showYearFirst"
    :enable-time-picker="enableTimePicker"
    :always-clearable="alwaysClearable"
    :min-date="props.minDate"
    :format="format"
    :max-date="props.maxDate"
    :disabled="disabled"
    :readonly="readonly"
    :select-text="selectText"
    :cancel-text="cancelText"
  />
  </div>
</template>

