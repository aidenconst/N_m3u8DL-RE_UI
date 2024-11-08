<script lang="ts" setup>
import type { listdataType } from './utils/types';

import { onMounted, onUnmounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
// import { useAppConfig } from '@vben/hooks';
import { useWebSocketStore } from '@vben/stores';

import {
  ArrowDownOutlined,
  CloudDownloadOutlined,
  FileSyncOutlined,
  InfoCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons-vue';
import {
  Button,
  Card,
  List,
  ListItem,
  Progress,
  Tag,
  Tooltip,
} from 'ant-design-vue';

// const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
const data: listdataType[] = ref([]);
/** 判断数组中的obj的id是否有指定id，存在返回true，不存在返回false
 */
function containsId(array: listdataType[], idToFind: string) {
  return array.some((obj) => obj.id === idToFind);
}
/** 更新数据
 * list   Object  ws服务器返回的数据信息
 */
function upData(list: listdataType[]) {
  const id: string = list.id; // 取得数据id
  const isYes = containsId(data.value, id);
  const downType: number = list.info.downprogress;
  const index: number = data.value.findIndex(
    (item) => item.id === id,
  ) as number;
  if (isYes) {
    // 已经存在，更新data数据
    if (index !== -1) {
      data.value[index] = list;
    }
  } else {
    // 不存在，新增到data
    data.value.unshift(list);
  }
  if (downType === 100 && index !== -1) {
    // 下载进度完成且数据存在于数组中
    // setTimeout(() => {
    //   data.value.splice(index, 1);
    // }, 5000);
  }
}
const webSocketStore = useWebSocketStore();
// if (!webSocketStore.getlinktype) {
//   webSocketStore.connectWebSocket();
// }
webSocketStore.getws.onmessage = (event) => {
  const list: listdataType[] = JSON.parse(event.data) as listdataType[];
  if (list.code !== 800) {
    upData(list);
  }
  // console.log('主键收到信息：', event.data);
};

// 页面加载完成
onMounted(() => {
  // webSocketStore.setWsUrl(apiURL);
  webSocketStore.setCheckTask();
});
// 监听页面刷新
onUnmounted(() => {
  // console.log('页面销毁即将刷新');
  webSocketStore.clearCheckTask();
  // 可以在这里执行保存数据的操作，如保存状态到localStorage或sessionStorage
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
            <template #extra>
              <div>
                <Tag
                  v-if="item.info.downprogress === 100 ? false : true"
                  color="processing"
                >
                  <template #icon>
                    <ArrowDownOutlined />
                  </template>
                  速度:[{{ item.info.downspeed }}{{ item.info.downspeedunit }}]
                </Tag>
                <Tag color="processing">
                  <template #icon>
                    <CloudDownloadOutlined />
                  </template>
                  分片:[{{ item.info.totalclip }}/{{ item.info.downclip }}]
                </Tag>
                <Tag color="processing">
                  <template #icon>
                    <FileSyncOutlined />
                  </template>
                  大小:[{{ item.info.totalsize
                  }}{{ item.info.totalsizeunit }}/{{ item.info.downsize
                  }}{{ item.info.downsizeunit }}]
                </Tag>
                <Tag
                  v-if="item.msg"
                  :color="item.code === 200 ? 'processing' : 'success'"
                >
                  <template #icon>
                    <InfoCircleOutlined />
                  </template>
                  {{ item.msg }}
                </Tag>
              </div>
            </template>
            {{ item.title }}
            <template #actions>
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
              <!-- <Button size="small" type="primary">
                <template #icon>
                  <StopOutlined />
                </template>
                暂停
              </Button>

              <Button size="small" type="primary">
                <template #icon>
                  <DeleteOutlined />
                </template>
                删除
              </Button> -->
            </template>
            <Progress :percent="item.info.downprogress" />
          </ListItem>
        </template>
      </List>
    </Card>
  </Page>
</template>
