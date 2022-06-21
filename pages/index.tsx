import type { NextPage } from "next";
import Head from "next/head";
import NetworkSimulator from "../components/NetworkSimulator";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <NetworkSimulator></NetworkSimulator>
    </>
  );
};
export default Home;
