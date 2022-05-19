import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { networkFeatureCategories } from "../@types/networkFeatureCategories";
import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "../classes/Empty";
import Link from "../classes/Link";
import Network from "../classes/Network";
import NetworkFeature from "../classes/NetworkFeature";
import Node from "../classes/Node";
import NetworkGrid from "../components/NetworkGrid/NetworkGrid";

const Home: NextPage = () => {
  const [network, setNetwork] = useState(new Network(10, 45));
  const [activeElement, setActiveElement] = useState(
    networkFeatureCategories.Empty
  );

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
      case networkFeatureCategories.Link:
        return new Link(1, TransmissionStatus.notTransmitting);
      case networkFeatureCategories.Node:
        return new Node();

      default:
        return new Empty();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <button
        className="p-2 m-2"
        onClick={() => {
          setNetwork(new Network(10, 45));
        }}
      >
        Reset
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
        onClick={() => setActiveElement(networkFeatureCategories.Link)}
      >
        Link
      </button>
      <button
        className="p-2 m-2"
        onClick={() => setActiveElement(networkFeatureCategories.Node)}
      >
        Node
      </button>
      <NetworkGrid
        elements={network.elements}
        setElements={setElements}
        elementFactory={elementFactory}
      ></NetworkGrid>
    </div>
  );
};
export default Home;
