<style scoped>
	.content {
		padding: 1.6rem;
	}

	.paragraph {
		margin-bottom: 1.6rem;
	}

	.paragraph > h4 {
		font-size: 1.4rem;
		line-height: 2rem;
		color: #000;
		font-weight: normal;
	}

	.paragraph > p {
		font-size: 1.4rem;
		line-height: 2rem;
		color: #898989;
	}

	table {
		color: #898989;
	}
</style>

<template>
	<app-header :title="'使用说明'"></app-header>
	<section class="content">
		<div class="paragraph">
			<h4>一、淘豆规则</h4>
			<p>1）淘豆有什么用途？</p>
			<p>用户获得的淘豆可用来兑换夺宝券。</p>
			<p>2）如何获得淘豆？</p>
			<p>每个用户参与某期夺宝，若未持有该期夺宝活动幸运号码，即可获得淘豆。在该期夺宝揭晓后，相应数量的淘豆将自动赠送至未中奖的用户账户（淘豆获得数以实际支付金额为准，夺宝券减免金额不纳入换算范围）。</p>
			<p>消费获得淘豆明细如下：</p>
			<table>
				<tr>
					<td>消费金额（元）</td>
					<td>获得淘豆（个）</td>
				</tr>
				<tr>
					<td>1~9</td>
					<td>8</td>
				</tr>
				<tr>
					<td>10~19</td>
					<td>80</td>
				</tr>
				<tr>
					<td>20~29</td>
					<td>180</td>
				</tr>
				<tr>
					<td>30~39</td>
					<td>280</td>
				</tr>
				<tr>
					<td>40~49</td>
					<td>380</td>
				</tr>
				<tr>
					<td>50~59</td>
					<td>480</td>
				</tr>
				<tr>
					<td>60~69</td>
					<td>580</td>
				</tr>
				<tr>
					<td>70~79</td>
					<td>680</td>
				</tr>
				<tr>
					<td>80~89</td>
					<td>780</td>
				</tr>
				<tr>
					<td>90~99</td>
					<td>880</td>
				</tr>
				<tr>
					<td>100元以上</td>
					<td>1000</td>
				</tr>
			</table>
      <p>注：淘豆返利不能与其他促销活动同时享用，淘游夺宝有权在必要时通过发出公告等合理方式修改淘豆规则。</p>
		</div>
		<div class="paragraph">
			<h4>二、夺宝券使用细则</h4>
			<p>1）夺宝券可通过参与活动、淘豆兑换等方式获得，每张夺宝券均需满足一定使用条件才可使用；</p>
			<p>2）当拥有夺宝券的时候，例如1元夺宝券（满5可用），若想使用这张夺宝券，则必须单笔购买满5或5人次以上，点击立即购买，此时会弹出您可以使用的夺宝券列表，勾选您想使用的夺宝券，点击使用夺宝券，即可进入付款页面确认购买；</p>
			<p>3）用户参与某件商品的夺宝并成为幸运获得者，且此订单使用过夺宝券支付，如因该商品质量问题需要退货，退款结算按照实际支付金额退款，已使用的夺宝券将返还至用户账户中；</p>
			<p>4）夺宝券必须在有效期内使用，每张订单只能使用一张夺宝券，并且不能与其他促销活动同时享用，非特殊情况夺宝券一旦使用将无法退回；</p>
			<p>5) 本细则最终解释权归淘游夺宝所有。</p>
		</div>
	</section>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  export default {
    components: {
      AppHeader,
      AppBottomBar
    },
    mounted() {
      $("body").css({"background-color":"#f8f8f8"});
    }
  }
</script>
