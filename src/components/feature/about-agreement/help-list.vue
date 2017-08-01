<style>
	.list, .icon {
		color: #3c3e45;
	}

	.icon {
		font-size: 2.4rem;
		color:#bbbbbb;
	}

	.list .open {
		transform:rotate(180deg);
		-webkit-transform:rotate(180deg);
	}

	.bar, .title {

		font-size: 1.6rem;
		font-weight: 500;
	}


	.title {
		height: 4rem;
		line-height: 4rem;
		margin: 0;
		border-bottom: 1px solid #eaeaea;
	}
	.content {
		font-size: 1.4rem;
		background-color: #f8f8f8;
		padding: .5rem 1.5rem;
		color:#898989;
		line-height: 2rem;
	}
	.content > p {
		margin-bottom: .5rem;
	}
</style>
<template>
	<ul class="list">
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
          1. 什么是淘游夺宝？
				</span>
				<i class="icon icon-keyboard_arrow_down open"></i>
			</h3>
			<section class="content">
				<p>
          淘游夺宝是一个“我为人人、人人为我”的新型互助平台，它将用户共同需求的商品分成若干等份，1元即可支持1等份，当1件商品的所有等份都获得支持后，系统将根据规则计算出一个幸运号码，根据淘游夺宝服务协议，此商品将归持有该幸运号码的参与者所有。
				</p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
          2. 怎么参与淘游夺宝？
				</span>
				<i class="icon icon-keyboard_arrow_down"></i>
			</h3>
			<section class="content hidden">
				<p>
          （1）首先选择您想要的商品，然后选择您要参与的人次数（参与的人次数越多，获得该商品的概率越大）进行参与；
				</p>
        <P>
          （2）参与成功后，您会获得相应数量的参与号码。当该商品的参与人次数达到总需人次后，系统开始计算唯一的幸运号码；
        </P>
        <P>
          （3）结果揭晓后，若您参与号码中有与该商品的幸运号码一致的号码，则您获得该商品。
        </P>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
          3. 幸运号码如何产生？
				</span>
				<i class="icon icon-keyboard_arrow_down "></i>
			</h3>
			<section class="content hidden">
				<p>
          （1）商品的最后一个号码认购完毕后，将公示该认购时间点前本站全部商品的最后100个记录的参与时间（包括该商品最后一个参与时间）；
        </p>
				<p>
          （2）将这100条记录的时间按照时、分、秒、毫秒组合（如19:23:54.124则是192354124），然后相加，得到数值A；
        </p>
				<p>
          （3）数值A除以商品总需人次数，得到一个余数，用这个余数加上原始数10000001，得到幸运号码。拥有该幸运号码者，获得该商品。
        </p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
          4. 什么是淘币？
				</span>
				<i class="icon icon-keyboard_arrow_down "></i>
			</h3>
			<section class="content hidden">
				<p>
          淘币是您支付人民币后获得、用于参与淘游夺宝的凭据。每充值1元可获得1淘币，您可凭淘币参与淘游夺宝。
				</p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
					5. 如何获得淘币？
				</span>
				<i class="icon icon-keyboard_arrow_down "></i>
			</h3>
			<section class="content hidden">
				<p>
					您可在“淘游夺宝”页面或“我的”页面找到充值按钮进行充值，充值后获得相应数量的淘币。
				</p>
				<p>
					温馨提示：暂不支持夺宝券直接兑换成淘币。
				</p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
					6. 淘币和夺宝券能否提现？
				</span>
				<i class="icon icon-keyboard_arrow_down"></i>
			</h3>
			<section class="content hidden">
				<p>
					很抱歉，淘币和夺宝券不支持提现。
				</p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
					7. 怎么看我有没有获得商品？
				</span>
				<i class="icon icon-keyboard_arrow_down"></i>
			</h3>
			<section class="content hidden">
				<p>
					在您所参与的商品幸运号码公布后，您可以点击底部切换按钮进入“我的”页面查询结果。
				</p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
					8. 获得商品后我需要做什么？
				</span>
				<i class="icon icon-keyboard_arrow_down "></i>
			</h3>
			<section class="content hidden">

				<p>
					若您获得实物类商品，您需要进入商品确认页填写或确认收货地址。确认完毕后，我们会尽快给您安排快递配送；
				</p>
				<p>
					若您获得虚拟类商品（如话费充值卡），请进入商品确认页查看相应的卡号密码，然后进入相应网站进行操作即可。
				</p>
				<p>
					温馨提示：虚拟类商品存在有效期限制，获得商品后请尽快使用！
				</p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
					9. 我收到的商品可以换货或退货吗？
				</span>
				<i class="icon icon-keyboard_arrow_down"></i>
			</h3>
			<section class="content hidden">
				<p>
					非质量问题，不在三包范围内，不给予退换货。
				</p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
					10. 获得的商品如何保修？
				</span>
				<i class="icon icon-keyboard_arrow_down"></i>
			</h3>
			<section class="content hidden">
				<p>
					淘游夺宝所有商品均是从正规商家提供，100%正品保证，可享受厂家所提供的全国联保服务。如商品遇到质量问题，建议您第一时间联系该商品的官方指定售后维修点。
				</p>
			</section>
		</li>

		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
					11. 用户昵称能否修改？
				</span>
				<i class="icon icon-keyboard_arrow_down"></i>
			</h3>
			<section class="content hidden">
				<p>
					很抱歉，平台暂时不支持昵称修改。
				</p>
			</section>
		</li>
		<li>
			<h3 class="flex title pd-lr-10">
				<span class="flex-1">
					12. 参与淘游夺宝需要注意什么？
				</span>
				<i class="icon icon-keyboard_arrow_down "></i>
			</h3>
			<section class="content hidden">
				<p>
					请务必正确填写真实有效的联系电话、收货地址以便在您获得商品时能及时与您取得联系。
				</p>
			</section>
		</li>
	</ul>
</template>
<script>
	export default {
		methods:{
			goto(){

        $(".title").on("click",function(){
          var _this = $(this);
          _this.find(".icon-keyboard_arrow_down").toggleClass("open");
          _this.parents("li").find("section").toggleClass("hidden");
        })
			}
		},
		mounted(){
			this.goto();
		}
	}
</script>
