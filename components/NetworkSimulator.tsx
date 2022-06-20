import { useEffect, useState } from "react";
import { networkFeatureCategories } from "../@types/networkFeatureCategories";
import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "../classes/Empty";
import Network from "../classes/Network";
import NetworkFeature from "../classes/NetworkFeature";
import Node from "../classes/Node";
import { Signal } from "../classes/Signal";
import TwistedPair from "../classes/TwistedPair";
import NetworkGrid from "./NetworkGrid/NetworkGrid";
import Navbar from "./Navbar/Navbar";
import { useAppSelector } from "../redux/hooks";
import { selectRunning } from "../redux/features/simulation/simulationSlice";
type Props = {};

function NetworkSimulator({}: Props) {
  const networkSize = [30, 60];

  const [network, setNetwork] = useState(
    new Network(networkSize[0], networkSize[1])
  );
  const [activeElement, setActiveElement] = useState(
    networkFeatureCategories.Empty
  );
  const running = useAppSelector(selectRunning);

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      if (running) {
        setElements(network.tick().elements);
      }
    }, 250);

    // Clear intervals
    for (let i = 1; i < Number(newIntervalId); i++) {
      window.clearInterval(i);
    }
  }, [running]);

  const setElements = (elements: NetworkFeature[][]) => {
    let alteredNetwork = new Network(
      network.sizeX,
      network.sizeY,
      network.elements
    );
    alteredNetwork.elements = elements;
    setNetwork(alteredNetwork);
  };

  const elementFactory = () => {
    switch (activeElement) {
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

  return (
    <div>
      <Navbar
        setNetwork={setNetwork}
        setElements={setElements}
        setActiveElement={setActiveElement}
        network={network}
        networkSize={networkSize}
      ></Navbar>

      <div className="overflow-scoll pt-20 h-full min-h-screen flex justify-center items-center min-w-max bg-gray-100">
        <NetworkGrid
          elements={network.elements}
          setElements={setElements}
          elementFactory={elementFactory}
        ></NetworkGrid>
      </div>
    </div>
  );
}

export default NetworkSimulator;
