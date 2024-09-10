// rfce tab
import React, { useState } from "react";
import "./index.css";
import logo from "./logo.svg";

function App() {
  let text = "hello";
  // setBox를 통해 box 값에 변화 적용
  // useState로 box의 초기값 설정
  const [box, setBox] = useState("han");
  const [num, setNum] = useState("0");
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState("안녕하세요.");
  let [shop, setShop] = useState(["사과", "복숭아", "바나나"]);

  return (
    // return 안 쪽에서 가장 바깥쪽 div가 2개 이상이면 안된다. -> 하나로만 사용
    // <div>test</div><div>test2</div>
    // 가장 바깥쪽에는 <div> 대신 프래그먼트(<> </>) 사용
    // 폰트사이즈는 문자열 형태로 넣어준다.
    <>
      <div
        className="container"
        style={{ background: "orange", fontSize: "20px" }}
      >
        test
        <h2>{text}</h2>
        <p>{box}</p>
        {num}
      </div>
      <header>ddd</header>
      {/* <img src={logo} /> */}
      <button
        onClick={() => {
          // alert("test");
          setBox("changeHan");
        }}
      >
        값변화
      </button>

      <button
        onClick={() => {
          setNum(10);
        }}
      >
        num
      </button>

      <button
        onClick={() => {
          setModal(!modal);
        }}
      >
        모달
      </button>
      {shop.map((item, i) => {
        return (
          <>
            <div key={i}>{item}</div>
          </>
        );
      })}

      {/* 보여줄지 안보여줄지는 조건절을 삼항연산자 사용 */}
      {/* Modal에 title 이라는 데이터를 전달하겠다 */}
      {modal == true ? <Modal title={title} image="test1" /> : null}
    </>
  );
}

// 원래 다른 파일로 작성된 거라면 import로 가져와서 사용이 가능한데 같은데 작성했으므로
// props를 통해 데이터 받음
// 옮겨받는 데이터는 부모에서 수정되어야 함(vue에서와 비슷)
function Modal(props) {
  return (
    <>
      <div className="modal">
        <h3>공지사항 {props.title}</h3>
        <p>상세내용 {props.image}</p>
      </div>
    </>
  );
}

export default App;
