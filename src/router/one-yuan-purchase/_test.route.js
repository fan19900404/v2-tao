// dreamapple 测试路由
'use strict';
export default {
  // 测试
  '/test': {
    name: 'test',
    component: function (resolve) {
      require(['../../oldPages/_demo/demo.page'], resolve)
    }
  }
};
