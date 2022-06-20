import React from "react";
import { networkFeatureCategories } from "../../@types/networkFeatureCategories";
import { TransmissionStatus } from "../../@types/transmissionStatus";
import Empty from "../../classes/Empty";
import Node from "../../classes/Node";
import { Signal } from "../../classes/Signal";
import TwistedPair from "../../classes/TwistedPair";
import { setElements } from "../../redux/features/grid/gridSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import GridElement from "../GridElement/GridElement";
import sytles from "./networkGrid.module.css";
type Props = {
  // elements: NetworkFeature[][];
  // setElements: Function;
};

function NetworkGrid({}: // elements, setElements
Props) {
  const cursorElement = useAppSelector((state) => state.grid.cursorElement);
  // const elements = useAppSelector(state=> state.grid.network.elements)
  const network = useAppSelector((state) => state.grid.network);
  const dispatch = useAppDispatch();

  const elementFactory = () => {
    switch (cursorElement) {
      case networkFeatureCategories.Empty:
        return new Empty();
      case networkFeatureCategories.TwistedPair:
        return new TwistedPair(
          TransmissionStatus.notTransmitting,
          new Signal(0, false)
        );
      case networkFeatureCategories.Node:
        return new Node();

      default:
        return new Empty();
    }
  };

  const handleClickFactory = (position: Position) => () => {
    let newElements = [...network.elements];
    if (network.elements[position.x][position.y] instanceof Empty) {
      newElements[position.x][position.y] = elementFactory();
    } else {
      newElements[position.x][position.y] = new Empty();
    }

    // setElements(newElements);
    dispatch(setElements(newElements));
  };

  return (
    <div
      className={sytles.networkGrid + " " + sytles.unselectable}
      style={{
        gridTemplateColumns: `repeat(${network.elements[0].length}, auto) `,
        width: `${1.75 * network.elements[0].length}rem`,
      }}
    >
      {network.elements.map((rowItem, row) => {
        return network.elements[row].map((item, column) => {
          return (
            <GridElement
              key={`${row}${column}`}
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
