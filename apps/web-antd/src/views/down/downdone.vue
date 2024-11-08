<script lang="ts" setup>
import type { donedataListType } from './utils/types';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { FieldTimeOutlined, LinkOutlined } from '@ant-design/icons-vue';
import { Button, Card, List, ListItem, Tag, Tooltip } from 'ant-design-vue';

import { getDownDoneApi } from '#/api';

const data: donedataListType[] = ref([
  {
    downurl: 'https://jinpinxm.com/20241103/byV6Nufc/index.m3u8',
    time: 1_730_771_038_795,
    title: '疯狂的高中生',
  },
]);
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
  const res = await getDownDoneApi();
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
