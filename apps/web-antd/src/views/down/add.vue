<script lang="ts" setup>
import { onMounted } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { addDownApi, getConfigApi } from '#/api';

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
        placeholder: '请输入下载链接',
      },
      // 字段名
      fieldName: 'url',
      // 界面显示的label
      label: '下载链接',
      rules: 'required',
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入保存文件名',
      },
      fieldName: 'title',
      label: '文件名',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'saveFilePaths',
      defaultValue: '/download',
      label: '保存目录',
      rules: z.string().default('默认值').optional(),
    },
    {
      component: 'Switch',
      defaultValue: false,
      fieldName: 'setmore',
      componentProps: {
        class: 'w-auto',
      },
      help: '打开可以配置更多下载信息',
      label: '设置更多',
    },
    {
      component: 'Input',
      dependencies: {
        if(values) {
          return !!values.setmore;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['setmore'],
      },
      componentProps: {
        placeholder: '请输入token',
      },
      help: '默认获取预设token',
      fieldName: 'token',
      label: 'token',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入下载并发线程数量',
      },
      dependencies: {
        if(values) {
          return !!values.setmore;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['setmore'],
      },
      help: '下载并发线程数量,默认运行主机CPU线程数',
      defaultValue: 12,
      fieldName: 'threadCountss',
      label: '下载线程',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入下载出错时重试次数',
      },
      dependencies: {
        if(values) {
          return !!values.setmore;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['setmore'],
      },
      help: '下载错误时重试次数,默认5次',
      fieldName: 'retrycounts',
      defaultValue: 5,
      label: '出错重试',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'setbinaryMeMrges',
      componentProps: {
        class: 'w-auto',
      },
      dependencies: {
        if(values) {
          return !!values.setmore;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['setmore'],
      },
      label: '二进制合并',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'setdecryptions',
      dependencies: {
        if(values) {
          return !!values.setmore;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['setmore'],
      },
      componentProps: {
        class: 'w-auto',
      },
      label: '实时解密分片',
    },
  ],
  wrapperClass: 'grid-cols-1',
});

async function onSubmit(values: Record<string, any>) {
  const datas = JSON.stringify(values);
  const { code, data, msg } = await addDownApi(values);
  if (code === 0) {
    message.success({
      content: `${msg}`,
    });
    console.log(data);
  }
}

async function loadData() {
  const data = (await getConfigApi()) as donedataType;
  formApi.setFieldValue('token', data.apiToken);
  formApi.setFieldValue('saveFilePaths', data.saveFile);
}
onMounted(() => {
  loadData();
});
</script>

<template>
  <Page>
    <Card title="新建下载任务">
      <Form />
    </Card>
  </Page>
</template>
