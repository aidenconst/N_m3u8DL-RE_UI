<script lang="ts" setup>
import type { donedataListType } from './utils/types';

import { h, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  DeleteOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  LinkOutlined,
} from '@ant-design/icons-vue';
import { Button, Card, List, ListItem, Tag, Tooltip } from 'ant-design-vue';

import { delJsonItemApi, getDownDoneApi } from '#/api';

const listdata: donedataListType[] = ref([
  {
    downurl: 'https://jinpinxm.com/20241103/byV6Nufc/index.m3u8',
    time: 1_730_771_038_795,
    title: '疯狂的高中生',
    size: '109MB',
    id: '5465123154',
  },
]);

function timestampToDate(timestamp) {
  const date = new Date(timestamp); // 转换为Date对象
  // 获取年月日时分秒
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // 月份是从0开始的
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  // 组合成 yyyy-mm-dd hh:mm:ss 格式
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
async function loadData() {
  const res = await getDownDoneApi();
  if (res) {
    listdata.value = res;
  }
}
async function delItem(id: string) {
  const data = { id, key: 'done' };
  const res = await delJsonItemApi(data);
  if (res.type) {
    const filter = listdata.value.find((item) => item.id === id);
    const index = listdata.value.indexOf(filter);
    index !== -1 && listdata.value.splice(index, 1);
  }
}
onMounted(() => {
  loadData();
});
</script>
<template>
  <Page>
    <Card>
      <List
        :data-source="listdata"
        :pagination="listdata.length > 0 ? true : false"
        bordered
      >
        <template #renderItem="{ item }">
          <ListItem>
            {{ item.title }}
            <template #actions>
              <Tag v-if="item.size != null">
                <template #icon>
                  <FileDoneOutlined />
                </template>
                {{ item.size }}
              </Tag>
              <Tag>
                <template #icon>
                  <FieldTimeOutlined />
                </template>
                {{ timestampToDate(item.time) }}
              </Tag>
              <Tooltip :title="item.downurl" placement="left">
                <Button
                  :icon="h(LinkOutlined)"
                  color="success"
                  shape="circle"
                  size="small"
                  type="primary"
                />
              </Tooltip>
              <Button
                :icon="h(DeleteOutlined)"
                color="success"
                shape="circle"
                size="small"
                type="primary"
                @click="delItem(item.id)"
              />
            </template>
          </ListItem>
        </template>
      </List>
    </Card>
  </Page>
</template>
