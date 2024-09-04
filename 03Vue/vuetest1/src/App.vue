<!-- vb 입력 후 tab -->
<template>
   <NavbarView :data="data" />
   <SearchBarView :data="data_temp" @searchMovie="searchMovie" />
   <div class="container">
      <button @click="showAllView">전체보기</button>
   </div>
   <ContainerView :data="data_temp" @increaseLike="increaseLike" @modalOpen="modalOpen" />
   <ModalView :data="data" :isModal="isModal" :num="selectedNum" @closeModal="closeM" />
   <!-- v-bind 생략 -->
   <!-- :이름="데이터" -> 이름 부분은 임의로 작성 가능 / 데이터 부분은 진짜 데이터 이름으로 작성 -->
   <!-- 이 데이터는 받는 곳에서 props로 받아야 함(받는 곳(자식)에서는 데이터 수정 불가) -->
   <!-- @자식에서 보내는 신호 이름 = 함수 이름 -> 함수는 밑에서 정의해줘야함 -->
</template>

<script>
import mdata from './assets/mdata';
import NavbarView from './components/NavbarView.vue';
import ModalView from './components/ModalView.vue';
import ContainerView from './components/ContainerView.vue';
import SearchBarView from './components/SearchBarView.vue';

// 보통 데이터는 부모 Component에 넣어줘야함
// 자식 Component에 각각 다 넣어두면 안됨
export default {
   name: 'appView',
   data() {
      return {
         data: mdata,
         isModal: false,
         //  title: 'test',
         selectedNum: 0,
         data_temp: [...mdata],
      };
   },
   methods: {
      increaseLike(i) {
         console.log(i);
         //  data() 에 있는 데이터 가져오고 싶으면 this 사용
         this.data[i].like += 1;
         //  this.title = 'no';
         //  alert(this.title);
      },
      modalOpen(num) {
         this.isModal = true;
         this.selectedNum = this.data.findIndex(item => item.id === num);
      },
      closeM() {
         this.isModal = false;
      },
      searchMovie(title) {
         console.log('영화이름 : ' + title);
         this.data_temp = this.data.filter(movie => {
            return movie.title.includes(title);
         });
      },
      showAllView() {
         this.data_temp = [...this.data];
      },
   },
   components: {
      NavbarView: NavbarView,
      ModalView: ModalView,
      ContainerView: ContainerView,
      SearchBarView: SearchBarView,
   },
};
</script>

<!-- scoped : 이 components 안에서만 스타일 시트 사용(중복되어도 문제되지 않음) -->
<style lang="scss">
$radius: 5px;

.container {
   width: 1000px;
   margin: 0 auto;
   //  media query(반응형)
   @media screen and (max-width: 790px) {
      width: 100%;
      padding: 0 16px;
   }
   img {
      display: block;
   }
}

.cardWrap {
   display: flex;
   //  감싸고 있는 부모의 크기에 맞춰 같은 비율로 맞춰서 들어감
   //  flex-wrap: nowrap;
   //  설정한 카드 크기에 맞춰서 들어감
   flex-wrap: wrap;
   gap: 10px;
   .card {
      // 4개 놓으면 10px짜리 gap 3개 발생 (이렇게 안하면 영역이 모자라서 한 줄에 3개만 나옴)
      width: calc((100% - 40px) / 5);
      @media screen and (max-width: 790px) {
         // 이때는 gap 1개 발생
         width: calc((100% - 10px) / 2);
      }
      @media screen and (max-width: 560px) {
         width: 100%;
      }

      .imgWrap {
         width: 100%;
         position: relative;
         overflow: hidden;
         cursor: pointer;
         border-radius: $radius;
         img {
            width: 100%;
            transition: 0.3s;
         }
         &:hover img {
            transform: scale(1.1);
         }
         .hot {
            position: absolute;
            top: 10px;
            left: 1px;
            background-color: skyblue;
            padding: 2px 10px;
            border-radius: $radius;
            font-weight: bold;
            color: white;
         }
      }
   }
}

.mb-10 {
   margin-bottom: 10px !important;
}

.btn {
   background: pink;
   border-radius: $radius;
   padding: 5px 16px;
   text-align: center;
   //  손가락 모양
   cursor: pointer;
   color: white;
   border: 0 none;
   display: block;
   width: 100%;

   &.btn-primary {
      background-color: skyblue;
   }
   &.btn-info {
      background-color: greenyellow;
   }
}
</style>
