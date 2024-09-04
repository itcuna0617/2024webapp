<template>
   <div class="container">
      <!-- a 태그와 form 태그를 사용하면 누르는 순간 새로고침을 해서 화면의 데이터가 날아감 -->
      <!-- 싱글 페이지 어플리케이션인 지금은 사용 안함 -->
      <!-- $event.target.value -> input에 입력되는 데이터 -->
      <!-- <input type="search" @input="inputText = $event.target.value" placeholder="검색어를 입력하세요" /> -->
      <!-- <input type="search" v-model="inputText" placeholder="검색어를 입력하세요" /> -->
      <!-- @change : 입력 후 검색 버튼 누르거나 enter 치면 사용되는 이벤트 (위에서는 입력하면 바로바로 적용됨) -->
      <!-- <input
         type="search"
         @change="
            $emit('searchMovie', $event.target.value);
            inputText = $event.target.value;
            $event.target.value = '';
         "
      /> -->
      <input type="search" @change="handleSearch" placeholder="검색어를 입력하세요" />
      <button>검색</button>
      <p>{{ inputText }}</p>
   </div>
</template>

<!-- 여기에서는 데이터 변경이 이루어지면 안되니까 가지고 있는 데이터 중에 해당되는 데이터가 있는지만 확인한 후 -->
<!-- 부모로 신호를 보내서 부모에서 실질적인 처리(검색)가 이루어지도록 함 -->

<script>
export default {
   name: 'searchComp',
   props: {
      data: Object,
   },
   data() {
      return {
         inputText: 'test',
      };
   },
   methods: {
      handleSearch(event) {
         this.$emit('searchMovie', event.target.value);
         this.inputText = event.target.value;
         event.target.value = '';
      },
   },
   watch: {
      inputText(name) {
         console.log('watch' + name);
         //  내부에 있는 데이터 가져올때 this 가져옴
         const findName = this.data.filter(movie => {
            // 데이터가 있는지 없는지만 판별하는 것 (true or false)
            return movie.title.includes(name);
         });

         console.log(findName.length);

         if (findName.length == 0) {
            alert('영화자료가 없습니다!!!');
         }
      },
   },
};
</script>

<style lang="scss" scoped></style>
