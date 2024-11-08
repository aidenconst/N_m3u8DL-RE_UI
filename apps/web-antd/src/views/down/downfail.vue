<script lang="ts" setup>
import type { donedataListType } from './utils/types';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  FieldTimeOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import { Button, Card, List, ListItem, Tag, Tooltip } from 'ant-design-vue';

import { getDownFailApi } from '#/api';

const data: donedataListType[] = ref([]);
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
    data.value = res;
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
        :data-source="data"
        :pagination="data.length > 0 ? true : false"
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
                  color="success"
                  shape="circle"
                  size="small"
                  type="primary"
                >
                  <template #icon>
                    <LinkOutlined />
                  </template>
                </Button>
              </Tooltip>
            </template>
          </ListItem>
        </template>
      </List>
    </Card>
  </Page>
</template>
