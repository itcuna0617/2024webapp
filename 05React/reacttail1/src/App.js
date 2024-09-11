import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // 버튼 클릭하면 data로 데이터가 들어올게 할 것
  const [data, setData] = useState([]);
  const [num, setNum] = useState(2);

  const onClick = (num) => {
    // get으로 데이터 받아오면 then 안의 함수 실행(받아온 데이터 res)
    // url 뒤에 ?_page=2&_limit=10 을 추가하면 한 페이지에 10개씩 표기되도록 되고 여기서 2번째 페이지(11~20)에 해당하는 데이터만 화면에 표기됨
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      // res.data로 사용
      console.log(res.data);
      setData(res.data);
    });
  };

  // 버튼을 누르지 않아도 자동으로 가져와있음
  // num을 바라보고 있다가 num에 변화가 생기면 axios를 통해 데이터를 새로 땡겨옴
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [num]);

  return (
    <div>
      <button onClick={onClick}>클릭</button>
      {/* 그냥 {data} 쓰면 에러 발생 */}
      {/* {data && ~} data가 있으면 ~를 실행해라  */}
      {/* && 대신 ? 으로도 사용 가능 */}
      {data &&
        data.map((item, i) => {
          return (
            <div key={i}>
              {item.id} / {item.title}
            </div>
          );
        })}
    </div>
  );
}

export default App;
