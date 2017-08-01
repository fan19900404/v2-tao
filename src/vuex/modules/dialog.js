/**
 *  注册弹框显示/隐藏控制
 */
import * as types from '../mutation-types';

const state = {
  bShow: false, // true：显示、false：隐藏
};

const mutations = {
  [types.UPDATE_DIALOG_SHOW](state, oState) {
    Object.assign(state, oState);
  },
};

export default {
  state,
  mutations,
};
