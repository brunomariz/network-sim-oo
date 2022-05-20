import React, { useEffect, useState } from "react";
import { TransmissionStatus } from "../../@types/transmissionStatus";
import NetworkFeature from "../../classes/NetworkFeature";
import Node from "../../classes/Node";
import CtxMenu from "../CtxMenu/CtxMenu";
import styles from "./gridElement.module.css";

type Props = { networkFeature: NetworkFeature; handleClick: () => void };

function GridElement({ networkFeature, handleClick }: Props) {
  const [clicked, setClicked] = useState(false);
  const [ctxAnchorPoint, setCtxAnchorPoint] = useState({ x: 0, y: 0 });
  const [showCtxMenu, setShowCtxMenu] = useState(false);
  const [clickable, setClickable] = useState(true);

  const handleContextMenu = () => {
    setShowCtxMenu(!showCtxMenu);
    setClickable(false);
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setCtxAnchorPoint({ x: e.pageX, y: e.pageY });
        handleContextMenu();
      }}
      onMouseEnter={(e) => {
        if (clickable) {
          if (e.buttons == 1 || e.buttons == 3) {
            e.stopPropagation();

            handleClick();
            setClicked(!clicked);
          }
        }
      }}
      onMouseLeave={(e) => {
        setShowCtxMenu(false);
        setClickable(true);
      }}
      onMouseDown={(e) => {
        if (clickable) {
          if (e.buttons == 1 || e.buttons == 3) {
            handleClick();
            setClicked(!clicked);
            setShowCtxMenu(false);
          }
        }
      }}
      className={styles.baseContainerElement}
    >
      <>
        <div
          className={
            styles.baseInnerElement +
            ` ${clicked && styles.animate} ${
              networkFeature instanceof Node && styles.nodeElement
            }`
          }
          style={{ backgroundColor: networkFeature.color }}
        ></div>
        {showCtxMenu && (
          <CtxMenu
            ctxAnchorPoint={ctxAnchorPoint}
            networkFeature={networkFeature}
            setShowCtxMenu={setShowCtxMenu}
          ></CtxMenu>
        )}
      </>
    </div>
  );
}

export default GridElement;
