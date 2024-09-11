import React from "react";

function NavPractice() {
  return (
    <div>
      <nav className="container bg-sb-500 mx-auto flex justify-between">
        <h1 className="flex">
          <a
            href="#"
            className="h-full text-3xl flex justify-center items-center"
          >
            LOGO
          </a>
        </h1>
        <div className="hidden md:block">
          <ul className="flex">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-red-400"
              >
                New
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-red-400"
              >
                Men
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-red-400"
              >
                Women
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-red-400"
              >
                Kids
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-red-400"
              >
                Sale
              </a>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center md:hidden hover:bg-gray-100 hover:text-red-400">
          test
        </div>
      </nav>
    </div>
  );
}

export default NavPractice;
