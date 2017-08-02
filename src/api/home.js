import ajax from '../http/http';
import { apiType, apiTypeArr } from '../config/index';

/**
 * 获取banner的轮播图
 *
 * @export
 * @param {number} page 页码
 * @param {number} limit 每页返回数据条数
 * @param {number} type 类型
 * @param {number} nologin 是否需要登陆
 * @returns
 */
export function getSwiperList(page = 1, limit = 8, type = 4, nologin = 1) {
  return ajax({
    url: apiTypeArr[apiType].getSwiperList,
    method: 'get',
    params: {
      page,
      limit,
      type,
      nologin,
    },
  });
}

/**
 * 获取热门游戏推荐列表
 *
 * @export
 * @param {number} [page=1] 页码
 * @param {number} [limit=8] 每页返回数据条数
 * @param {number} [type=4] 类型
 * @param {number} [nologin=1] 是否要登陆
 * @returns
 */
export function getGameList(page = 1, limit = 8, type = 4, nologin = 1) {
  return ajax({
    url: apiTypeArr[apiType].getGameList,
    method: 'get',
    params: {
      page,
      limit,
      type,
      nologin,
    },
  });
}

/**
 * 获取热门礼包信息
 *
 * @export
 * @param {number} [page=1] 页码
 * @param {number} [limit=4] 每页信息条数
 * @param {number} [hot=1] 类型
 * @param {number} [nologin=1] 是否登陆
 * @returns
 */
export function getGiftsList(page = 1, limit = 4, hot = 1, nologin = 1) {
  return ajax({
    url: apiTypeArr[apiType].getGiftsList,
    method: 'get',
    params: {
      page,
      limit,
      hot,
      nologin,
    },
  });
}

/**
 * 获取新闻资讯列表
 *
 * @export
 * @param {any} query 需要的参数
 * @property {number} query.type 类型（本项目是淘游资讯，默认为1）
 * @property {number} query.page 页码
 * @property {number} query.limit 每页条数
 * @property {number} query.nologin 是否登陆
 * @property {number} query.fromType 资讯类型，不传默认全部（1：原创:2：转载:3：活动）
 * @returns
 */
export function getNewsList(query) {
  const params = {
    type: 1, // 淘游资讯
    page: query.page || 1,
    limit: query.limit || 4,
    nologin: query.nologin || 0,
  };
  if (query.fromType) {
    params.fromType = query.fromType; // 1：原创:2：转载:3：活动
  }
  return ajax({
    url: apiTypeArr[apiType].getNewsList,
    method: 'get',
    params,
  });
}

/**
 * 获取新闻资讯详细
 *
 * @export
 * @param {any} newsID 新闻id
 * @param {number} [nologin=1] 是否要求登陆
 * @returns
 */
export function getNewsDetail(newsID, nologin = 1) {
  return ajax({
    url: apiTypeArr[apiType].getNewsDetail,
    method: 'get',
    params: {
      newsID,
      nologin,
    },
  });
}

/**
 * 获取资讯评论列表
 *
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getCommentList(query) {
  const params = {
    /** 新闻id */
    newsID: query.newsID,
    /** 展示类型 */
    showType: query.showType || 2,
    /** 是否要求登陆 */
    nologin: query.nologin || 0,
    /** 类型 1：资讯(原创、转载、活动) 2：游戏 */
    fromType: query.fromType || 1,
  };
  return ajax({
    url: apiTypeArr[apiType].getNewsCommentList,
    method: 'get',
    params,
  });
}

/**
 * 获取相关资讯列表
 *
 * @export
 * @param {any} query 对象参数
 * @returns
 */
export function getNewsRelated(query) {
  const params = {
    /** 新闻id */
    newsID: query.newsID,
    /** 页码 */
    page: query.page || 1,
    /** 每页需要的数据条数 */
    limit: query.limit || 1,
    /** 是否需要登陆 */
    nologin: query.nologin || 0,
  };
  return ajax({
    url: apiTypeArr[apiType].getNewsRelated,
    method: 'get',
    params,
  });
}
