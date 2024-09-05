import axios from "axios";
import { createStore } from "vuex";
// import { createStore } from "vuex/types/index.js";

// createstore 입력 후 tab
export default createStore({
  state: {
    // state에 데이터 넣을 때는 주로 initial data 사용
    // initial data(초기 데이터)
    name: "홍길동",
    counter: 0,
    weatherData: {
      icon: "icon",
      temp: 0,
      text: "text",
      location: "location",
      city: "Seoul",
    },
  },
  mutations: {
    // 변형 // commit
    // 첫번째는 state를 넣어줘야하고 payload 부분은 이름 바꿔도 됨
    addCount(state, payload) {
      state.counter++;
    },
    updateData(state, payload) {
      state.weatherData.icon = payload.weather[0].icon;
      state.weatherData.temp = payload.main.temp;
      state.weatherData.text = payload.weather[0].description;
      state.weatherData.location = payload.sys.country;
      state.weatherData.city = payload.name;
    },
    onSearchCity(state, payload) {
      state.weatherData.city = payload;
    },
  },
  actions: {
    // 비동기
    // 항상 첫번째 인자는 context로 넣어줘야 함
    async getWeather(context) {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${context.state.weatherData.city}&appid=4eedfeb184dc7cb08af6c0bd529c48b9`
      );
      console.log(res.data);
      //   commit은 Mutation을 부르는 것
      context.commit("updateData", res.data);
    },
  },
});
