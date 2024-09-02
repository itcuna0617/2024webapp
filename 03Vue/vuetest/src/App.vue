<template>
   <div class="container secWrap">
      <h3>HOT & NEW</h3>
      <div class="cardWrap">
         <!-- 데이터가 부모에게 있어야 자식이 그걸 받아서 사용 가능(반대로는 불가능) -->
         <div class="card" v-for="(item, i) in data" v-bind:key="i">
            <!-- 변수를 속성에 넣을때는 v-bind가 필요함 + 백틱 (`)으로 감싸줌 -->
            <!-- v-bind:src -> :src로 표기 가능(지금은 연습) -->
            <!-- images 폴더의 경로를 assets가 아닌 public에 넣으니까 됨(assets에서는 왜 안되는건지 확인해야함) -->
            <div class="imgWrap">
               <img v-bind:src="`./images/${item.img}`" alt="" />
            </div>
            <div class="cardText">
               <h3>{{ item.title }}</h3>
               <p>❤️ {{ item.num }}</p>
               <p>대여 : {{ item.won }}</p>
            </div>
         </div>
      </div>
   </div>
   <!-- {{ todos[0] }}
      <ul>
         <li v-for="(item, index) in todos" v-bind:key="index">
            {{ item }}
         </li>
      </ul>
      <div v-for="(item, index) in todos" v-bind:key="index">{{ item }}</div> -->
</template>

<script>
export default {
   // name은 보통 가지고 있는 파일 이름(여기서는 App.vue 이므로 App)
   name: 'App',
   data() {
      return {
         todos: ['서울', '부산', '대구'],
         data: [
            { title: '핸섬가이즈', num: '8.6', won: '11,000', img: 'handsome.jpg' },
            { title: '탈주', num: '8.1', won: '11,000', img: 'escape.jpg' },
            { title: '하이재킹', num: '8.7', won: '10,900', img: 'hijacking.jpg' },
         ],
      };
   },
};
</script>

<style lang="scss" scoped>
// . 대신 @를 쓰면 src 폴더를 의미한다고 보면됨
@import './assets/css/style.scss';
.secWrap {
   padding: 5px 16px;
}

.cardWrap {
   display: flex;
   gap: 10px;
   .card {
      width: 212px;

      .imgWrap {
         width: 100%;
         overflow: hidden;
         border-radius: 5px;
         img {
            display: block;
            width: 100%;
            transition: 0.3s;
         }
         &:hover img {
            transform: scale(1.05);
         }
      }
      .cardText {
         padding: 5px;
      }
   }
}
</style>
