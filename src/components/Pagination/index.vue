<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="page === 1" @click="goPage(page - 1)">上一页</button>
    <button
      v-show="statrEndNumber.start > 1"
      @click="goPage(1)"
      :class="{ active: page === 1 }"
    >
      1
    </button>
    <button v-show="statrEndNumber.start > 1">···</button>
    <template v-for="(num, index) in statrEndNumber.end" :key="index">
      <button
        v-if="num >= statrEndNumber.start"
        @click="goPage(num)"
        :class="{ active: num === page }"
      >
        {{ num }}
      </button>
    </template>
    <!-- 下 -->
    <button v-show="statrEndNumber.end < totalPage - 1">···</button>
    <button
      @click="goPage(totalPage)"
      :class="{ active: page === totalPage }"
      v-show="statrEndNumber.end != totalPage"
    >
      {{ totalPage }}
    </button>
    <button @click="goPage(page + 1)" :disabled="page === totalPage">
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "Pagination",
  props: {
    page: Number,
    pageSize: Number,
    total: Number,
    continues: Number,
  },
  setup(props, context) {
    const totalPage = computed(() => Math.ceil(props.total / props.pageSize));
    const statrEndNumber = computed(() => {
      let start = 1;
      let end = totalPage;
      if (props.continues > totalPage.value) {
        start = 1;
        end = totalPage.value;
      } else {
        start = props.page - parseInt(props.continues / 2);
        end = props.page + parseInt(props.continues / 2);
        if (start < 0) {
          start = 1;
          end = props.continues;
        }
        if (end >= totalPage.value) {
          end = totalPage.value - 1;
          start = totalPage.value - props.continues + 1;
        }
      }

      return { start, end };
    });
    function goPage(pageN) {
      context.emit("getPageNum", pageN);
    }
    return {
      totalPage,
      statrEndNumber,
      goPage,
    };
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
