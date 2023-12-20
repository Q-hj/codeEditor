import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/codeEditor',
    },
    {
      path: '/codeEditor',
      name: 'codeEditor',
      component: () => import('@/pages/codeEditor/codeEditor.vue'),
    },
  ],
});

export default router;
