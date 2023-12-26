import { createRouter, createWebHashHistory } from 'vue-router';

const pages = import.meta.glob('@/pages/**/*.vue');

// 按目录结构生成路由配置
const routes = Object.keys(pages).map((path) => ({
  path: '/' + path.split('/').pop()?.replace('.vue', ''),
  component: pages[path],
}));

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/ldEditor',
    },
    ...routes,
  ],
});

export default router;
