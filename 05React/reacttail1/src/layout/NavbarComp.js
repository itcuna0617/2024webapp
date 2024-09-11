import React from "react";

function NavbarComp() {
  return (
    <div className="bg-sb-500 py-3">
      <nav className="container mx-auto flex justify-between px-4 md:px-0">
        <h1>
          {/* a 태그는 기본적으로 높이가 안잡혀있음 ->  block으로 바꿔준다. */}
          {/* h-full : 부모에 높이값이 있으면 height: 100% 적용 */}
          <a
            href="#"
            className="h-full text-3xl flex justify-center items-center"
          >
            NIKE
          </a>
        </h1>

        {/* display:none dispaly:flex(block으로 써도 무방) */}
        {/* 안보이다가 md 이상일때 보임 */}
        <div className="hidden md:flex">
          <ul className="flex">
            <li>
              {/* a 태그는 인라인 태그라서 py가 제대로 안먹을 수 있으니 block으로 변경해준다. */}
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:text-red-600 hover:bg-gray-100"
              >
                New
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:text-red-600 hover:bg-gray-100"
              >
                Men
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:text-red-600 hover:bg-gray-100"
              >
                Women
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:text-red-600 hover:bg-gray-100"
              >
                Kids
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:text-red-600 hover:bg-gray-100"
              >
                Sale
              </a>
            </li>
          </ul>
        </div>
        <div className="block md:hidden flex justify-center items-center">
          test
        </div>
      </nav>
    </div>
  );
}

export default NavbarComp;
