import React, { ReactNode, useEffect } from "react";
import Empty from "../../classes/Empty";
import Link from "../../classes/Link";
import NetworkFeature from "../../classes/NetworkFeature";
import GridElement from "../GridElement/GridElement";
import sytles from "./networkGrid.module.css";
type Props = {
  elements: NetworkFeature[];
  setElements: Function;
};

function NetworkGrid({ elements, setElements }: Props) {
  const handleClickFactory = (index: number, element: NetworkFeature) => () => {
    let newElements = [...elements];
    if (elements[index] instanceof Empty) {
      newElements[index] = element;
    } else {
      newElements[index] = new Empty();
    }
    setElements(newElements);
  };

  return (
    <div className={sytles.networkGrid + " " + sytles.unselectable}>
      {elements.map((item, index) => {
        return (
          <GridElement
            networkFeature={item}
            handleClick={handleClickFactory(index, new Link(1))}
          ></GridElement>
        );
      })}
    </div>
  );
}

export default NetworkGrid;
