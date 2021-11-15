import React from "react";
import Card from "../components/styles/Card.style";

function CardStyled({item: { id, title, body, image }}) {
  return (
    <Card layout={id % 2 === 0 && "row-reverse"}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>

      <div>
        <img src={`./img/${image}`} alt="" />
      </div>
    </Card>
  );
}
export default CardStyled;
