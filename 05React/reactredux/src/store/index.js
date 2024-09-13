import { createStore } from "redux";
import reducer from "../redux/reducer";

// reducer를 넣는다는 것은 결국 state값을 넣는다는 것과 비슷
const store = createStore(reducer);

export default store;
