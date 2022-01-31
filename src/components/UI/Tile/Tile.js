import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Tile.module.css";

const handleClick = (item, onClick) => {
  onClick(item);
};

const Cube = ({ item, onClick }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    switch (item?.status) {
      case "open":
        setContent(<Open color={item.color}/>);
        break;
      case "closed":
        setContent(<Closed />);
        break;
      case "matched":
        setContent(<Matched />);
        break;
      default:
        setContent(<Hidden item={item} onClick={onClick} />);
    }
  }, [item, item.status, onClick]);

  return <div className={clsx(styles.default,"col-2")}>{content}</div>;
};

export default Cube;

export const Hidden = ({ item, onClick }) => {
  return (
    <div
      className={styles.hidden}
      onClick={(event) => {
        event.preventDefault();
        handleClick(item, onClick);
      }}
    ></div>
  );
};

export const Matched = () => {
  return <Fragment/>;
};

export const Closed = () => {
  return <div className={styles.closed}><span>Closed</span></div>;
};

export const Open = ({ color }) => {
  return <span className={styles.open} style={{ backgroundColor: color }}></span>;
};
