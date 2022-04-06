<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(item, index) in shopcartList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="ChangeShopCartState(item, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <span class="price"> {{ item.cartPrice }}</span>
          </li>
          <li class="cart-list-con4">
            <a
              href="javascript:void(0)"
              class="mins"
              @click.prevent="handleNumChange(0, item, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handleNumChange(1, item, $event.target.value * 1)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click.prevent="handleNumChange(2, item, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con5">
            <span class="sum">{{ item.cartPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con6">
            <a
              href="#none"
              class="sindelet"
              @click.prevent="deleteShopCart(item.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && shopcartList.length > 0"
          @change="changeAllseletedState"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click.prevent="deleteSelectedSku">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ seletedSkuNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "ShopCart",
  setup() {
    let store = useStore();
    let shopcartList = computed(() => {
      return store.getters.shopcartInfo;
    });
    let totalPrice = computed(() => {
      let total = 0;
      shopcartList.value.forEach((item) => {
        total += item.cartPrice * item.skuNum;
      });
      return total;
    });
    let isAllChecked = computed(() => {
      let result = shopcartList.value.every((item) => {
        return item.isChecked === 1;
      });
      return result;
    });
    let seletedSkuNum = computed(() => {
      return shopcartList.value.reduce((pre, cur) => {
        if (cur.isChecked === 1) {
          return pre + 1;
        }
        return pre;
      }, 0);
    });
    function handleNumChange(type, item, num) {
      let disNum = 0;
      switch (type) {
        case 0:
          disNum = item.skuNum > 1 ? -1 : 0;
          break;
        case 2:
          disNum = 1;
          break;
        case 1:
          console.log(num);
          if (isNaN(num) || num < 1) disNum = 0;
          else disNum = parseInt(num) - item.skuNum;
          break;
      }
      store
        .dispatch("addOrUpdateShopCart", {
          skuId: item.skuId,
          skuNum: disNum,
        })
        .then(
          () => {
            store.dispatch("getShopCartInfo");
          },
          () => {
            alert("修改购物车失败！");
          }
        );
    }
    function deleteShopCart(skuId) {
      store.dispatch("deleteShopCart", skuId).then(
        (response) => {
          store.dispatch("getShopCartInfo");
        },
        (error) => {
          alert(error);
        }
      );
    }
    function ChangeShopCartState(item, event) {
      let isChecked = event.target.checked ? "1" : "0";
      store
        .dispatch("ChangeShopCartState", { skuId: item.skuId, isChecked })
        .then(
          (response) => {
            store.dispatch("getShopCartInfo");
          },
          (error) => {
            alert(error);
          }
        );
    }
    function deleteSelectedSku() {
      let promisses = new Array();
      shopcartList.value.forEach((item) => {
        if (item.isChecked === 1) {
          promisses.push(store.dispatch("deleteShopCart", item.skuId));
        }
      });
      Promise.all(promisses).then(
        (response) => {
          store.dispatch("getShopCartInfo");
        },
        (error) => {
          alert(error);
        }
      );
    }
    function changeAllseletedState(event) {
      let promisses = new Array();
      let state = event.target.checked ? 1 : 0;
      shopcartList.value.forEach((item) => {
        if (item.isChecked != state) {
          promisses.push(
            store.dispatch("ChangeShopCartState", {
              skuId: item.skuId,
              isChecked: state === 1 ? "1" : "0",
            })
          );
        }
      });
      Promise.all(promisses).then(
        (response) => {
          store.dispatch("getShopCartInfo");
        },
        (error) => {
          alert(error);
        }
      );
    }
    onMounted(() => {
      store.dispatch("getShopCartInfo");
    });
    return {
      shopcartList,
      totalPrice,
      isAllChecked,
      seletedSkuNum,
      handleNumChange,
      deleteShopCart,
      ChangeShopCartState,
      deleteSelectedSku,
      changeAllseletedState,
    };
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;
        }

        .cart-list-con4 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con5 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con6 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>