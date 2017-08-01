/**
 * Created by houcaiyun on 16/10/25.
 */

'use strict';
let router = {
  //最新揭晓首页
  '/publish':{
  name:'announce-index',
  component:function (resolve) {
    require(['../../pages/about-announcement/index.page'],resolve)
  }
 },

 //图文详情页面
 // "/goods-graphic-details/:id": {
 //    name: 'goods-graphic-details',
 //    component: function (resolve) {
 //      require(['../../pages/about-announcement/picture-detail.page'], resolve)
 //    }
 //  },

   //往期揭晓页面
  "/reckonList/:goodsTermId": {
		name: 'reckonList',
		component: function (resolve) {
			// dr 已经揭晓列表
			require(['../../pages/about-announcement/pre-announce.page'], resolve)
		}
	},

//计算详情
 "/reckon/:goodsNumId": {
		name: 'reckon',
		component: function (resolve) {
      		require(['../../pages/about-announcement/calc-detail.page'], resolve)
    	}
	},

  //计算公式
  "/resultText": {
		name: 'resultText',
		component: function (resolve){
			require(['../../pages/about-announcement/calc-rule.page'], resolve)
		}
	}
}


export default router;
