import React from "react";
import { FiPause, FiPlay, FiRefreshCw } from "react-icons/fi";
import { BsCircle, BsCircleFill, BsSquareFill } from "react-icons/bs";
import { networkFeatureCategories } from "../../@types/networkFeatureCategories";
import Network from "../../classes/Network";
import NavButton from "../NavButton/NavButton";

type Props = {
  setRun: Function;
  setNetwork: Function;
  setElements: Function;
  setActiveElement: Function;
  run: boolean;
  networkSize: number[];
  network: Network;
};

function Navbar({
  setRun,
  setNetwork,
  setElements,
  setActiveElement,
  run,
  networkSize,
  network,
}: Props) {
  return (
    <div className="fixed top-0 left-0 bg-gray-50 w-screen border-b-2 shadow-sm z-10 flex items-center sm:overflow-hidden overflow-scroll ">
      <div className="inline text-2xl p-5 font-semibold">Network Simulator</div>
      <button
        className={"mx-2"}
        onClick={() => {
          setRun(false);
          setNetwork(new Network(networkSize[0], networkSize[1]));
        }}
      >
        <FiRefreshCw></FiRefreshCw>
      </button>
      <button
        className={"mx-2"}
        onClick={() => {
          setRun(false);
        }}
      >
        <div className="flex items-center">
          <FiPause></FiPause> <span className="pl-1">Stop</span>
        </div>
      </button>

      <NavButton
        onClick={() => {
          setRun(true);
        }}
        disabled={run}
        text="Start"
        icon={<FiPlay></FiPlay>}
        fill
      ></NavButton>
      <NavButton
        text="Tick"
        onClick={() => {
          setElements(network.tick().elements);
        }}
        disabled={run}
        icon={<></>}
        outline
      ></NavButton>
      <NavButton
        disabled={false}
        icon={<BsCircle></BsCircle>}
        onClick={() => setActiveElement(networkFeatureCategories.Empty)}
        text="Empty"
      ></NavButton>
      <NavButton
        text="Twisted Pair"
        onClick={() => setActiveElement(networkFeatureCategories.TwistedPair)}
        disabled={false}
        icon={<BsCircleFill></BsCircleFill>}
      ></NavButton>
      <NavButton
        disabled={false}
        icon={<BsSquareFill></BsSquareFill>}
        onClick={() => setActiveElement(networkFeatureCategories.Node)}
        text="Node"
      ></NavButton>
    </div>
  );
}

export default Navbar;
