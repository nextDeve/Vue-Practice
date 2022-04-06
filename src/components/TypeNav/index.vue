<template>
  <div>
    <div class="type-nav">
      <div
        class="container"
        @mouseenter="showAllCategory"
        @mouseleave="hiddenAllCategory"
      >
        <h2 class="all">全部商品分类</h2>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <transition name="sort">
          <div class="sort" v-show="isShow || show">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(category, index) in categoryList"
                :key="category.categoryId"
                :class="{ cur: current === index }"
                @mouseleave="changeCurrent(-1)"
                @click.prevent="goSearch"
              >
                <h3 @mouseenter="changeCurrent(index)">
                  <a
                    href=""
                    :data-categoryName="category.categoryName"
                    :data-category1id="category.categoryId"
                    >{{ category.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: current === index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="child in category.categoryChild"
                    :key="child.categoryId"
                  >
                    <dl>
                      <dt>
                        <a
                          href=""
                          :data-categoryName="child.categoryName"
                          :data-category2id="child.categoryId"
                          >{{ child.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="childChild in child.categoryChild"
                          :key="childChild.categoryId"
                        >
                          <a
                            href=""
                            :data-categoryName="childChild.categoryName"
                            :data-category3id="childChild.categoryId"
                            >{{ childChild.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  inject: ["show"],
  setup() {
    let current = ref(-1);
    let isShow = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const categoryList = computed(() => {
      return store.state.home.category;
    });
    function goSearch(event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        location.params = route.params;
        router.push(location);
      }
    }
    function changeCurrent(index) {
      this.current = index;
    }
    function showAllCategory() {
      if (route.path === "/home") return;
      this.isShow = true;
    }
    function hiddenAllCategory() {
      if (route.path === "/home") return;
      this.isShow = false;
    }
    return {
      categoryList,
      current,
      isShow,
      changeCurrent,
      goSearch,
      showAllCategory,
      hiddenAllCategory,
    };
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    .sort-enter-from {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.1s linear;
    }
  }
}
</style>