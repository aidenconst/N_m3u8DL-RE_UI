import { requestClient } from '#/api/request';

type Result = {
  code?: number;
  data?: Array<any>;
  message: string;
};
type addResult = {
  code?: number;
  data?: Array<any>;
  msg: string;
};
type addType = {
  retrycount?: number | string;
  saveFilePath: string;
  setbinaryMeMrge?: boolean;
  setdecryption?: boolean;
  setmore?: boolean;
  threadCount?: number | string;
  title: string;
  url: string;
};
type editType = {
  binaryMeMrge?: boolean;
  ffmpegPath?: string;
  mp4RealTimeDecryption?: boolean;
  port?: number;
  retrycount?: number;
  saveFile?: string;
  tempDir?: string;
  threadCount?: number;
  threadCounts?: number;
  token?: string;
};
/**
 * 下载成功数据,无参数
 */
async function getDownDoneApi() {
  return requestClient.get<Result>('/downloaddone');
}
/**
 * 下载失败数据,无参数
 */
async function getDownFailApi() {
  return requestClient.get<Result>('/downloadfail');
}
/**
 * 新增下载任务
 */
async function addDownApi(data?: addType) {
  return requestClient.post<addResult>('/download', data);
}
/**
 * 获取全局配置
 */
async function getConfigApi() {
  return requestClient.get<Result>('/getconfig');
}
/**
 * 修改全局配置
 */
async function editConfigApi(data?: editType) {
  return requestClient.post<Result>('/editconfig', data);
}
export {
  addDownApi,
  editConfigApi,
  getConfigApi,
  getDownDoneApi,
  getDownFailApi,
};
