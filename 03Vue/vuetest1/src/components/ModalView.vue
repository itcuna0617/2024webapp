<template>
   <div class="modal" v-if="isModal">
      <div class="inner">
         <h2 class="mb-10">{{ data[num].title }}</h2>
         <hr class="mb-10" />
         <p class="mb-10">{{ data[num].detail }}</p>
         <!-- $emit(신호) 자식에서는 수정이 불가능하니까 신호만 보내는 것 -->
         <button class="btn btn-primary" v-on:click="$emit('closeModal')">닫기</button>
      </div>
   </div>
</template>

<script>
export default {
   name: 'modalView',
   //    props 로 받은 데이터는 수정 불가(자식에서는 불가)
   props: {
      data: Array,
      isModal: Boolean,
      num: Number,
   },
};
</script>

<style lang="scss" scoped>
.modal {
   position: fixed;
   //  투명도를 배경에만 적용하고 싶으면 background-color에 rgba를 사용해야 함
   background-color: rgba(150, 0, 0, 0.5);
   //  opacity : 투명도값으로 0 ~ 1 사이의 값을 가짐
   //  opacity는 자식 요소에게까지 적용됨
   //  opacity: 0.3;
   //  width: 100%;
   //  height: 100%;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 99999;
   .inner {
      background: #fff;
      width: 500px;
      // padding은 보통 이렇게 잡는 것이 좋다
      padding: 16px 16px;
      border-radius: 5px;

      @media screen and (max-width: 570px) {
         width: 90%;
      }
   }
}
</style>
