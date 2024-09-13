import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const listCnt = 9;
  const pagerCnt = 5;
  const [data, setData] = useState([]);
  const [totalpage, setTotalpage] = useState(1);
  const [currentpage, setCurrentpage] = useState(1);

  // async, await 사용시 -> 성공시에는 promise의 데이터만 가져옴
  // try-catch 사용해야함
  const api = () => {
    // 데이터를 그냥 axios로 해당 링크에서 가져온 것
    // https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10
    // Network -> Headers -> X-Total-Count가 백에서 넘어오는 실제 총 데이터 갯수
    // 위에처럼 작성되면 실제로 10개만 넘어온 것처럼 보이지만 실제 데이터 총 갯수가 필요
    // 이 속성값은 res.headers["x-total-count"]

    // notion에 pagenation에 대해 추가적으로 코드 수정해서 올려주셨는데 비교해서 보자
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res.data);
      setData(res.data);
      console.log("totaldata : " + res.data.length);
      console.log("totalpage : " + Math.ceil(res.data.length / listCnt));

      setTotalpage(Math.ceil(res.data.length / listCnt));
    });
  };

  useEffect(() => {
    api();
  }, []);

  const pageViewNumber = () => {
    const pageNumbers = [];
    // const startPage = Math.floor(((currentpage - 1) / pagerCnt) * pagerCnt + 1);
    const startPage = Math.floor(currentpage / pagerCnt) * pagerCnt + 1;
    // const endPage = startPage + pagerCnt - 1;
    const endPage = Math.min(startPage + pagerCnt - 1, totalpage);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          onClick={() => {
            setCurrentpage(i);
          }}
          style={{
            cursor: "pointer",
            margin: "0 5px",
            color: currentpage === i ? "red" : "black",
          }}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  const currentPageData = () => {
    const startIndex = (currentpage - 1) * listCnt;
    const endIndex = startIndex + listCnt;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div>totalPage:{totalpage}</div>
      {currentPageData().map((item, i) => {
        return (
          <div key={i}>
            {item.id}. {item.title}
          </div>
        );
      })}

      <div style={{ fontSize: "2em" }}>{pageViewNumber()}</div>
      <div>
        {/* {currentpage > 1 && (
          <button
            onClick={() => {
              setCurrentpage(currentpage - 1);
            }}
          >
            이전
          </button>
        )} */}
        {(Math.floor(currentpage / pagerCnt) - 1) * pagerCnt + 1 > 0 && (
          <button
            onClick={() => {
              setCurrentpage(
                (Math.floor(currentpage / pagerCnt) - 1) * pagerCnt + 1
              );
            }}
          >
            이전
          </button>
        )}

        {/* {currentpage < totalpage && (
          <button
            onClick={() => {
              setCurrentpage(currentpage + 1);
            }}
          >
            다음
          </button>
        )} */}
        {Math.ceil(currentpage / pagerCnt) * pagerCnt + 1 < totalpage && (
          <button
            onClick={() => {
              setCurrentpage(Math.ceil(currentpage / pagerCnt) * pagerCnt + 1);
            }}
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
