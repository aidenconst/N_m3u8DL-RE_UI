import { useAccessStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useAppConfig } from '../../effects/hooks/src';

// store.ts
import { defineStore } from 'pinia';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
export const useWebSocketStore = defineStore({
  actions: {
    /** 清除心跳定时器 */
    clearCheckTask() {
      // console.log('销毁心跳定时器');
      this.checkTask && clearInterval(this.checkTask);
    },
    closeWebSocket() {
      if (this.socket) {
        this.clearCheckTask();
        this.socket.close();
        this.linktype = false;
      }
    },
    connectWebSocket(url: string = this.linkurl) {
      const accessStore = useAccessStore();
      if (!accessStore.accessToken) {
        message.success({
          content: () => '登录失效,请重新登录',
          style: {
            marginTop: '10vh',
          },
        });
        return;
      }
      this.socket = new WebSocket(
        `${url}?Authorization=${accessStore.accessToken}`,
      );
      this.socket.addEventListener('open', (event) => {
        this.linktype = true;
        this.linkurl = url;
        // console.log('WebSocket 已连接:', event);
        this.setCheckTask();
        // const data = JSON.parse(event.data);
        setTimeout(() => {
          message.success({
            content: () => 'WebSocket服务已连接',
            style: {
              marginTop: '10vh',
            },
          });
        }, 500);
      });
      this.socket.onerror = (error) => {
        console.error('WebSocket 错误:', error);
      };
      this.socket.onmessage = (event) => {
        if (event.data.code === 800) {
          message('WebSocket连接成功!');
        }
        // console.log('WebSocket 消息:', event.data);
      };
      this.socket.addEventListener('close', (event) => {
        message.error({
          content: () => 'WebSocket连接断开了',
          duration: 2,
          style: {
            marginTop: '10vh',
          },
        });
        // 清除心跳计时器
        this.checkTask && clearInterval(this.checkTask);
        // 断线重连
        setTimeout(() => {
          this.connectWebSocket();
          message.warning({
            content: () => 'WebSocket重新连接中...',
            duration: 2,
            style: {
              marginTop: '10vh',
            },
          });
        }, 3000);
        // console.log('WebSocket 断开:', event);
      });
    },
    sendMessage(message: string) {
      if (this.socket) {
        this.socket.send(message);
      }
    },
    setCheckTask() {
      if (!this.checkTask && this.socket) {
        // console.log('延时3s开启心跳');
        setTimeout(() => {
          this.checkTask = setInterval(() => {
            this.socket.send(JSON.stringify(this.heartbeatMessage));
          }, this.pingTime);
        }, 3000);
      }
    },
    /** 设置ws连接状态 */
    setlinktype() {
      if (this.socket) {
        this.socket.close();
        this.clearCheckTask();
        this.linktype = !this.linktype;
      } else {
        if (this.socket) {
          this.connectWebSocket();
        }
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
    checkTask: null, // 心跳计时器
    heartbeatMessage: { msg: 'ping', type: 0 },
    linktype: false as boolean,
    linkurl: apiURL,
    pingTime: 30_000, // 心跳间隔，单位为毫秒
    socket: null as null | WebSocket,
  }),
});
