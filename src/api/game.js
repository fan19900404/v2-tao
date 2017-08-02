import ajax from '../http/http';
import { apiType, apiTypeArr } from '../config/index';

/**
 * 获取banner的轮播图,使用与首页同样的方法,未列出
 *
 * @export
 * @param {number} page 页码
 * @param {number} limit 每页返回数据条数
 * @param {number} type 类型
 * @param {number} nologin 是否需要登陆
 * @returns
 */

/**
 * 获取已登录，我的游戏
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getMyGame(query) {
  const params = {
    page: query.page,
    limit: query.limit,
    nologin: query.nologin,
  };
  return ajax({
    url: apiTypeArr[apiType].getMyGame,
    method: 'get',
    params,
  });
}
/**
 * 获取已登录，没玩过，推荐游戏
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getImages() {
  const params = {
    limit: 8,
    nologin: 1,
  };
  return ajax({
    url: apiTypeArr[apiType].getImages,
    method: 'get',
    params,
  });
}

/**
 * 未登录，显示三条，使用推荐游戏的接口，有后端判断是否登录
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getDataList() {
  const params = {
    limit: 3,
    nologin: 1,
  };
  return ajax({
    url: apiTypeArr[apiType].getImages,
    method: 'get',
    params,
  });
}

/**
 * 获取游戏中心，首发推荐游戏
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getCommonList() {
  const params = {
    page: 1,
    limit: 8,
    nologin: 1,
  };
  return ajax({
    url: apiTypeArr[apiType].getCommonList,
    method: 'get',
    params,
  });
}

/**
 * 获取游戏中心，全部游戏
 * @export
 * @param {any} query 对象参数
 * @returns
 */

export function getNewGameData(query) {
  const params = {
    page: query.pageIndex,
    limit: query.pageSize,
    nologin: query.nologin,
  };
  return ajax({
    url: apiTypeArr[apiType].getNewGameData,
    method: 'get',
    params,
  });
}

/**
 * 获取游戏中心，三种类型游戏排行榜
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getRankData(query) {
  const params = {
    type: query.type,
    page: query.page,
    limit: query.limit,
  };
  return ajax({
    url: apiTypeArr[apiType].getRankData,
    method: 'get',
    params,
  });
}
/**
 * 获取游戏中心，今日开服列表
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getTodayData() {
  return ajax({
    url: apiTypeArr[apiType].openServer,
    method: 'get',
    params: { type: 2 },
  });
}

/**
 * 获取游戏中心，即将开服列表
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getFeatureData() {
  return ajax({
    url: apiTypeArr[apiType].openServer,
    method: 'get',
    params: { type: 3 },
  });
}

/**
 * 获取游戏中心，已经开服列表，有下拉加载
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getHadData(query) {
  const params = {
    type: 1,
    page: query.page,
    limit: query.limit,
  };
  return ajax({
    url: apiTypeArr[apiType].openServer,
    method: 'get',
    params,
  });
}

/**
 * 获取游戏中心，热门礼包列表
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getHotPacks() {
  return ajax({
    url: apiTypeArr[apiType].packsList,
    method: 'get',
    params: {
      hot: 1,
    },
  });
}

/**
 * 获取游戏中心，新推礼包列表
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getNewPacks() {
  return ajax({
    url: apiTypeArr[apiType].packsList,
    method: 'get',
    params: {
      new: 1,
    },
  });
}

/**
 * 获取游戏中心，全部礼包列表，考虑下拉加载
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getAllPacks(query) {
  const params = {
    page: query.page,
    limit: query.limit,
  };
  return ajax({
    url: apiTypeArr[apiType].packsList,
    method: 'get',
    params,
  });
}

/**
 * 获取游戏中心,游戏详情，不包括绑定的礼包，任务，评论
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getGameInfo(query) {
  const params = {
    id: query.id,
    nologin: 1,
  };
  return ajax({
    url: apiTypeArr[apiType].getGameInfo,
    method: 'get',
    params,
  });
}
