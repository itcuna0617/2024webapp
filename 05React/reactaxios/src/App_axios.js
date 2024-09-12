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
