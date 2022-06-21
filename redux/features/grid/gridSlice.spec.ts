import Empty from "../../../classes/Empty";
import Network from "../../../classes/Network";
import reducer, { setElements } from "./gridSlice";

test("should return updated grid", () => {
  const elements = [[new Empty()]];
  expect(
    reducer(
      { height: 1, width: 1, network: new Network(1, 1) },
      setElements(elements)
    ).network.elements
  ).toEqual(elements);
});

export {};
