<script lang="ts" setup>
import type { donedataType } from './utils/types';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { editConfigApi, getConfigApi } from '#/api';

const [Form, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入express使用端口号',
      },
      help: 'express使用的端口号,只能是数字',
      fieldName: 'port',
      // 界面显示的label
      label: 'API端口号',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入token',
      },
      help: '权限验证，避免非法访问api',
      fieldName: 'apiToken',
      label: 'token',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入并发下载量',
      },
      help: '并发下载任务数量',
      fieldName: 'threadCounts',
      label: '并发下载量',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入文件保存目录',
      },
      help: '文件保存目录绝对路径',
      fieldName: 'saveFile',
      label: '保存目录',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入缓存目录',
      },
      help: '下载缓存目录绝对路径',
      fieldName: 'tempDir',
      label: '缓存目录',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入N_m3u8DL-RE并发下载线程数',
      },
      help: 'N_m3u8DL-RE并发下载线程数',
      fieldName: 'threadCount',
      label: '下载线程',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入下载错误重试次数',
      },
      help: 'N_m3u8DL-RE下载错误重试次数',
      fieldName: 'retrycount',
      label: '重试次数',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入ffmpeg执行绝对路径',
      },
      help: 'ffmpeg执行路径,如果设置了环境变量,可留空',
      fieldName: 'ffmpegPath',
      label: 'ffmpeg',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'setbinaryMeMrges',
      help: 'N_m3u8DL-RE-是否开启二进制合并',
      componentProps: {
        class: 'w-auto',
      },
      label: '二进制合并',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'setdecryptions',
      help: 'N_m3u8DL-RE-是否开启实时解密分片',
      componentProps: {
        class: 'w-auto',
      },
      label: '实时解密分片',
    },
  ],
  wrapperClass: 'grid-cols-1',
});
async function loadData() {
  const data = (await getConfigApi()) as donedataType;

  formApi.setFieldValue('port', data.port); // 设置默认数据
  formApi.setFieldValue('apiToken', data.apiToken); // 设置默认数据
  formApi.setFieldValue('binaryMeMrge', data.binaryMeMrge); // 设置默认数据
  formApi.setFieldValue('ffmpegPath', data.ffmpegPath); // 设置默认数据
  formApi.setFieldValue('mp4RealTimeDecryption', data.mp4RealTimeDecryption); // 设置默认数据
  formApi.setFieldValue('retrycount', data.retrycount); // 设置默认数据
  formApi.setFieldValue('saveFile', data.saveFile); // 设置默认数据
  formApi.setFieldValue('tempDir', data.tempDir); // 设置默认数据
  formApi.setFieldValue('threadCount', data.threadCount); // 设置默认数据
  formApi.setFieldValue('threadCounts', data.threadCounts); // 设置默认数据
}
onMounted(() => {
  loadData();
});

async function onSubmit(values: Record<string, any>) {
  const data = await editConfigApi(values);
  if (data.code === 0) {
    message.success({
      content: `修改成功,程序重启后生效!`,
    });
  }
}
const activeKey = ref('1');
</script>

<template>
  <Page>
    <Card title="全局配置">
      <Form />
    </Card>
  </Page>
</template>
