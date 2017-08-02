/**
 * integral-exchange：积分兌换
 * jifen_explain：积分说明
 * exchange-record：兑换记录
 * taobi：我的淘币
 * taodou：我的淘豆
 * taodou_explain：淘豆使用说明
 * taobi_explain：淘币使用说明
 * taodou_dh：福利商城
 */
let router = {};
const pages = ['integral-exchange', 'integral-intro', 'exchange-record', 'taobi', 'taodou', 'taodou-explain', 'taodou-dh','taobi-explain', 'my-coupon-list'];

pages.forEach(function(page) {
  var name = '/welfare/' + page;
  router[name] = {
    name: name,
    component: function(resolve) {
      require(['../../oldPages/about-welfare/' + page + '.page'], resolve)
    }
  }
});

export default router;
