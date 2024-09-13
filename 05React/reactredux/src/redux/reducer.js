// init -> initialData
const init = {
  value: 100,
  title: "test",
};

// reducer 는 useReducer와 같은 역할로 사용할 것(state를 변경시키는 중간 단계)
// 원래는 state 뒤에 ,action이 옴 (useReducer)
const reducer = (state = init, action) => {
  console.log(state);
  console.log(action.type);
  // 이 부분은 보통 switch 구문 사용
  if (action.type == "up") {
    return { ...state, value: state.value + action.payload };
  }
  if (action.type == "down") {
    return { ...state, value: state.value - action.payload };
  }
  return state;
};

export default reducer;
