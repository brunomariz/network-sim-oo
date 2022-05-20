import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { networkFeatureCategories } from "../@types/networkFeatureCategories";
import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "../classes/Empty";
import Link from "../classes/Link";
import Network from "../classes/Network";
import NetworkFeature from "../classes/NetworkFeature";
import Node from "../classes/Node";
import { Signal } from "../classes/Signal";
import TwistedPair from "../classes/TwistedPair";
import NetworkGrid from "../components/NetworkGrid/NetworkGrid";
import { FiPlay, FiPause, FiRefreshCw } from "react-icons/fi";

const Home: NextPage = () => {
  const networkSize = [20, 70];
  const [network, setNetwork] = useState(
    new Network(networkSize[0], networkSize[1])
  );
  const [activeElement, setActiveElement] = useState(
    networkFeatureCategories.Empty
  );
  const [run, setRun] = useState(false);

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      if (run) {
        setElements(network.tick().elements);
      }
    }, 250);
    console.log(newIntervalId);

    for (let i = 1; i < Number(newIntervalId); i++) {
      window.clearInterval(i);
    }
  }, [run]);

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
      // case networkFeatureCategories.Link:
      //   return new Link(
      //     0.1,
      //     TransmissionStatus.notTransmitting,
      //     new Signal(0, false)
      //   );
      case networkFeatureCategories.Node:
        return new Node();

      default:
        return new Empty();
    }
  };

  return (
    <div className="overflow-scoll min-w-min h-full bg-gray-100">
      <div className="fixed top-0 left-0 bg-gray-50 w-full border-b-2 shadow-sm z-10">
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
        <button
          className={`mx-2 bg-gray-900 text-gray-100 ${
            run && "text-opacity-30"
          }`}
          onClick={() => {
            setRun(true);
          }}
        >
          <div className="flex items-center">
            <FiPlay></FiPlay> <span className="pl-1">Start</span>
          </div>
        </button>
        <button
          className="p-2 m-2"
          onClick={() => {
            setElements(network.tick().elements);
          }}
        >
          Tick
        </button>
        <button
          className="p-2 m-2"
          onClick={() => setActiveElement(networkFeatureCategories.Empty)}
        >
          Empty
        </button>
        <button
          className="p-2 m-2"
          onClick={() => setActiveElement(networkFeatureCategories.TwistedPair)}
        >
          Twisted Pair
        </button>
        <button
          className="p-2 m-2"
          onClick={() => setActiveElement(networkFeatureCategories.Node)}
        >
          Node
        </button>
      </div>
      <div className="pt-20 h-screen min-w-min p-5 bg-red-400">
        <NetworkGrid
          elements={network.elements}
          setElements={setElements}
          elementFactory={elementFactory}
        ></NetworkGrid>
      </div>
    </div>
  );
};
export default Home;
