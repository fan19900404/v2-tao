export default {
  test: {
    //控制是否显示限时商品
    show_time_welfare:'/api/tao_you/show_time_welfare',
    //限时商品详情
    welfare_time_detail:'/api/welfare_time_detail',
    //获取即将到期的抵扣劵和礼包数量
    get_time_rebate:'/api/tao_you/get_time_rebate',
    //游戏任务
    game_task:'/api/tao_you/game_task',
    //控制是否显示限时任务
    time_task:'/api/tao_you/time_task',
    //任务是否完成
    task_finish:'/api/tao_you/task_finish',
    //商品列表
    welfare_list:'/api/tao_you/welfare_list',
    // 游戏详情
    game_detail: '/api/get_game_detail',
    // 咨询的搜索
    news_search_list: '/api/news_search_list',
    // 热词搜索
    hot_words_list: '/api/hot_words_list',
    // 游戏的搜索
    game_search: '/api/game_search',
    // 测试使用的礼包列表
    gifts_list: '/api/gifts_list',
    // 充值支付方式的获取
    charge_pay_type: '/Game/Index/get_member_pay',
    // 登录跳转到特殊的游戏链接
    special_game_url: '/Game/Api/game',
    // 查看用户是否通过微信登录了
    check_wechat_login: "/Api/Weixin/get_login_info",
    wechat_config: '/Api/Weixin/get_share',
    iframe_game_ticket: '/User/UserTicket/game_ticket',
    our_small_game_intro: '/Game/WebGame/get_game_desc',
    get_header_flag: '/api/get_header_flag',
    // 淘游游戏信息的请求地址
    tao_game_order_info: '/Order/Index/game_order_info',
    // 淘游助手支付地址
    tao_game_pay_url: '/Order/Index/get_game_pay_url',
    //添加图片
    upload_img:'http://interface.lly800.com/Show/Index/add_image',
    // 用户退出登录
    common_user_logout: '/api/common_user_logout',
    // 获取用户中奖信息
    common_user_luck_info: '/Goods/Index/get_user_luck_info',
    // 当前用户的信息
    common_userinfo: "/api/common_userinfo",
    // 检测当前用户的手机号码
    common_check_phone: "/api/common_check_phone",
    // 给当前的手机发送验证码
    common_send_code: "/api/common_send_code",
    // 检验当前的验证码是否正确
    common_check_code: "/api/common_check_code",
    // 设置用户的密码
    common_set_password: "/api/common_set_password",
    // 用户的登录
    common_user_login: "/api/common_user_login",
    get_user_info: "/Goods/Index/get_user_info",
    goods_graphic_details:"/api/goods_graphic_details",
    goods_detail:"/api/goods_detail",
    goods_comment:"/api/goods_comment",
    goods_history_reward:"/api/goods_history_reward",
    goods_history_reward_data:"/api/goods_history_reward_data",
    goods_join_details:"/api/goods_join_details",
    home_top_banner:"/api/home_top_banner",
    //页面出错替换
    error_alt_page:"/api/error_alt_page",
    home_notice_msg:"/api/home_notice_msg",
    home_goods_list:"/api/home_goods_list",
    home_goods_status:"/api/home_goods_status",
    one_to_twenty:"/api/1to20",
    share_order_list:"/api/share_list",
    share_order_detail:"/api/shaidan_detail",
    share_order_detail_like:"/api/share_order_detail_like",
    create_goods_buy:"/api/create_goods_buy",
    confirm_show:"/api/confirm_show",
    add_show:"/api/add_show",
    // 支付的接口
    get_pay_url:"/api/get_pay_url",
    // 淘币支付
    taobi_pay: "/api/taobi_pay",
    // 充值的接口
    charge_order:"/api/charge_order",
    // 订单详情
    order_info:"/Goods/Index/order_info",
    // 确认购买
    deal_buy:"/Goods/Index/deal_buy",
    // 晒单提示
    notice_confirm:"/Show/Index/notice_confirm",
    // 积分兑换首页
    integral_exchange_home: "/api/integral_exchange_home",
    // 积分兑换
    integral_exchange_record: "/api/integral_exchange_record",
    // 积分兑换操作
    integral_exchange: "/User/Money/exchange",
    // 积分记录
    // 首页的夺宝券接口
    home_show_gift: "/api/home_show_gift",
    //揭晓的接口
    jiexiao_index_rule: "/api/jiexiao_index_rule",

    //计算详情接口
    reckon_detail_data: "/api/reckon_detail_data",

    personal_index:"/api/personal/personal_home_data",
    personal_userinfo:"/api/personal/get_userinfo",
    //私信接口
    personal_private_letter:"/api/private_letter",
    //单个私信
    personal_single_letter:"/api/single_letter",
    //淘币充值明细接口
    personal_recharge_details:"/api/recharge_details",
    personal_update_username:"/api/personal/update_username",
    personal_send_bind_phone_code:"/api/personal/send_verifycode",
    personal_bind_phone:"/api/personal/bind_phone",
    personal_address_list:"/api/personal/address_list",
    personal_address_change_default:"/api/personal/change_default_address",
    personal_address_del:"/api/personal/del_address",
    personal_address_add:"",
    personal_address_update:"/api/personal/update_address",
    personal_his_center:"/api/hiscenter_data",
    personal_his_center_more_list:"",
    order_pay_info:"/api/buy/order_pay_info",
    can_use_ticket:"/api/can_use_ticket",
    newb_gift_index:"/api/newbgift/newb_gift_info",
    newb_gift_buy:"/api/newbgift/newb_gift_buy",
    newb_gift_check:"/api/newbgift//newb_gift_check",

    do_exchange_one: "/api/do_exchange",


    // 0元抢iphone7- 抢资格
    get_quota: "/api/get_quota_result",

    // 0元抢iphone7- 商品列表
    get_goods_list: "/api/get_goods_list",

    // 0元抢iphone7- 获取用户是否已经参与
    get_join_status: "/api/get_join_status",

    // 转盘活动-获取幸运用户列表
    get_lucky_users: "/api/get_lucky_users",
    //元宵活动接口
    get_money_top: "/api/lantern_festival",
    //淘游、一元购是否显示页面头部 数据接口
    get_footer_flag:"/api/get_footer_flag",
    // 淘游助手
    // 支付成功后的回调
    pay_callback: "",
    // 淘币支付
    taobipay_method: '/Order/Index/pay',
    // 支付宝支付
    alipay_method: '/Goods/Index/get_pay_url',
    // 游戏订单的信息
    game_order_info: '/api/game-order-info',
    // 游戏中心的banner
    game_center_banner: '/api/tao_you/get_banner_ad',
    // 游戏中心的游戏列表
    game_center_list: '/api/tao_you/game_list',
    // 我的游戏列表
    game_list: "/api/tao_you/game_list",
    //最新游戏列表
    new_game_list:"/api/tao_you/new_game_list",
    //首发推荐
    first_game_list:"/api/tao_you/first_game_list",
    //人气排行榜
    human_game_list:"/api/tao_you/human_game_list",
    //开服列表
    open_server_list:"/api/tao_you/open_server_list",
    //礼包列表
    packs_list:"/api/tao_you/packs_list",
    //礼包兑换结果，更多礼包接口，可能会与礼包列表合并
    more_packs_list:"/api/tao_you/more_packs_list",
    // 获取用户列表
    user_info_list:"/api/user_info_list",
    // 获取用户信息
    user_info: "/api/tao_you/get_user_info",

    // 获取主页一元购信息
    one_mail: "/api/one-mail-hot",

    // 获取新闻(游戏资讯)列表
    news_list: "/api/tao_you/news_list",

    // 相关资讯列表
    unite_news: "/api/tao_you/news_list",

    // 获取新闻(游戏资讯)内页
    news_detail: "/api/news-detail",

    // 评论列表
    news_comment_list: '/api/news-comment-list',

    // 新闻(游戏资讯)评论
    do_comment: "/api/do-comment",

    // 我的游戏列表
    my_game_list: "/api/tao_you/my_game_list",

    // 获取用户淘币消费明细
    taobi_daily_detail: "/api/tao_you/taobi_daily_detail",
    // 获取福利商城可兌换抵扣券列表
    ticket_list: "/api/ticket_list",

    // 淘豆兌换抵扣券接口
    do_exchange: "/api/tao_you/do_exchange",

    // 淘豆兌换抵扣券接口
    my_ticket_list: "/api/my-ticket-list",

    // 更新昵称
    update_nickname: "/api/tao_you/update_nickname",

    // 我的抵扣券的接口
    user_coupon_list:"/api/user-coupon-list",

    // 发送验证码
    send_validate_code:"/api/send-validateCode",

    // 绑定手机
    bind_phone:"/api/bind_phone",

    //首页玩游戏赢淘豆数据列表接口
    get_index_game_list:"/api/get_index_game_list",
    //淘豆使用明细
    taodou_detail:"/api/tao_you/get_taodou_log",
    //一元购淘豆使用明细
    one_taodou_detail:"/api/tao_you/get_taodou_log",
    //可兑换抵用券列表
    exchangebleList:"/api/tao_you/ticket_list",
    //我的抵扣券列表
    my_rebate_ticket_list:"/api/my_rebate_ticket_list",
    //游戏中心滚动信息
    game_center_scroll_msg:"/api/get_msg_list",
    //游戏中心推荐游戏
    geme_center_recommend_game_list:"/Game/WebGame/get_center_game_list",
    // 更多游戏 游戏竞技场
    my_taodou_match: '/api/taodou-match',
    // 支付宝支付链接
    alipay_iframe_url: '/Game/Api/create_order',
    personal_userticket_ticketlist:"/api/my_ticket_list",
    personal_user_money_index:"/api/my_ticket_list",
    //游戏下载量增加接口
    game_number:"/api/game_number",
    //兑换礼包接口
    exchange_gifts:"/api/tao_you/exchange_gifts",
    welcome_alert: "/api/welcome_alert",
    //发送游戏统计信息
    sendGameStatistics:"/Game/Index/game_click",
    // 未读消息数量
    my_notice_list_unread:"/api/tao_you/notice_list_unread",
    // 我的消息列表
    my_notice_list: "/api/tao_you/my_notice_list",
    // 全部已读
    read_all: "/api/tao_you/do_read_all",
    // 全部删除
    del_all: "/api/tao_you/do_del_all",
    update_notice_state: "/api/tao_you/update_notice_state",
    //淘游VT兌換禮包
    packs_detail:"/api/tao_you/packs_detail",
    //淘游VT任务列表
    packs_exchange: "/api/tao_you/packs_exchange",
    // 任务列表
    task_list: "/api/tao_you/get_task_list",
    // 活动列表 来源类型 1原创  2转载 3活动
    activity_list: "/api/tao_you/get_activity_news_list",
    // 平台礼包列表
    my_platform_list: "/api/tao_you/my_activity_code",
    // 使用平台礼包
    use_platform_gift: "/api/tao_you/check_activation_code",
    // 领取任务奖励
    get_task_award: "/api/tao_you/get_task_award",
    //是否有可领取的任务
    task_have: "/api/tao_you/task_have",
    //微端自动登录
    weclient_auto_login:"/api/weclient_auto_login",
  },
  production: {
    // 咨询的搜索
    news_search_list: '/News/Index/get_news_list',
    // 热词搜索
    hot_words_list: '/GiftPackage/Api/keyword',
    // 游戏的搜索
    game_search: '/Game/Index/select_game',
    // 测试使用的礼包列表
    gifts_list: '/GiftPackage/Api/lists',
    // 充值支付方式的获取
    charge_pay_type: '/Game/Index/get_member_pay',
    // 登录跳转到特殊的游戏链接
    special_game_url: '/Game/Api/game',
    wechat_config: '/Api/Weixin/get_share',
    iframe_game_ticket: '/User/UserTicket/game_ticket',
    our_small_game_intro: '/Game/WebGame/get_game_desc',
    get_header_flag: '/Index/Index/get_header_flag',
    // 淘游游戏信息的请求地址
    tao_game_order_info: '/Order/Index/game_order_info',
    // 淘游助手支付地址
    tao_game_pay_url: '/Order/Index/get_game_pay_url',
    //添加图片
    upload_img: 'http://interface.lly800.com/Show/Index/add_image',
    // 用户退出登录
    common_user_logout: '/User/Login/login_out',
    // 获取用户中奖信息
    common_user_luck_info: '/Goods/Index/get_user_luck_info',
    // 当前用户的信息
    common_userinfo: "/api/common_userinfo",
    // 检测当前用户的手机号码 @
    common_check_phone: "/User/Reg/check_phone",
    // 给当前的手机发送验证码 @
    common_send_code: "/Shared/Sms/send",
    // 检验当前的验证码是否正确 @
    common_check_code: "/User/Reg/check_sms_code",
    // 设置用户的密码 @
    common_set_password: "/User/Reg/register",
    // 更新用户的密码
    common_update_password: "/User/Login/set_password",
    // 用户的登录
    common_user_login: "/User/Login/login",
    get_user_info: "/Goods/Index/get_user_info",
    goods_graphic_details: "/Goods/Index/goods_graphic_details",
    goods_detail: "/Goods/Index/goods_detail",
    goods_comment: "/Goods/Index/goods_comment",
    goods_history_reward: "/Goods/Index/goods_history_reward",
    goods_history_reward_data: "/Goods/Index/goods_history_reward_data",
    goods_join_details: "/Goods/Index/goods_join_details",
    home_top_banner: "/Index/index/home_top_banner",
    home_notice_msg: "/Index/index/home_notice_msg",
    home_goods_list: "/Index/index/home_goods_list",
    home_goods_status: "/Index/index/home_goods_status",
    one_to_twenty: "/Index/Index/get1to20",
    share_order_list: "/Show/Index/share_list_rule",
    share_order_detail: "/Show/Index/share_detail_data",
    share_order_detail_like: "/Index/index/share_order_detail_like",
    create_goods_buy: "/Goods/Index/create_goods_buy",
    confirm_show: "/Show/index/confirm_show",
    add_show: "/Show/Index/add_show",
    // 支付的接口
    get_pay_url: "/Goods/Index/get_pay_url",
    // 淘币支付
    taobi_pay: "/Goods/Index/pay_with_taobi",
    // 充值的接口
    charge_order: "/Order/Index/charge_order",
    // 订单详情
    order_info: "/Goods/Index/order_info",
    // 确认购买
    deal_buy: "/Goods/Index/deal_buy",
    // 晒单提示
    notice_confirm: "/Show/Index/notice_confirm",
    // 积分兑换首页
    integral_exchange_home: "/User/Money/exchange_config",
    // 积分兑换
    integral_exchange_record: "/User/Money/exchange_record",
    // 积分兑换操作
    integral_exchange: "/User/Money/exchange",
    // 积分记录
    // 首页的夺宝券接口
    home_show_gift: "/Index/Index/show_notice",

    //揭晓的接口
    jiexiao_index_rule: "/Goods/Index/jiexiao_index_rule",

    //计算详情接口
    reckon_detail_data: "/Goods/Index/reckon_detail_data_rule",
    //个人中心接口
    personal_index: "/User/center/index", //页面加载及滚动加载更多时获取数据的接口
    personal_index_more: "/User/center/index_more_data", //切换标签是获取数据接口
    personal_userinfo: "/User/Index/user_info", //获取用户信息接口
    personal_update_username: "/User/Index/update_username",
    personal_send_bind_phone_code: "/Shared/Sms/send",
    personal_bind_phone: "/User/Index/bind_phone",
    personal_address_list: "/User/Center/address_list",
    personal_address_change_default: "/User/Center/change_default_address",
    personal_address_del: "/User/Center/del_address",
    personal_address_add: "/User/Center/add_address",
    personal_address_update: "/User/Center/update_address",
    personal_user_money_index: "/User/Money/Index",
    personal_user_log: "/Logs/Index/user_log",
    personal_userticket_ticketlist: "/User/UserTicket/ticket_list",
    personal_his_center: "/User/Center/his_center",
    personal_his_center_more_list: "/User/Center/his_center_more_list",
    //淘币充值明细接口
    personal_recharge_details: "/Game/WebGame/get_taodou_log",
    //私信接口
    personal_private_letter: "/User/UserMsg/get_user_msg_list",
    //单个私信
    notice_detail: "/User/UserMsg/get_user_msg_info",
    ticket_index: "/Ticket/Ticket/index",
    ticket_exchange: "/User/UserTicket/exchange",
    //订单支付情况
    order_pay_info: "/Order/Index/order_info",

    can_use_ticket: "/User/UserTicket/can_use_ticket",
    //新人壕礼获取信息接口
    newb_gift_index: "/Ticket/Gift/index",
    //新人壕礼购买接口
    newb_gift_buy: "/Ticket/Gift/buy",
    //新人壕礼购买之后判断购买是否成功接口
    newb_gift_check: "/Ticket/Gift/check",

    // 0元抢iphone7- 抢资格
    get_quota: "/User/Index/add_user_activity",

    // 0元抢iphone7- 商品列表
    get_goods_list: "/Goods/Index/get_act_goods",

    // 0元抢iphone7- 获取用户是否已经参与
    get_join_status: "/User/Index/find_user_draw",

    // 转盘活动-获取幸运用户列表
    get_lucky_users: "/User/Api/get_rand_user",
    //元宵红包上限接口
    get_money_top: "/Goods/Index/get_yuanxiao_goods",

    // 淘游助手
    // 支付成功后的回调
    pay_callback: "",
    // 淘币支付
    taobipay_method: '/Order/Index/pay',
    // 支付宝支付
    alipay_method: '/Goods/Index/get_pay_url',
    // 游戏订单的信息
    game_order_info: '/Order/Index/order_info',
    // 游戏中心的banner
    // 游戏中心广告
    game_center_banner: '/Game/Index/get_banner_ad',
    // 游戏列表(type:1游戏中心热门游戏推荐，2游戏中心H5游戏推荐，3游戏中心手游推荐,4首页热门游戏推荐)
    game_center_list: '/Game/Index/get_game_list',
    // 游戏详情
    game_detail: '/Game/Index/get_game_detail',

    // 我的游戏列表
    my_game_list: "/Game/Index/get_user_game",

    // 获取新闻(游戏资讯)列表
    news_list: "/News/Index/get_news_list",

    unite_news: "/News/Index/get_unite_news",

    // 获取新闻(游戏资讯)内页
    news_detail: "/News/Index/get_news_info",

    // 评论列表
    news_comment_list: '/News/NewsComment/get_comment_list',

    // 新闻(游戏资讯)评论
    do_comment: "/News/NewsComment/add",

    // 获取用户淘币消费明细
    taobi_daily_detail: "/User/Center/tao_bi_log",

    // 更新昵称
    update_nickname: "/User/Index/update_username",

    // 获取用户信息
    user_info: "/User/Index/user_info",

    // 获取主页一元购信息
    one_mail: "/Goods/Index/goods_detail",

    // 获取福利商城可兌换抵扣券列表
    ticket_list: "/Ticket/Ticket/lists",

    // 淘豆兌换抵扣券接口
    do_exchange: "/User/UserTicket/exchange",

    // 我的抵扣券列表
    my_ticket_list: "/User/UserTicket/ticket_list_new",

    // 我的抵扣券的接口
    user_coupon_list: "/User/UserTicket/ticket_list_new",

    // 发送验证码
    send_validate_code: "/Shared/Sms/send",

    // 绑定手机
    bind_phone: "/User/Index/bind_phone",
    //获取用户排名列表
    user_info_list: "/Game/WebGame/get_periods_rank",

    //首页玩游戏赢淘豆数据列表接口
    get_index_game_list: "/Game/WebGame/get_index_game_list",
    //淘豆使用明细
    taodou_detail: "/User/Center/tao_dou_log",
    //一元购淘豆使用明细
    one_taodou_detail: "/Game/WebGame/get_taodou_log",
    //可兑换抵用券列表
    exchangebleList: "/Ticket/Ticket/lists",
    //我的抵扣券列表
    my_rebate_ticket_list: "/User/UserGameTicket/lists",
    //游戏中心滚动信息
    game_center_scroll_msg: "/Game/WebGame/get_msg_list",
    //游戏中心推荐游戏
    geme_center_recommend_game_list: "/Game/WebGame/get_center_game_list",
    // 更多游戏 游戏竞技场
    my_taodou_match: '/Game/WebGame/get_game_lists',
    // 支付宝支付链接
    alipay_iframe_url: '/Game/Api/create_order',
    // 易接支付、创建订单
    create_order: '/Game/Api/create_soeasy_order',
    //兑换礼包接口
    exchange_gifts: "/Activity/ActivationCode/check_activation_code",
    welcome_alert: "/User/Index/alter",
    //发送游戏统计信息
    sendGameStatistics: "/Game/Index/game_click",
    my_notice_list: "/User/UserMsg/get_user_msg_list",
    // 全部已读
    read_all: "/User/UserMsg/read_user_msg",
    // 设置已读
    read_by_ids: "/User/UserMsg/read_user_by_ids",
    // 全部删除
    del_all: "/User/UserMsg/delete_user_msg",
    // 删除
    del_by_ids: "/User/UserMsg/delete_user_by_ids",
    // 微信登录
    wechat_login: "/Api/Weixin/index",
    // 查看用户是否通过微信登录了
    check_wechat_login: "/Api/Weixin/get_login_info",
    //禮包兌換
    packs_detail: "/GiftPackage/Api/detail",
    // 我的礼包
    my_gift_list: "/GiftPackage/Api/my_package",
    // 活动列表 来源类型 1原创  2转载 3活动
    activity_list: "/News/Index/get_activity_news_list",
    //淘游VT任务列表
    task_list: "/Task/Index/get_task_list",
    //人气排行榜
    human_game_list: "/Game/Index/get_rank_data",
    //开服列表
    open_server_list: "/Game/Index/get_open_service",
    //游戏礼包列表
    packs_list: "/GiftPackage/Api/lists",
    //淘游VT礼包领取
    packs_exchange: "/GiftPackage/Api/receive",
    //首发推荐
    first_game_list: "/Game/Index/game_first",
    //最新游戏列表
    new_game_list: "/Game/Index/game_new",
    // 平台礼包列表
    my_platform_list: "/PlatformPackage/PlatformPackage/my_activity_code",
    // 使用平台礼包
    use_platform_gift: "/PlatformPackage/PlatformPackage/send_user_code",
    exchange_platform_gift: "/PlatformPackage/PlatformPackage/check_activation_code",
    //游戏中心大家都在玩
    game_center_user_recommend: "/Game/Index/get_recommend",
    // 领取任务奖励
    get_task_award: "/Task/Index/exchange_reward",
    //登录送淘豆
    get_login_packs: "/Activity/Activity/get_login_taodou",
    //是否有可领取的任务
    task_have: "/Task/Index/check_task_achieve",
    //微端自动登录
    weclient_auto_login:"/User/Login/app_login",
    //查询订单状态
    get_order_status: "/Order/Index/get_order_status",
    //实物商品列表
    welfare_list:"/GiftPackage/Api/get_gift_activity",
    //任务是否完成
    task_finish:'/Task/Index/task_user_msg',
    //任务模块游戏任务的接口
    game_task:'/Task/Index/get_task_game_user_list',
    //限时商品列表
    welfare_time_list:'/Goods/Index/goods_discount',
    //限时商品详情
    welfare_time_detail:'/Goods/Index/goods_discount_details',
    //控制是否显示限时任务
    time_task:'/Task/Index/task_limit',
    //控制是否显示限时商品
    show_time_welfare:'/Goods/Index/check_discount',
  }
}
