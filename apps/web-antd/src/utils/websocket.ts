import { App } from 'vue';

import { WebSocket } from 'ws';

const websocketPlugin = (app: App, url: string) => {
  const ws = new WebSocket(url);

  // 添加全局属性
  app.config.globalProperties.$ws = ws;
};

export default websocketPlugin;
