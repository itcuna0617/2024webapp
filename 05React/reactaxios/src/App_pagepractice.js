import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const listCnt = 7;
  const pagerCnt = 5;
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const api = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res.data);
      setData(res.data);
      setTotalPage(Math.ceil(res.data.length / listCnt));
    });
  };

  useEffect(() => {
    api();
  }, []);

  const pageViewNumber = () => {
    const pageNumbers = [];
    const startPage = Math.floor(currentPage / pagerCnt) * pagerCnt + 1;
    const endPage = Math.min(startPage + pagerCnt - 1, totalPage);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          onClick={() => {
            setCurrentPage(i);
          }}
          style={{
            cursor: "pointer",
            margin: "0 5px",
            color: currentPage === i ? "red" : "black",
          }}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  const currentPageData = () => {
    const startIndex = (currentPage - 1) * listCnt;
    const endIndex = startIndex + listCnt;
    return data.slice(startIndex, endIndex);
  };

  return (
    <>
      <div>
        <div>totalPage : {totalPage}</div>
        <div>
          {currentPageData().map((item, i) => {
            return (
              <div key={i}>
                {item.id} / {item.title}
              </div>
            );
          })}
        </div>

        <div>
          {currentPage > pagerCnt && (
            <button
              onClick={() => {
                setCurrentPage(
                  (Math.floor(currentPage / pagerCnt) - 1) * pagerCnt + 1
                );
              }}
            >
              이전
            </button>
          )}
          {pageViewNumber()}
          {Math.ceil(currentPage / pagerCnt) * pagerCnt + 1 < totalPage && (
            <button
              onClick={() => {
                setCurrentPage(
                  Math.ceil(currentPage / pagerCnt) * pagerCnt + 1
                );
              }}
            >
              다음
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
