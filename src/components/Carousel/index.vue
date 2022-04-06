<template>
  <div class="swiper-container" ref="carouselRef">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="index">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from "vue";
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  setup(props, context) {
    const carouselRef = ref(null);
    watch(
      props,
      async () => {
        await nextTick();
        new Swiper(carouselRef.value, {
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: true,
        });
      },
      { immediate: true, deep: true }
    );
    return {
      carouselRef,
    };
  },
};
</script>

<style>
</style>