import React, { useEffect, useState } from "react";
import NetworkFeature from "../../classes/NetworkFeature";
import styles from "./gridElement.module.css";
type Props = { networkFeature: NetworkFeature; handleClick: () => void };

function GridElement({ networkFeature, handleClick }: Props) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onMouseEnter={(e) => {
        if (e.buttons == 1 || e.buttons == 3) {
          e.stopPropagation();

          handleClick();
          setClicked(!clicked);
        }
      }}
      onMouseDown={() => {
        handleClick();
        setClicked(!clicked);
      }}
      className={styles.baseContainerElement}
    >
      <div
        className={styles.baseInnerElement + ` ${clicked && styles.animate}`}
        style={{ backgroundColor: networkFeature.color }}
      ></div>
    </div>
  );
}

export default GridElement;
