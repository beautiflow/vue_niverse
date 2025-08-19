<script setup>
import WelcomeItem from './WelcomeItem.vue';
import { MenuItems } from '@/constants/menu.js';

</script>

<template>
    <WelcomeItem v-for="item in MenuItems" :key="item.id">
    <template #icon>
      <i :class="item.icon"></i>
    </template>
    <template #heading>
      <RouterLink :to="item.route">{{ item.label }}</RouterLink>
    </template>
  </WelcomeItem>
</template>
