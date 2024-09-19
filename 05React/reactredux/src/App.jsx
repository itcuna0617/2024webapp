import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

// 원래는 이렇게 쓰지 않음
const initalData = {
  cart: [],
};

// react의 useReducer와 비슷한 구조로 작성한 것
// reducer의 목적 : 이 안에 script를 작성해둬서 관리하기 편하게 하기 위해서(데이터가 어디서 변경되는지 등)
// 보통은 state에는 로그인과 관련된 데이터가 들어감 (카트 같은 데이터는 db와 관련됨)
// action은 type을 보기 위한 것
const reducer = (state = initalData, action) => {
  console.log(action);

  switch (action.type) {
    case "add_cart":
      // ...state : state 값 전체, 그 중에서 cart 값을 변경한다는 의미
      return { ...state, cart: [...state.cart, action.payload] };
    case "remove_cart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }

  // return state;
};

const store = createStore(reducer);

function App() {
  return (
    // react-redux에 있는 component
    <Provider store={store}>
      <div>shop</div>
      <hr />
      <ProductList />
      <hr />
      <Cart />
    </Provider>
  );
}

const products = [
  { id: 1, name: "product1" },
  { id: 2, name: "product2" },
  { id: 3, name: "product3" },
  { id: 4, name: "product4" },
];

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  const addCart = (item) => {
    dispatch({ type: "add_cart", payload: item });
  };

  return (
    <>
      <div>product / cart({cartItems.length})</div>
      {products.map((item, i) => {
        return (
          <div key={i}>
            {item.id} / {item.name}
            <button onClick={() => addCart(item)}>장바구니 추가</button>
          </div>
        );
      })}
    </>
  );
}

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log("cart 개수 : " + cartItems.length);

  const removeCart = (item) => {
    dispatch({ type: "remove_cart", payload: item });
  };

  return (
    <>
      <div>cart</div>
      {cartItems.map((item, i) => {
        return (
          <div key={i}>
            {item.id} / {item.name}
            <button onClick={() => removeCart(item.id)}>장바구니제거</button>
          </div>
        );
      })}
    </>
  );
}

export default App;
