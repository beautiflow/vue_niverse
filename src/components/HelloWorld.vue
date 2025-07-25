<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
     <p className="text-cyan-300">
              👥 전체 방문자 수 : {{ totalCount }}
      </p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
