import { tick } from "../redux/features/grid/gridSlice";
import { selectRunning } from "../redux/features/simulation/simulationSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Navbar from "./Navbar/Navbar";
import NetworkGrid from "./NetworkGrid/NetworkGrid";
type Props = {};

function NetworkSimulator({}: Props) {
  const running = useAppSelector(selectRunning);
  const dispatch = useAppDispatch();

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

  return (
    <div>
      <Navbar></Navbar>

      <div className="overflow-scoll pt-20 px-2 h-full min-h-screen flex justify-center items-center min-w-max bg-gray-100">
        <NetworkGrid></NetworkGrid>
      </div>
    </div>
  );
}

export default NetworkSimulator;
