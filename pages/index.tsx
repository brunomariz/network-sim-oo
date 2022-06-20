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
import Head from "next/head";
import NavButton from "../components/NavButton/NavButton";
import Navbar from "../components/Navbar/Navbar";
import store from "../redux/store";
import { Provider } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { selectRunning } from "../redux/features/simulation/simulationSlice";
import NetworkSimulator from "../components/NetworkSimulator";

const Home: NextPage = () => {
  // const networkSize = [30, 60];

  // const [network, setNetwork] = useState(
  //   new Network(networkSize[0], networkSize[1])
  // );
  // const [activeElement, setActiveElement] = useState(
  //   networkFeatureCategories.Empty
  // );
  // // const [run, setRun] = useState(false);
  // const running = useAppSelector(selectRunning);

  // useEffect(() => {
  //   const newIntervalId = setInterval(() => {
  //     if (running) {
  //       setElements(network.tick().elements);
  //     }
  //   }, 250);

  //   // Clear intervals
  //   for (let i = 1; i < Number(newIntervalId); i++) {
  //     window.clearInterval(i);
  //   }
  // }, [running]);

  // const setElements = (elements: NetworkFeature[][]) => {
  //   let alteredNetwork = new Network(
  //     network.sizeX,
  //     network.sizeY,
  //     network.elements
  //   );
  //   alteredNetwork.elements = elements;
  //   setNetwork(alteredNetwork);
  // };

  // const elementFactory = () => {
  //   switch (activeElement) {
  //     case networkFeatureCategories.Empty:
  //       return new Empty();
  //     case networkFeatureCategories.TwistedPair:
  //       return new TwistedPair(
  //         TransmissionStatus.notTransmitting,
  //         new Signal(0, false)
  //       );
  //     case networkFeatureCategories.Node:
  //       return new Node();

  //     default:
  //       return new Empty();
  //   }
  // };

  // return (
  // <Provider store={store}>
  //   <Head>
  //     <meta
  //       name="viewport"
  //       content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
  //     />
  //   </Head>
  //   <Navbar
  //     setNetwork={setNetwork}
  //     setElements={setElements}
  //     setActiveElement={setActiveElement}
  //     network={network}
  //     networkSize={networkSize}
  //   ></Navbar>

  //   <div className="overflow-scoll pt-20 h-full min-h-screen flex justify-center items-center min-w-max bg-gray-100">
  //     <NetworkGrid
  //       elements={network.elements}
  //       setElements={setElements}
  //       elementFactory={elementFactory}
  //     ></NetworkGrid>
  //   </div>
  // </Provider>
  // );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <Provider store={store}>
        <NetworkSimulator></NetworkSimulator>
      </Provider>
    </>
  );
};
export default Home;
