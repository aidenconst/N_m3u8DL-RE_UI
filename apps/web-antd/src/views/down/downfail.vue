<script lang="ts" setup>
import type { donedataListType } from './utils/types';

import { h, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  DeleteOutlined,
  FieldTimeOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import { Button, Card, List, ListItem, Tag, Tooltip } from 'ant-design-vue';

import { delJsonItemApi, getDownFailApi } from '#/api';

const listdata: donedataListType[] = ref([]);
function timestampToDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
async function loadData() {
  const res = await getDownFailApi();
  if (res) {
    listdata.value = res;
  }
}
async function delItem(id: string) {
  const data = { id, key: 'fail' };
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
              <Tag>
                <template #icon>
                  <FieldTimeOutlined />
                </template>
                {{ timestampToDate(item.time) }}
              </Tag>
              <Tooltip :title="item.msg" placement="left">
                <Button
                  color="success"
                  shape="circle"
                  size="small"
                  type="primary"
                >
                  <template #icon>
                    <QuestionCircleOutlined />
                  </template>
                </Button>
              </Tooltip>
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
