import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "../classes/Empty";
import NetworkFeature from "../classes/NetworkFeature";
import Node from "../classes/Node";
import { Signal } from "../classes/Signal";
import TwistedPair from "../classes/TwistedPair";

export const generateIcon = (elements: NetworkFeature[][]) => {
  elements[3][23] = new Node();
  elements[7][20] = new Node();
  elements[7][26] = new Node();
  for (let i = 18; i < 29; i++) {
    elements[5][i] = new TwistedPair(
      TransmissionStatus.notTransmitting,
      new Signal(0, false)
    );
  }
  elements[6][20] = new TwistedPair(
    TransmissionStatus.notTransmitting,
    new Signal(0, false)
  );
  elements[4][23] = new TwistedPair(
    TransmissionStatus.notTransmitting,
    new Signal(0, false)
  );
  elements[6][26] = new TwistedPair(
    TransmissionStatus.notTransmitting,
    new Signal(0, false)
  );
  return elements;
};

export const generateStripes = (elements: NetworkFeature[][]) => {
  for (let index = 0; index < elements.length; index += 2) {
    elements[index][0] = new Node();
    for (let j = 1; j < elements[0].length; j++) {
      elements[index][j] = new TwistedPair(
        TransmissionStatus.notTransmitting,
        new Signal(0, false)
      );
    }
  }
  return elements;
};

export const templateGenerator = (
  template: NetworkTemplate,
  sizeX: number,
  sizeY: number
) => {
  const templateGrid: NetworkFeature[][] = [
    ...Array.from(Array(sizeX), () => new Array(sizeY).fill(new Empty())),
  ];
  switch (template) {
    case "icon":
      generateIcon(templateGrid);
      break;
    case "stripes":
      generateStripes(templateGrid);
      break;
    case "empty":
      break;
    default:
      generateIcon(templateGrid);
      break;
  }
  return templateGrid;
};
