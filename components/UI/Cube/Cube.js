import React, { Fragment, useState, useEffect } from "react";

const handleClick = (item, onClick) => {
  onClick(item);
};

const Cube = ({ item, onClick }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    switch (item.status) {
      case "open":
        setContent(<Open />);
        break;
      case "closed":
        setContent(<Closed />);
        break;
      case "matched":
        setContent(<Matched color={item.color} />);
        break;
      default:
        setContent(<Hidden item={item} onClick={onClick} />);
    }
  }, [item, item.status, onClick]);

  return <Fragment>{content}</Fragment>;
};

export default Cube;

export const Hidden = ({ item, onClick }) => {
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        handleClick(item, onClick);
      }}
    ></div>
  );
};

export const Open = () => {
  return <span></span>;
};

export const Closed = () => {
  return <span>Closed</span>;
};

export const Matched = ({ color }) => {
  return <span style={{ backgroundColor: color }}></span>;
};
