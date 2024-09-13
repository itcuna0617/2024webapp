import React from "react";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Counter from "./components/Counter.jsx";

function App() {
  return (
    // Provider는 영역만 잡은 것
    <Provider store={store}>
      <div>test</div>
      <Counter />
    </Provider>
  );
}

export default App;
