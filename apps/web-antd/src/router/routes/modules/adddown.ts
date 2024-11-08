import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'line-md:plus-circle',
      activeIcon: 'line-md:plus-circle-filled',
      keepAlive: true,
      order: 1000,
      title: $t('page.dashboard.adddown'),
    },
    name: 'addDownLoad',
    path: '/adddownload',
    children: [
      {
        meta: {
          hideInMenu: true, // 不在菜单中显示
          icon: 'line-md:plus-circle',
          activeIcon: 'line-md:plus-circle-filled',
          title: $t('page.dashboard.adddown'),
        },
        name: '_addDownLoad',
        path: '/adddownload',
        component: () => import('#/views/down/add.vue'),
      },
    ],
  },
];

export default routes;
