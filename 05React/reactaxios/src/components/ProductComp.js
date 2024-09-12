import React from "react";
import { useParams } from "react-router-dom";

function ProductComp() {
  const params = useParams();
  const { num } = useParams();
  return (
    <div>
      ProductComp
      <h3>{params.num}</h3>
      <h3>{num}</h3>
    </div>
  );
}

export default ProductComp;
