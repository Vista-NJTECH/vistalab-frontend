"use client";

import React from 'react';
import styled from './lab.module.css';

const Card = (props) => {
  return (
    <div className={styled.card}>
      {props.children}
    </div>
  );
};

export default Card;
