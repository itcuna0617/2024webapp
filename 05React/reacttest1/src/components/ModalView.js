import React from "react";

// 이렇게 만들고 App.js 에서 import 해서 사용
// props가 아니라 {}로 받으면 Object 별로 하나씩 받는다.
function ModalView({ vContent, onClose }) {
  return (
    <div style={{ background: "skyblue" }}>
      ModalView
      <p>{vContent}</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default ModalView;
