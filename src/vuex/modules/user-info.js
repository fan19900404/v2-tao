'use strict';

import * as types from '../mutation-types';

const state = {
  'alterMoney': undefined,
  'isShowAlter': undefined,
  'userId': '',
  'username': '',
  'avatar': '/static/images/tao-you/personal-center/default-head.png',
  'bindPhone': '',
  'taoBi': 0,
  'taoDou': 0,
  'isCanUpdateName': 0,
  'isShowSoreExchange': 0,
  'newNoticeFlag': 0,
  'day_taodou':0,
  'expiring':0
};

const mutations = {

  // 修改用户信息
  [types.UPDATE_USERINFO] (state, oUser) {
    Object.assign(state, oUser);
  },
  [types.UPDATE_USERIMG] (state, newImgUrl) {
    state.avatar=newImgUrl
  }

};

export default {
  state,
  mutations
}
