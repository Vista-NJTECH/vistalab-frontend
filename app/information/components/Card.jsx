"use client";

import style from "./Card.module.css";

const Card = (props) => {
  return <div className={style.card}>{props.children}</div>;
};

export default Card;
