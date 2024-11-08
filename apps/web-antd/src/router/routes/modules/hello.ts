import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'line-md:alert-circle',
      activeIcon: 'line-md:alert-circle-twotone',
      keepAlive: true,
      order: 1005,
      title: $t('page.dashboard.about'),
    },
    name: 'hello',
    path: '/hello',
    children: [
      {
        name: '_hello',
        path: '/hello',
        component: () => import('#/views/down/about.vue'),
        meta: {
          hideInMenu: true, // 不在菜单中显示
          icon: 'line-md:alert-circle',
          activeIcon: 'line-md:alert-circle-twotone',
          title: $t('page.dashboard.about'),
        },
      },
    ],
  },
];

export default routes;
