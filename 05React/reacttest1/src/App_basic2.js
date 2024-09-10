import React, { useState } from "react";

function App() {
  const [pro, setPro] = useState(["사과", "바나나", "참외"]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(0);
  const [input, setInput] = useState("");

  return (
    <>
      <div>App {title}</div>
      {pro.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              // setModal(!modal);
              setModal(true);
              setTitle(i);
            }}
          >
            {item}
          </div>
        );
      })}
      {/* 이것도 event 이므로 event 인데 줄여서 e 으로 씀 */}
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />
      <button
        onClick={() => {
          // ... 하면 대괄호 사라지므로 다시 씌워준다.
          // let copy = [...pro, input];
          let copy = [input, ...pro];
          // copy.unshift(input);
          setPro(copy);
          setInput("");
        }}
      >
        과일넣기
      </button>
      <p>{input}</p>
      {modal == true ? <Modal pro={pro} title={title} /> : null}
    </>
  );
}

function Modal(props) {
  return (
    <>
      <div className="modalWrap">
        <div className="modal">
          <h3>{props.pro[props.title]}</h3>
          <p>상세설명</p>
        </div>
      </div>
    </>
  );
}

export default App;
