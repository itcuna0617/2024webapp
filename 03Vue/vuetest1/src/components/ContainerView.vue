<template>
   <div class="container">
      <h2 class="mb-10">HOT & NEW</h2>
      <div class="cardWrap">
         <div class="card" v-for="(item, i) in data" v-bind:key="i">
            <div class="imgWrap">
               <img v-bind:src="`./images/${item.img}`" :alt="`${item.img}`" />
               <div class="hot" v-if="item.hoticon">HOT</div>
            </div>
            <div class="cardBody">
               <h4>{{ item.title }}</h4>
               <p>❤️ {{ item.num }}</p>
               <p>대여 {{ item.won }}</p>
               <!-- v-on:click 을 @:click 으로 대체 가능 (v-on -> @) -->
               <!-- $emit(신호이름, 파라미터1, 파라미터2, ...) 이런식으로 넘기고 -->
               <!-- 부모에서는 @신호이름="실행할 함수이름" 으로 수신한 후에 함수 안에서 넘어온 변수 사용 가능 -->
               <!-- script에서 실행할 함수이름(파라미터1 받을 변수, 파라미터2 받을 변수, ...) 이렇게 받아서 사용 -->
               <p>👍 {{ item.like }}<button @:click="$emit('increaseLike', item.id)">클릭</button></p>
            </div>
            <div class="btn btn-primary" v-on:click="$emit('modalOpen', item.id)">상세보기</div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'ContainerView',
   props: {
      data: Array,
   },
};
</script>

<style lang="scss" scoped></style>
