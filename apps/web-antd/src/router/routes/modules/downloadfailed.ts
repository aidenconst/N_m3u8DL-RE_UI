import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'line-md:download-off-outline',
      activeIcon: 'line-md:download-off',
      title: $t('page.dashboard.downerror'),
      keepAlive: true,
      order: 1003,
    },
    name: 'DownloadFailed',
    path: '/downloadfailed',
    children: [
      {
        name: '_DownloadFailed',
        path: '/downloadfailed',
        component: () => import('#/views/down/downfail.vue'),
        meta: {
          hideInMenu: true, // 不在菜单中显示
          icon: 'line-md:download-off-outline',
          activeIcon: 'line-md:download-off',
          title: $t('page.dashboard.downerror'),
        },
      },
    ],
  },
];

export default routes;
