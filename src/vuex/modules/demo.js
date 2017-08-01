/**
 * Created by litian on 16/8/23.
 */

import { DEMO } from '../mutation-types';

const state = {
  count: 0,
};

const mutations = {
  // 淘币
  [DEMO](state, num) {
    state.count = num;
  },
};

export default {
  state,
  mutations,
};
