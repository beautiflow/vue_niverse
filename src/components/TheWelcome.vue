<script setup>
import WelcomeItem from './WelcomeItem.vue'


</script>

<template>
  <WelcomeItem>
    <template #icon>
      <i class="fa-solid fa-satellite"></i>        
    </template>
    <template #heading>
      <RouterLink to="/nowISS">Now ISS</RouterLink>
    </template>

  
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <i class="fa-regular fa-comments"></i>           
    </template>

    <template #heading>
      <RouterLink to="/about">Community</RouterLink>
    </template>
 
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <i class="fa-solid fa-earth-asia"></i>         
    </template>

    <template #heading>
      <RouterLink to="/about">About Earth</RouterLink>
    </template>
 
   
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <i class="fa-regular fa-star"></i>      
    </template>
    <template #heading>
      <RouterLink to="/about">Constellations</RouterLink>
    </template>
    
  </WelcomeItem>

    <WelcomeItem>
    <template #icon>
      <i class="fa-solid fa-moon"></i>        
    </template>
    <template #heading>
      <RouterLink to="/about">Moon Phases</RouterLink>
    </template>
    
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <i class="fa-solid fa-gear"></i>        
    </template>
    <template #heading>
      <RouterLink to="/about">Settings</RouterLink>
    </template>
  </WelcomeItem>
</template>
