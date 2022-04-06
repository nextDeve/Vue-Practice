<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="(order, index) in orderList.records"
          :key="index"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">
                  {{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete">
                    <img src="../images/delete.png" />
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, index) in order.orderDetailList" :key="index">
              <td width="60%">
                <div class="typographic">
                  <img :src="detail.imgUrl" style="height: 82px; width: 82px" />
                  <a href="#" class="block-text">
                    {{ detail.skuName }}
                  </a>
                  <span>x{{ detail.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-if="index === 0"
                width="8%"
                class="center"
              >
                {{ order.consignee }}
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-if="index === 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-if="index === 0"
                width="8%"
                class="center"
              >
                <a href="#" class="btn">{{ order.processStatus }} </a>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-if="index === 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <Pagenation
          :page="page"
          :pageSize="limit"
          :total="orderList.total"
          :continues="5"
          @getPageNum="getPageNum"
        ></Pagenation>
      </div>
    </div>
  </div>
</template>

<script>
import { reqMyOrderList } from "@/api";
import { onMounted, ref } from "vue";
export default {
  name: "MyOrder",
  setup() {
    let orderList = ref({});
    let page = ref(1);
    let limit = ref(3);

    function getData() {
      reqMyOrderList(page.value, limit.value).then((response) => {
        if (response.code === 200) {
          orderList.value = response.data;
        }
      });
    }
    function getPageNum(pageNum) {
      page.value = pageNum;
      getData();
    }
    onMounted(() => {
      getData();
    });

    return {
      orderList,
      page,
      limit,
      getData,
      getPageNum,
    };
  },
};
</script>

<style>
</style>