import React, { ReactNode, useEffect } from "react";
import Empty from "../../classes/Empty";
import Link from "../../classes/Link";
import NetworkFeature from "../../classes/NetworkFeature";
import GridElement from "../GridElement/GridElement";
import sytles from "./networkGrid.module.css";
type Props = {
  elements: NetworkFeature[][];
  setElements: Function;
  elementFactory: () => NetworkFeature;
};

function NetworkGrid({ elements, setElements, elementFactory }: Props) {
  const handleClickFactory = (position: Position) => () => {
    let newElements = [...elements];
    if (elements[position.x][position.y] instanceof Empty) {
      newElements[position.x][position.y] = elementFactory();
    } else {
      newElements[position.x][position.y] = new Empty();
    }

    setElements(newElements);
  };

  return (
    <div className={sytles.networkGrid + " " + sytles.unselectable}>
      {elements.map((rowItem, row) => {
        return elements[row].map((item, column) => {
          return (
            <GridElement
              networkFeature={item}
              handleClick={handleClickFactory({ x: row, y: column })}
            ></GridElement>
          );
        });
      })}
    </div>
  );
}

export default NetworkGrid;
