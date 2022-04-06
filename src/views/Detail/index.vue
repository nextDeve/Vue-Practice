<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-for="(value, index) in categoryView" :key="index">
          {{ value }}
        </span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuDefaultImg="skuInfo.skuDefaultImg" />
          <!-- 小图列表 -->
          <ImageList
            :skuImageList="skuInfo.skuImageList"
            :skuDefaultImg="skuInfo.skuDefaultImg"
          />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{ skuInfo.skuName }}
            </h3>
            <p class="news">
              {{ skuInfo.skuDesc }}
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray"
                    >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                  >
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl
                v-for="(attr, index1) in skuAttrList"
                :key="index1"
                @click="changeSelectAttrs"
              >
                <dt class="title">{{ attr.saleAttrName }}</dt>
                <dd
                  v-for="(value, index2) in attr.spuSaleAttrValueList"
                  :key="index2"
                  :class="{ active: index2 === seletedAttrs[index1] }"
                  :data-attrId="index1"
                  :data-attrValue="index2"
                >
                  {{ value.saleAttrValueName }}
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input
                  autocomplete="off"
                  class="itxt"
                  v-model="buyNum"
                  @change="inputBuyNum"
                />
                <a href="javascript:" class="plus" @click.prevent="addBuyNum"
                  >+</a
                >
                <a href="javascript:" class="mins" @click.prevent="mulBuyNum"
                  >-</a
                >
              </div>
              <div class="add">
                <a href="javascript:" @click="addShopCart">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Detail",
  components: {
    ImageList,
    Zoom,
  },
  setup() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    let seletedAttrs = ref(new Array(10).fill(0));
    let buyNum = ref(1);

    let categoryView = computed(() => {
      return store.getters.categoryView;
    });
    let price = computed(() => {
      return store.state.detail.detaiInfo.price;
    });
    let skuInfo = computed(() => {
      return store.getters.skuInfo;
    });
    let skuAttrList = computed(() => {
      return store.getters.skuAttrList;
    });
    function addShopCart() {
      store
        .dispatch("addOrUpdateShopCart", {
          skuId: route.params.skuid,
          skuNum: buyNum.value,
        })
        .then(
          () => {
            sessionStorage.setItem("SKUINFO", JSON.stringify(skuInfo.value));
            sessionStorage.setItem(
              "SELECTEDATTRS",
              JSON.stringify(seletedAttrs.value)
            );
            sessionStorage.setItem(
              "ATTRLIST",
              JSON.stringify(skuAttrList.value)
            );
            router.push({
              path: "/addCartSuccess",
              query: { skuNum: buyNum.value },
            });
          },
          () => {
            alert("添加购物车失败！");
          }
        );
    }
    function changeSelectAttrs(event) {
      let { attrid, attrvalue } = event.target.dataset;
      if (!attrid && !attrvalue) return;
      seletedAttrs.value[attrid] = attrvalue * 1;
    }
    function addBuyNum() {
      buyNum.value += 1;
    }
    function mulBuyNum() {
      if (buyNum.value > 1) {
        buyNum.value -= 1;
      }
    }
    function inputBuyNum(event) {
      let newValue = event.target.value * 1;
      if (isNaN(newValue)) buyNum.value = 1;
      else buyNum.value = newValue;
    }
    onMounted(() => {
      store.dispatch("getDetaiInfo", route.params.skuid);
    });
    return {
      categoryView,
      price,
      skuInfo,
      skuAttrList,
      seletedAttrs,
      buyNum,
      changeSelectAttrs,
      addBuyNum,
      mulBuyNum,
      inputBuyNum,
      addShopCart,
    };
  },
};
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>