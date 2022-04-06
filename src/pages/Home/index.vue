<template>
  <div class="outer">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :data="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue";
import TodayRecommend from "./TodayRecommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
export default {
  provide: {
    show: true,
  },
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  setup() {
    const store = useStore();
    const floorList = computed(() => {
      return store.state.home.floorList;
    });
    onMounted(() => {
      store.dispatch("getFloorList");
    });
    return {
      floorList,
    };
  },
};
</script>

<style >
</style>