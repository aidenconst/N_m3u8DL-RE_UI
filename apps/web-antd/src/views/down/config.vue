<script lang="ts" setup>
import type { configdataListType } from './utils/types';

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
      component: 'InputNumber',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入express使用端口号',
      },
      help: '服务端口号,只能是数字,慎重修改！！若修改后无法访问，请检查config.json和_app.config.js，docker检查映射端口',
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
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入并发下载量',
      },
      help: '并发下载任务数量',
      fieldName: 'threadCounts',
      label: '下载任务数',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入文件保存目录',
      },
      help: '文件保存目录绝对路径，默认值：/app/download',
      fieldName: 'saveFile',
      label: '保存目录',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入缓存目录',
      },
      help: '下载缓存目录绝对路径，默认值：/app/download/temp',
      fieldName: 'tempDir',
      label: '缓存目录',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入N_m3u8DL-RE并发下载线程数',
      },
      help: 'N_m3u8DL-RE并发下载线程数',
      fieldName: 'threadCount',
      label: '单任务线程',
    },
    {
      component: 'InputNumber',
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
      help: 'ffmpeg执行路径,如果设置了环境变量,可留空，默认值：/app/plugin/ffmpeg/ffmpeg',
      fieldName: 'ffmpegPath',
      label: 'ffmpeg',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入N_m3u8DL-RE执行绝对路径',
      },
      help: 'N_m3u8DL-RE执行绝对路径,如果设置了环境变量,可留空，默认值：/app/plugin/N_m3u8DL-RE/N_m3u8DL-RE',
      fieldName: 'Nm3u8DLRE',
      label: 'Nm3u8DLRE',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'binaryMeMrge',
      help: 'N_m3u8DL-RE-是否开启二进制合并',
      componentProps: {
        class: 'w-auto',
      },
      label: '二进制合并',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'mp4RealTimeDecryption',
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
  const data = (await getConfigApi()) as configdataListType;

  formApi.setFieldValue('port', data.port); // 服务端口
  formApi.setFieldValue('apiToken', data.apiToken); // 连接验证token
  formApi.setFieldValue('binaryMeMrge', data.binaryMeMrge); // 二进制合并
  formApi.setFieldValue('ffmpegPath', data.ffmpegPath); // ffmpeg路径
  formApi.setFieldValue('mp4RealTimeDecryption', data.mp4RealTimeDecryption); // 分片实时解密
  formApi.setFieldValue('retrycount', data.retrycount); // 重试次数
  formApi.setFieldValue('saveFile', data.saveFile); // 保存目录
  formApi.setFieldValue('tempDir', data.tempDir); // 缓存目录
  formApi.setFieldValue('threadCount', data.threadCount); // 并发下载任务数
  formApi.setFieldValue('threadCounts', data.threadCounts); // 单任务并发线程数
  formApi.setFieldValue('Nm3u8DLRE', data.Nm3u8DLRE); // N_m3u8DL_RE路径
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
