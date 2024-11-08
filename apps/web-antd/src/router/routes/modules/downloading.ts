import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'line-md:downloading',
      activeIcon: 'line-md:downloading-loop',
      title: $t('demos.antd'),
      keepAlive: true,
      order: 1001,
    },
    name: 'downLoading',
    path: '/downloading',
    children: [
      {
        meta: {
          hideInMenu: true, // 不在菜单中显示
          icon: 'line-md:downloading',
          activeIcon: 'line-md:downloading-loop',
          title: $t('demos.antd'),
        },
        name: '_downLoading',
        path: '/downloading',
        component: () => import('#/views/down/download.vue'),
      },
    ],
  },
];

export default routes;
