import { createRouter, createWebHistory } from 'vue-router';
import DefaultMain from '../views/DefaultMain.vue';
import NowISS from '@/views/NowISS.vue';
import Community from '@/views/CommunityRoom.vue';
import AboutEarth from '@/views/AboutEarth.vue';
import Constellations from '@/views/ConstellationsRoom.vue';
import MoonPhases from '@/views/MoonPhases.vue';
import Settings from '@/views/Settings.vue';
import Profile from '@/views/Profile.vue';
import DatePicker from '@/views/DatePicker.vue';
import OpenLayersMap from '@/views/OpenLayersMap.vue';
import BoardDetail from '@/views/community/BoardDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefaultMain,
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
      path: '/openLayers',
      name: 'OpenLayersMap',
      component: OpenLayersMap,
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
      path: '/datePicker',
      name: 'DatePicker',
      component: DatePicker,
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
     {
      path: '/community/:id',
      name: 'BoardDetail',
      component: BoardDetail,
    },


    // {
    //   path: '/logout',
    //   name: 'Community',
    //   component: Community,
    // },

  ],
})

export default router
