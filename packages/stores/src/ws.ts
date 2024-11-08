import { useAccessStore } from '@vben/stores';

import { notification } from 'ant-design-vue';

import { useAppConfig } from '../../effects/hooks/src';

// store.ts
import { defineStore } from 'pinia';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
export const useWebSocketStore = defineStore({
  actions: {
    /** 主动关闭连接并清除心跳定时器 */
    closeWebSocket() {
      this.socket.close();
      this.autoLink = false; // 关闭自动重连
      this.linktype = false;
      this.checkTask && clearInterval(this.checkTask);
    },
    connectWebSocket(url: string = this.linkurl) {
      const accessStore = useAccessStore();
      if (!accessStore.accessToken) {
        // 已登出或未登录状态，断开ws连接定时器
        this.closeWebSocket(); // 断开ws连接,清除定时器
        notification.error({
          description: '登录失效,请重新登录.',
          duration: 2,
          message: 'ws服务',
        });
        return;
      }
      this.socket = new WebSocket(
        `${url}?Authorization=${accessStore.accessToken}`,
      );
      this.socket.addEventListener('open', (event) => {
        this.linktype = true;
        this.autoLink = true; // 关闭自动重连
        this.linkurl = url;
        this.setCheckTask();
        // const data = JSON.parse(event.data);
        setTimeout(() => {
          notification.success({
            description: 'WebSocket服务已连接！',
            duration: 2,
            message: 'ws服务',
          });
        }, 600);
      });
      this.socket.onerror = (error) => {
        this.autoLink = false; // 关闭自动重连
        notification.success({
          description: `错误信息：${JSON.stringify(error)}`,
          duration: 2,
          message: 'ws服务',
        });
        // console.error('WebSocket 错误:', error);
      };
      this.socket.onmessage = (event) => {
        if (event.data.code === 800) {
          notification.success({
            description: 'WebSocket连接成功!',
            duration: 2,
            message: 'ws服务',
          });
        }
        // console.log('WebSocket 消息:', event.data);
      };
      this.socket.addEventListener('close', (event) => {
        notification.error({
          description: 'WebSocket连接已断开!',
          duration: 2,
          message: 'ws服务',
        });
        // 清除心跳计时器
        this.closeWebSocket();
        // 断线重连
        setTimeout(() => {
          if (this.autoLink) {
            this.connectWebSocket();
            notification.warning({
              description: 'WebSocket重新连接中...',
              duration: 2,
              message: 'ws服务',
            });
          }
        }, 2000);
        // console.log('WebSocket 断开:', event);
      });
    },
    sendMessage(message: string) {
      if (this.linktype) {
        this.socket.send(message);
      }
    },
    setCheckTask() {
      setTimeout(() => {
        // console.log('延时3s开启心跳');
        if (this.linktype) {
          this.checkTask = setInterval(() => {
            // console.log(`心跳中...${new Date()}`);
            this.socket.send(JSON.stringify(this.heartbeatMessage));
          }, this.pingTime);
        }
      }, 3000);
    },
    /** 设置ws连接状态 */
    setlinktype() {
      if (this.linktype) {
        // console.log(`关闭连接:`, this.socket);
        this.socket.close();
        this.closeWebSocket();
      } else {
        // console.log(`重新连接:`, this.socket);
        this.connectWebSocket();
      }
    },
    setWsUrl(url: string) {
      this.linkurl = url;
    },
  },
  getters: {
    /** 获取ws连接状态 */
    getlinktype() {
      return this.linktype;
    },
    getws() {
      return this.socket;
    },
  },
  id: 'webSocket',
  state: () => ({
    accessToken: '',
    autoLink: true as boolean, // 自动重新连接ws开启
    checkTask: null, // 心跳计时器
    heartbeatMessage: { msg: 'ping', type: 0 },
    linktype: false as boolean,
    linkurl: apiURL,
    pingTime: 30_000, // 心跳间隔，单位为毫秒
    socket: null as null | WebSocket,
  }),
});
