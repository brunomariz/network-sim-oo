import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Empty from "../classes/Empty";
import Link from "../classes/Link";
import GridElement from "../components/GridElement/GridElement";
import LinkComponent from "../components/NetworkFeatureComponents/LinkComponent/LinkComponent";
import NetworkGrid from "../components/NetworkGrid/NetworkGrid";

const Home: NextPage = () => {
  const initialElements = () =>
    [...Array(10 * 45)].map((item, index) => {
      return new Empty();
    });

  const [elements, setElements] = useState(initialElements());

  return (
    <div className="bg-gray-100 min-h-screen">
      <button
        onClick={() => {
          setElements(initialElements());
        }}
      >
        reset
      </button>
      <NetworkGrid elements={elements} setElements={setElements}></NetworkGrid>
    </div>
  );
};
export default Home;
