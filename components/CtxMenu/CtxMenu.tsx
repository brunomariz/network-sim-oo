import React from "react";
import { TransmissionStatus } from "../../@types/transmissionStatus";
import NetworkFeature from "../../classes/NetworkFeature";

type Props = {
  ctxAnchorPoint: Position;
  networkFeature: NetworkFeature;
  setShowCtxMenu: Function;
};

function CtxMenu({ ctxAnchorPoint, networkFeature, setShowCtxMenu }: Props) {
  return (
    <div
      style={{ top: ctxAnchorPoint.y, left: ctxAnchorPoint.x }}
      className="absolute bg-white shadow-md p-2"
    >
      <div className="font-mono">
        Transmission status:{" "}
        {TransmissionStatus[networkFeature.transmissionStatus]}
      </div>

      <button
        className="text-sm bg-slate-300 p-1 underline-offset-2 border-2 border-gray-900 border-opacity-0 hover:border-opacity-75"
        onClick={() => {
          if (
            networkFeature.transmissionStatus == TransmissionStatus.transmitting
          ) {
            networkFeature.transmissionStatus =
              TransmissionStatus.notTransmitting;
          } else {
            networkFeature.transmissionStatus = TransmissionStatus.transmitting;
          }
          setShowCtxMenu(false);
        }}
      >
        Set Transmission{" "}
        {networkFeature.transmissionStatus == TransmissionStatus.transmitting
          ? "Off"
          : "On"}
      </button>
    </div>
  );
}

export default CtxMenu;
