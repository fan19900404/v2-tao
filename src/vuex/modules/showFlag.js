import * as types from '../mutation-types';

const state = {
  duoBaoFlag: null,
  outFlag: null,
};

const mutations = {
  // 修改夺宝是否显示
  [types.UPDATE_FOOTER_FLAG](state, obj) {
    Object.assign(state, obj);
  },
};

export default {
  state,
  mutations,
};
