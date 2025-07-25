<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import earth from '@/assets/earthLogo.jpg';

const isCollapsed = ref(true);
const isMenuActive = ref(false);

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

function toggleMenu() {
  isMenuActive.value = !isMenuActive.value;
}
</script>

<template>
<head>
</head>
  <aside :class="['sidebar', { collapsed: isCollapsed, 'menu-active': isMenuActive }]">
    <!-- Sidebar header -->
    <header class="sidebar-header">
      <RouterLink to="/" class="header-logo">
        <img :src="earth" alt="Navbar" />
      </RouterLink>
      <button class="toggler sidebar-toggler" @click="toggleSidebar">
        <i class="fa-solid fa-bars"></i>
      </button>
      <button class="toggler menu-toggler" @click="toggleMenu">
        <span class="material-symbols-rounded">{{ isMenuActive ? 'close' : 'menu' }}</span>
      </button>
    </header>

    <nav class="sidebar-nav">
      <!-- Primary top nav -->
      <ul class="nav-list primary-nav">
        <li class="nav-item">
          <RouterLink to="/nowISS" class="nav-link">
              <i class="fa-solid fa-satellite"></i>        
              <span class="nav-label">Now ISS</span>
          </RouterLink>
          <span class="nav-tooltip">Now ISS</span>
        </li>
        <li class="nav-item">
          <RouterLink to="/community" class="nav-link">
              <i class="fa-regular fa-comments"></i>           
              <span class="nav-label">Community</span>
          </RouterLink>
          <span class="nav-tooltip">Community</span>
        </li>
        <li class="nav-item">
          <RouterLink to="/aboutEarth" class="nav-link">
              <i class="fa-solid fa-earth-asia"></i>         
              <span class="nav-label">About Earth</span>
          </RouterLink>
          <span class="nav-tooltip">About Earth</span>
        </li>
        <li class="nav-item">
          <RouterLink to="/constellations" class="nav-link">
              <i class="fa-regular fa-star"></i>      
              <span class="nav-label">Constellations</span>
          </RouterLink>
          <span class="nav-tooltip">Constellations</span>
        </li>
           <li class="nav-item">
          <RouterLink to="/moonPhases" class="nav-link">
            <i class="fa-solid fa-moon"></i>        
            <span class="nav-label">Moon Phases</span>
          </RouterLink>
          <span class="nav-tooltip">Moon Phases</span>
        </li>
        <li class="nav-item">
          <RouterLink to="/settings" class="nav-link">
            <i class="fa-solid fa-gear"></i>        
            <span class="nav-label">Settings</span>
          </RouterLink>
          <span class="nav-tooltip">Settings</span>
        </li>
      </ul>

      <!-- Secondary bottom nav -->
      <ul class="nav-list secondary-nav">
        <li class="nav-item">
          <RouterLink to="/profile" class="nav-link">
            <i class="fa-regular fa-user"></i>         
            <span class="nav-label">Profile</span>
          </RouterLink>
          <span class="nav-tooltip">Profile</span>
        </li>
        <!-- <li class="nav-item">
          <RouterLink to="/logout" class="nav-link">
            <i class="fa-solid fa-arrow-right-to-bracket"></i>     
            <span class="nav-label">Logout</span>
          </RouterLink>
          <span class="nav-tooltip">Logout</span>
        </li> -->
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
/* Importing Google Fonts - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  min-height: 100vh;
  background: linear-gradient(#F1FAFF, #CBE4FF);
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 270px;
  margin: 16px 0 16px 0;
  border-radius: 16px;
  background: #151A2D;
  height: calc(100vh - 32px);
  transition: all 0.4s ease;
}

.sidebar.collapsed {
  width: 85px;
}

.sidebar .sidebar-header {
  display: flex;
  position: relative;
  padding: 25px 20px;
  align-items: center;
  justify-content: space-between;
}

.sidebar-header .header-logo img {
  width: 46px;
  height: 46px;
  display: block;
  object-fit: contain;
  border-radius: 50%;
}

.sidebar-header .toggler {
  height: 35px;
  width: 35px;
  color: #151A2D;
  border: none;
  cursor: pointer;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: 0.4s ease;
}

.sidebar-header .sidebar-toggler {
  position: absolute;
  right: 20px;
}

.sidebar-header .menu-toggler {
  display: none;
}

.sidebar.collapsed .sidebar-header .toggler {
  transform: translate(-4px, 65px);
}

.sidebar-header .toggler:hover {
  background: #dde4fb;
}

.sidebar-header .toggler span {
  font-size: 1.75rem;
  transition: 0.4s ease;
}

.sidebar.collapsed .sidebar-header .toggler span {
  transform: rotate(180deg);
}

.sidebar-nav .nav-list {
  list-style: none;
  display: flex;
  gap: 4px;
  padding: 0 15px;
  flex-direction: column;
  transform: translateY(15px);
  transition: 0.4s ease;
}

.sidebar.collapsed .sidebar-nav .primary-nav {
  transform: translateY(65px);
}

.sidebar-nav .nav-link {
  color: #fff;
  display: flex;
  gap: 12px;
  white-space: nowrap;
  border-radius: 8px;
  padding: 12px 15px;
  align-items: center;
  text-decoration: none;
  transition: 0.4s ease;
}

.sidebar.collapsed .sidebar-nav .nav-link {
  border-radius: 12px;
}

.sidebar .sidebar-nav .nav-link .nav-label {
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .sidebar-nav .nav-link .nav-label {
  opacity: 0;
  pointer-events: none;
}

.sidebar-nav .nav-link:hover {
  color: #151A2D;
  background: #fff;
}

.sidebar-nav .nav-item {
  position: relative;
}

.sidebar-nav .nav-tooltip {
  position: absolute;
  top: -10px;
  opacity: 0;
  color: #151A2D;
  display: none;
  pointer-events: none;
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap;
  background: #fff;
  left: calc(100% + 25px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0s;
}

.sidebar.collapsed .sidebar-nav .nav-tooltip {
  display: block;
}

.sidebar-nav .nav-item:hover .nav-tooltip {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(50%);
  transition: all 0.4s ease;
}

.sidebar-nav .secondary-nav {
  position: absolute;
  bottom: 30px;
  width: 100%;
}

/* Responsive media query code for small screens */
@media (max-width: 1024px) {
  .sidebar {
    height: 56px;
    margin: 13px;
    overflow-y: hidden;
    scrollbar-width: none;
    width: calc(100% - 26px);
    max-height: calc(100vh - 26px);
  }

  .sidebar.menu-active {
    overflow-y: auto;
  }

  .sidebar .sidebar-header {
    position: sticky;
    top: 0;
    z-index: 20;
    border-radius: 16px;
    background: #151A2D;
    padding: 8px 10px;
  }

  .sidebar-header .header-logo img {
    width: 40px;
    height: 40px;
  }

  .sidebar-header .sidebar-toggler,
  .sidebar-nav .nav-item:hover .nav-tooltip {
    display: none;
  }
  
  .sidebar-header .menu-toggler {
    display: flex;
    height: 30px;
    width: 30px;
  }

  .sidebar-header .menu-toggler span {
    font-size: 1.3rem;
  }

  .sidebar .sidebar-nav .nav-list {
    padding: 0 10px;
  }

  .sidebar-nav .nav-link {
    gap: 10px;
    padding: 10px;
    font-size: 0.94rem;
  }

  .sidebar-nav .nav-link .nav-icon {
    font-size: 1.37rem;
  }

  .sidebar-nav .secondary-nav {
    position: relative;
    bottom: 0;
    margin: 40px 0 30px;
  }
}
</style>

