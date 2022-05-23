import React from "react";
import { TransmissionStatus } from "../../@types/transmissionStatus";
import NetworkFeature from "../../classes/NetworkFeature";
import TwistedPair from "../../classes/TwistedPair";

type Props = {
  ctxAnchorPoint: Position;
  networkFeature: NetworkFeature;
  setShowCtxMenu: Function;
};

function CtxMenu({ ctxAnchorPoint, networkFeature, setShowCtxMenu }: Props) {
  return (
    <div
      style={{ top: ctxAnchorPoint.y - 2, left: ctxAnchorPoint.x - 2 }}
      className="absolute bg-white shadow-md p-2 z-10"
    >
      <h1 className="mb-2 font-semibold border-b-2 border-b-black">
        {networkFeature.featureName}
      </h1>
      <div className="font-mono">
        Signal: {networkFeature.signal.value} V
        {networkFeature.signal.corrupted && (
          <div className="text-red-500">corrupted</div>
        )}
      </div>
      {networkFeature instanceof TwistedPair && (
        <div className="font-mono">
          <ul>
            <li>
              BER (per element): {networkFeature.errorRate.toExponential()}
            </li>
            <li>
              BER (per 100 m): {TwistedPair.berPerMaxLength.toExponential()}
            </li>
          </ul>
        </div>
      )}

      <button
        className="text-sm bg-slate-300 p-1 underline-offset-2 border-2 border-gray-900 border-opacity-0 hover:border-opacity-75"
        onClick={() => {
          if (
            networkFeature.transmissionStatus == TransmissionStatus.transmitting
          ) {
            networkFeature.transmissionStatus =
              TransmissionStatus.notTransmitting;
          } else {
            networkFeature.setTransmitting(2.5);
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
