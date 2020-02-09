import React from "react";

export default function Result(props) {
  console.log(props.data);
  return (
    <div>
      {/* <h1>{props.code}</h1> */}
      <h1>{props.data.product_name}</h1>
    </div>
  );
}
