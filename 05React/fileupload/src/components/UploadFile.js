import React, { useState } from "react";
import { postFile } from "../api/apiFile";
import { toast } from "react-toastify";

function UploadFile({ handleImageUpload }) {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("이미지를 업로드 해주세요.");

  const imgSelectHandler = (e) => {
    const imageFiles = e.target.files;
    console.log(imageFiles);

    if (imageFiles.length > 0) {
      setFiles(imageFiles);
      setFileName(imageFiles[0].name);
    } else {
      setFiles(null);
      setFileName("이미지를 업로드 해주세요.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // formData.append("images", file) -> BackEnd에서 key값을 images라고 해뒀기 때문
    for (let file of files) formData.append("images", file);

    try {
      const res = await postFile(formData);
      console.log(res);
      handleImageUpload();
      toast.success("이미지 업로드 성공!");
    } catch (error) {
      toast.error("이미지 업로드 실패!");
    }
  };

  return (
    <>
      <div>
        {/* form 문서에서 onSubmit이 동작하면 새로고침이 실행된다. -> 이에 해당하는 기본 기능을 막아주어야 한다.(위에 구현해둠) */}
        <form onSubmit={onSubmit}>
          <div>
            {fileName}
            <input
              type="file"
              name="iamge"
              id="inp"
              multiple
              onChange={imgSelectHandler}
            />
          </div>
          <button type="submit">파일전송</button>
        </form>
      </div>
    </>
  );
}

export default UploadFile;
