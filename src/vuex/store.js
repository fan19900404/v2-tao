/**
 * Created by litian on 16/8/23.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import personal from './modules/personal';
import pay from './modules/pay';
import demo from './modules/demo';
import component from './modules/component';
import UserInfo from './modules/user-info';
import Header from './modules/header';
import ShowFlag from './modules/showFlag';
import RegDialog from './modules/dialog';
import finish from './modules/finish';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  actions,
  // 组合各个模块
  modules: {
    personal,
    demo,
    pay,
    component,
    UserInfo,
    Header,
    ShowFlag,
    RegDialog,
    finish,
  },
  strict: true,
});
