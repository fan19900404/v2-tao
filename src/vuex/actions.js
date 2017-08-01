/**
 * Created by litian on 16/8/23.
 */
import Vue from 'vue';
import * as types from './mutation-types';

// 测试vuex
export const showDemo = function ({ commit, state }, num) {
  commit(types.DEMO, num);
};
// 购买商品
export const buyGoodsUpdateTaoBi = function ({ commit, state }, params) {
  commit(types.BUY_GOODS, params);
};
// 充值 淘金币
export const updateTaobi = function ({ commit, state }, num) {
  commit(types.UPDATE_TAOBI, num);
};

// 收货地址列表
export const setAddressList = function ({ commit, state }, list) {
  commit(types.SET_ADDRESS_LIST, list);
};

// 关于现实ICP备案
export const showReview = function ({ commit, state }, isShow) {
  commit(types.UPDATE_REVIEW_STATUS, isShow);
};

// 关于礼物的显示
export const showRewardReview = function ({ commit, state }, isShow) {
  commit(types.UPDATE_REWARD_STATUS, isShow);
};

/** ***************************修改用户信息**************************** */
// 获取用户信息
export const getUserInfo = function ({ commit, state }, callback) {
  // if(this.user.username == ''){
  Vue.ClientHttp().GET({}, Vue.ClientUrl.user_info).then((res) => {
    if (res.code === 10000) {
      commit(types.UPDATE_USERINFO, res.result);
      // 登陆成功
      localStorage.setItem('login', 1);
      // 获取 userId
      localStorage.setItem('uID', res.result.userId);
    } else {
      // 未登录
      localStorage.setItem('login', 0);
      // 重新设置 userId
      localStorage.setItem('uID', '');
    }
    if (typeof callback === 'function') {
      callback();
    }
  });
  // }
};

// 修改用户信息
export const updateUserInfo = function ({ commit, state }, oUser) {
  commit(types.UPDATE_USERINFO, oUser);
};

// 修改用户头像路径
export const updateUserInfoImg = function ({ commit, state }, newImgUrl) {
  commit(types.UPDATE_USERIMG, newImgUrl);
};

// 淘游底部菜单栏是否显示夺宝项
export const getFooterFlag = function ({ commit, state }) {
  // if (this.footerFlag === null) {
  //   Vue.OneMallHttp().GET({
  //     nologin: 1
  //   }, Vue.OneMallUrl.get_header_flag)
  //     .then(({code, result} = res) => {
  //     if(code === 10000){
  //     commit(types.UPDATE_FOOTER_FLAG, result.duoBaoFlag);
  //   }
  // });
  // }
  Vue.OneMallHttp()
    .GET(
    {
      nologin: 1,
      mID: localStorage.getItem('mID') || 8,
    },
      Vue.OneMallUrl.get_header_flag,
    )
    .then(({ code, result } = res) => {
      if (code === 10000) {
        commit(types.UPDATE_FOOTER_FLAG, {
          duoBaoFlag: result.duoBaoFlag,
          outFlag: result.outFlag,
        });
      }
    });
};

export const toggleFooterFlag = function ({ commit, state }, flag) {
  commit(types.UPDATE_FOOTER_FLAG, flag);
};
/** *************************淘游、一元购共通************************** */
// 是否显示app头部
export const getHeaderFlag = function ({ commit, state }) {
  if (state.headerFlag === null) {
    Vue.OneMallHttp()
      .GET(
      {
        nologin: 1,
        mID: localStorage.getItem('mID') || 8,
      },
        Vue.OneMallUrl.get_header_flag,
      )
      .then(({ code, result } = res) => {
        if (code === 10000) {
          commit(types.UPDATE_HEADER_FLAG, result.headFlag);
        }
      });
  }
};

// 注册弹框显示控制
export const updateDialogState = function ({ commit, state }, oState) {
  commit(types.UPDATE_DIALOG_SHOW, oState);
};

// 任务完成的提示
export const updaTaskState = function ({ commit, state }, obj) {
  Vue.ClientHttp().GET({}, Vue.ClientUrl.task_finish).then((res) => {
    if (res.code == 10000) {
      commit(types.UPDATE_TASK_FLAG, {
        isComplete: res.result.status,
        content: res.result.title,
      });
    }
  });
};
