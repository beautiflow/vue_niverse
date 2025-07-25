import { createRouter, createWebHistory } from 'vue-router';
import DefaultMain from '../views/DefaultMain.vue';
import NowISS from '@/views/NowISS.vue';
import Community from '@/views/CommunityRoom.vue';
import AboutEarth from '@/views/AboutEarth.vue';
import Constellations from '@/views/ConstellationsRoom.vue';
import MoonPhases from '@/views/MoonPhases.vue';
import Settings from '@/views/Settings.vue';
import Profile from '@/views/Profile.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefaultMain,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
     {
      path: '/nowISS',
      name: 'NowISS',
      component: NowISS,
    },
     {
      path: '/community',
      name: 'Community',
      component: Community,
    },
    {
      path: '/aboutEarth',
      name: 'AboutEarth',
      component: AboutEarth,
    },
    {
      path: '/constellations',
      name: 'Constellations',
      component: Constellations,
    },
    {
      path: '/moonPhases',
      name: 'moonPhases',
      component: MoonPhases,
    },
        {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    // {
    //   path: '/logout',
    //   name: 'Community',
    //   component: Community,
    // },

  ],
})

export default router
