import React, { useEffect, useState } from "react";

function App() {
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);
  // destruction 문법
  // const han = 함수(return 값이 {id:1, content: c})
  // han.id, han.content 이런식으로 사용
  // const {id, content} = 함수(return 값이 {id:1, content: c})
  // 이러면 그냥 id, content 이런식으로 사용 가능

  // useEffect() -> 값이나 이벤트가 변경되면 동작함
  // [] -> 마운트될 때 한 번만실행
  // [num] -> 계속 실행됨(num이 변경될 때마다)
  // useEffect(() => {
  //   console.log("ok");
  // }, []);

  // num을 계속 주시하고 있다가 num에 변화가 생기면 실행
  // useEffect(() => {
  //   console.log("ok");
  // }, [num]);

  // num, count를 둘 다 주시하고 있다 num이나 count에 변화가 생기면 실행
  useEffect(() => {
    console.log("ok");
  }, [num, count]);

  return (
    <div>
      {num} / {count} <br />
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        클릭1
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        클릭2
      </button>
    </div>
  );
}

export default App;
