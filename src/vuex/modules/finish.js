import { UPDATE_TASK_FLAG } from '../mutation-types';

const state = {
  isComplete: false,
  content: null,
};

const mutations = {
  // 修改夺宝是否显示
  [UPDATE_TASK_FLAG](state, obj) {
    state.isComplete = obj.isComplete;
    state.content = obj.content;
  },
};

export default {
  state,
  mutations,
};
