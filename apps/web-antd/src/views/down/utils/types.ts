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
  time?: number;
  title?: string;
};
type donedataType = {
  code: number;
  data?: donedataListType;
  message?: string;
};

export type { donedataListType, donedataType, listdataType, listinfoType };
