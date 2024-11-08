import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'line-md:confirm-circle',
      activeIcon: 'line-md:confirm-circle-filled',
      title: $t('page.dashboard.workspace'),
      keepAlive: true,
      order: 1002,
    },
    name: 'downloadDone',
    path: '/downloaddone',
    children: [
      {
        name: 'downloadDone',
        path: '/downloaddone',
        component: () => import('#/views/down/downdone.vue'),
        meta: {
          hideInMenu: true, // 不在菜单中显示
          icon: 'line-md:confirm-circle',
          activeIcon: 'line-md:confirm-circle-filled',
          title: $t('page.dashboard.workspace'),
        },
      },
    ],
  },
];

export default routes;
