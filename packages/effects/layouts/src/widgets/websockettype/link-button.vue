<script lang="ts" setup>
import { ref } from 'vue';

import { useWebSocketStore } from '@vben/stores';
import { VbenButton } from '@vben-core/shadcn-ui';

defineOptions({
  name: 'WebsockettypeButton',
});

const webSocketStore = useWebSocketStore();
setTimeout(() => {
  if (!webSocketStore.getlinktype) {
    // console.log('框架页面连接ws');
    webSocketStore.connectWebSocket();
  }
}, 1000);

const iconStyle = ref([
  {
    color: '#1a9d10',
  },
  {
    color: '#f4253a',
  },
]);

function toggleTheme() {
  webSocketStore.setlinktype(); // 重置ws连接状态
  console.log('ws状态：', webSocketStore.getlinktype);
}
</script>

<template>
  <VbenButton
    :style="{ padding: '5px', 'margin-top': '8px' }"
    alt="ws连接状态"
    aria-live="polite"
    class="theme-toggle cursor-pointer rounded-full border-none bg-none"
    size="icon"
    variant="icon"
    @click.stop="toggleTheme"
  >
    <svg
      height="32"
      viewBox="0 0 24 24"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :stroke="iconStyle[webSocketStore.getlinktype ? 0 : 1].color"
        d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0"
        fill="none"
        stroke-dasharray="28"
        stroke-dashoffset="28"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="0.6s"
          fill="freeze"
          values="28;0"
        />
      </path>
    </svg>
  </VbenButton>
</template>

<style scoped></style>
