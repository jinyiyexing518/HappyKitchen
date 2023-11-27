import React from 'react';
import './Title.css';

const Title = ({ text }) => {
  return (
    <div className="title-container">
      <h1 className="title-text">{text}</h1>
    </div>
  );
};

export default Title;
