import { useEffect, useState } from "react";
import Network from "../classes/Network";
import NetworkFeature from "../classes/NetworkFeature";
import { setElements, tick } from "../redux/features/grid/gridSlice";
import { selectRunning } from "../redux/features/simulation/simulationSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Navbar from "./Navbar/Navbar";
import NetworkGrid from "./NetworkGrid/NetworkGrid";
type Props = {};

function NetworkSimulator({}: Props) {
  // const networkSize = [30, 60];

  // const [network, setNetwork] = useState(
  //   new Network(networkSize[0], networkSize[1])
  // );
  const running = useAppSelector(selectRunning);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  const newIntervalId = setInterval(() => {
    if (running) {
      // setElements(network.tick().elements);
      dispatch(tick());
    }
  }, 250);

  // Clear intervals
  for (let i = 1; i < Number(newIntervalId); i++) {
    clearInterval(i);
  }
  // }, [running]);

  // const setElements = (elements: NetworkFeature[][]) => {
  // let alteredNetwork = new Network(
  //   network.sizeX,
  //   network.sizeY,
  //   network.elements
  // );
  // alteredNetwork.elements = elements;
  // setNetwork(alteredNetwork);
  // };

  return (
    <div>
      <Navbar
      // setNetwork={setNetwork}
      // setElements={(elements: NetworkFeature[][]) => dispatch(setElements(elements))}
      // network={network}
      // networkSize={networkSize}
      ></Navbar>

      <div className="overflow-scoll pt-20 h-full min-h-screen flex justify-center items-center min-w-max bg-gray-100">
        <NetworkGrid
        // elements={network.elements}
        // setElements={setElements}
        ></NetworkGrid>
      </div>
    </div>
  );
}

export default NetworkSimulator;
