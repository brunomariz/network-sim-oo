import React from "react";
import { BsCircle, BsCircleFill, BsSquareFill } from "react-icons/bs";
import { CgTrashEmpty } from "react-icons/cg";
import { FiPause, FiPlay } from "react-icons/fi";
import { networkFeatureCategories } from "../../@types/networkFeatureCategories";
import Network from "../../classes/Network";
import {
  selectRunning,
  start,
  stop,
} from "../../redux/features/simulation/simulationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import NavButton from "../NavButton/NavButton";

type Props = {
  setNetwork: Function;
  setElements: Function;
  setActiveElement: Function;
  networkSize: number[];
  network: Network;
};

function Navbar({
  setNetwork,
  setElements,
  setActiveElement,
  networkSize,
  network,
}: Props) {
  const resetNetwork = (running: boolean, template: NetworkTemplate) => {
    dispatch(stop());
    setNetwork(
      new Network(networkSize[0], networkSize[1], undefined, template)
    );
    if (running) dispatch(start());
  };
  const running = useAppSelector(selectRunning);
  const dispatch = useAppDispatch();

  console.log(running);

  return (
    <div className="fixed top-0 left-0 bg-gray-50 w-screen border-b-2 shadow-sm z-10 flex items-center sm:overflow-visible overflow-scroll ">
      <div className="inline text-2xl p-5 font-semibold">Network Simulator</div>
      <DropdownMenu
        run={running}
        buttons={[
          {
            title: "Icon",
            onClick: () => {
              resetNetwork(true, "icon");
            },
          },
          {
            title: "Stripes",
            onClick: () => {
              resetNetwork(true, "stripes");
            },
          },
        ]}
        title="Network Templates"
      ></DropdownMenu>

      {/* Clear Button */}
      <NavButton
        onClick={() => {
          dispatch(stop());
          setNetwork(
            new Network(networkSize[0], networkSize[1], undefined, "empty")
          );
        }}
        disabled={false}
        text="Clear"
        icon={<CgTrashEmpty></CgTrashEmpty>}
      ></NavButton>

      {/* Stop button */}
      <NavButton
        onClick={() => {
          dispatch(stop());
        }}
        disabled={!running}
        text="Stop"
        icon={<FiPause></FiPause>}
      ></NavButton>

      {/* Start button */}
      <NavButton
        onClick={() => {
          dispatch(start());
        }}
        disabled={running}
        text="Start"
        icon={<FiPlay></FiPlay>}
        fill
      ></NavButton>

      {/* Tick button */}
      <NavButton
        text="Tick"
        onClick={() => {
          setElements(network.tick().elements);
        }}
        disabled={running}
        icon={<></>}
        outline
      ></NavButton>

      {/* Empty button */}
      <NavButton
        disabled={false}
        icon={<BsCircle></BsCircle>}
        onClick={() => setActiveElement(networkFeatureCategories.Empty)}
        text="Empty"
      ></NavButton>

      {/* TP button */}
      <NavButton
        text="Twisted Pair"
        onClick={() => setActiveElement(networkFeatureCategories.TwistedPair)}
        disabled={false}
        icon={<BsCircleFill></BsCircleFill>}
      ></NavButton>

      {/* Node button */}
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
