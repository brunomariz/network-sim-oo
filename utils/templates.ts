import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "../classes/Empty";
import NetworkFeature from "../classes/NetworkFeature";
import Node from "../classes/Node";
import { Signal } from "../classes/Signal";
import TwistedPair from "../classes/TwistedPair";

export const generateIcon = (elements: NetworkFeature[][]) => {
  if (elements.length > 6 && elements[0].length > 12) {
    elements[1][6] = new Node();
    elements[5][3] = new Node();
    elements[5][9] = new Node();
    for (let i = 1; i < 12; i++) {
      elements[3][i] = new TwistedPair(
        TransmissionStatus.notTransmitting,
        new Signal(0, false)
      );
    }
    elements[4][3] = new TwistedPair(
      TransmissionStatus.notTransmitting,
      new Signal(0, false)
    );
    elements[2][6] = new TwistedPair(
      TransmissionStatus.notTransmitting,
      new Signal(0, false)
    );
    elements[4][9] = new TwistedPair(
      TransmissionStatus.notTransmitting,
      new Signal(0, false)
    );
  } else if (elements.length > 6 && elements[0].length > 12) {
  }
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
