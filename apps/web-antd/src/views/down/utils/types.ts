type listinfoType = {
  downclip: number;
  downprogress: number;
  downsize: number;
  downsizeunit: string;
  downspeed: number;
  downspeedunit: string;
  totalclip: number;
  totalsize: number;
  totalsizeunit: string;
};
type listdataType = {
  code: number;
  downurl?: string;
  id: string;
  info: listinfoType;
  msg?: string;
  title?: string;
};
type donedataListType = {
  downurl?: string;
  id?: string;
  size?: string;
  time?: number;
  title?: string;
};
type donedataType = {
  code: number;
  data?: donedataListType;
  message?: string;
};
type configdataListType = {
  apiToken?: number | string;
  binaryMeMrge?: boolean;
  ffmpegPath?: string;
  mp4RealTimeDecryption?: boolean;
  Nm3u8DLRE?: string;
  port?: number;
  retrycount?: number;
  saveFile?: string;
  tempDir?: string;
  threadCount?: number;
  threadCounts?: number;
};
type configdataType = {
  code: number;
  data?: configdataListType;
  message?: string;
};

export type {
  configdataType,
  donedataListType,
  donedataType,
  listdataType,
  listinfoType,
};
