import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'line-md:cog',
      activeIcon: 'line-md:cog-filled',
      title: $t('page.dashboard.downset'),
      keepAlive: true,
      order: 1006,
    },
    name: 'setConfit',
    path: '/setconfit',
    children: [
      {
        name: 'setConfit',
        path: '/setconfit',
        component: () => import('#/views/down/config.vue'),
        meta: {
          hideInMenu: true, // 不在菜单中显示
          icon: 'line-md:cog',
          activeIcon: 'line-md:cog-filled',
          title: $t('page.dashboard.downset'),
        },
      },
    ],
  },
];

export default routes;
