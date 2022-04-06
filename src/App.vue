<template>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.show"></Footer>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import "./mock/mockServe";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("CategoryList");
    });
  },
};
</script>

<style>
</style>
