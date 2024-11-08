import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'line-md:gauge',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/welcome',
    children: [
      {
        meta: {
          icon: 'line-md:plus-circle',
          activeIcon: 'line-md:plus-circle-filled',
          title: $t('page.dashboard.adddown'),
        },
        name: 'adddown',
        path: '/addDownload',
        component: () => import('#/views/down/add.vue'),
      },
      {
        meta: {
          icon: 'line-md:downloading',
          activeIcon: 'line-md:downloading-loop',
          title: $t('demos.antd'),
        },
        name: 'Hello',
        path: '/welcome',
        component: () => import('#/views/down/download.vue'),
      },
      {
        name: 'downloaddone',
        path: '/downloadDone',
        component: () => import('#/views/down/downdone.vue'),
        meta: {
          icon: 'line-md:confirm-circle',
          activeIcon: 'line-md:confirm-circle-filled',
          title: $t('page.dashboard.workspace'),
        },
      },
      {
        name: 'downloadfailed',
        path: '/DownloadFailed',
        component: () => import('#/views/down/downfail.vue'),
        meta: {
          icon: 'line-md:download-off-outline',
          activeIcon: 'line-md:download-off',
          title: $t('page.dashboard.downerror'),
        },
      },
      {
        name: 'setconfit',
        path: '/SetConfit',
        component: () => import('#/views/down/config.vue'),
        meta: {
          icon: 'line-md:cog',
          activeIcon: 'line-md:cog-filled',
          title: $t('page.dashboard.downset'),
        },
      },
      {
        name: 'about',
        path: '/aboutMe',
        component: () => import('#/views/down/about.vue'),
        meta: {
          icon: 'line-md:alert-circle',
          activeIcon: 'line-md:alert-circle-twotone',
          title: $t('page.dashboard.about'),
        },
      },
    ],
  },
];

export default routes;
