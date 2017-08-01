'use strict';

export const payType = {
  aliPay: 1,    // 支付宝支付
  eBank: 4, // 银联支付
  taoBi: 5, // 淘币支付
  weChat: 6,    // 微信支付（微信环境）
  weChatWithQRCode: 7,// 微信支付（非微信环境）（二维码支付）
  haifuWeChat: 8// 微信支付(海富)（非微信环境）（非pc环境）
};