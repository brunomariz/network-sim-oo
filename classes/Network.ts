import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "./Empty";
import NetworkFeature from "./NetworkFeature";
import Node from "./Node";
import { Signal } from "./Signal";
import TwistedPair from "./TwistedPair";

export default class Network {
  sizeX: number;
  sizeY: number;
  elements: NetworkFeature[][];

  constructor(
    sizeX: number,
    sizeY: number,
    elements?: NetworkFeature[][] | undefined,
    template?: NetworkTemplate
  ) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    const emptyArray = [
      ...Array.from(Array(sizeX), () => new Array(sizeY).fill(new Empty())),
    ];

    const generateIcon = () => {
      emptyArray[3][23] = new Node();
      emptyArray[7][20] = new Node();
      emptyArray[7][26] = new Node();
      for (let i = 18; i < 29; i++) {
        emptyArray[5][i] = new TwistedPair(
          TransmissionStatus.notTransmitting,
          new Signal(0, false)
        );
      }
      emptyArray[6][20] = new TwistedPair(
        TransmissionStatus.notTransmitting,
        new Signal(0, false)
      );
      emptyArray[4][23] = new TwistedPair(
        TransmissionStatus.notTransmitting,
        new Signal(0, false)
      );
      emptyArray[6][26] = new TwistedPair(
        TransmissionStatus.notTransmitting,
        new Signal(0, false)
      );
    };

    const generateStripes = () => {
      for (let index = 0; index < emptyArray.length; index += 2) {
        emptyArray[index][0] = new Node();
        for (let j = 1; j < emptyArray[0].length; j++) {
          emptyArray[index][j] = new TwistedPair(
            TransmissionStatus.notTransmitting,
            new Signal(0, false)
          );
        }
      }
    };

    switch (template) {
      case "icon":
        generateIcon();
        break;
      case "stripes":
        generateStripes();
        break;
      case "empty":
        break;

      default:
        generateIcon();
        break;
    }
    // if (template) generateStripes();

    this.elements = elements ?? emptyArray;
  }

  tick() {
    let newElements = this.elements.map((rowItem, row) => {
      return [...rowItem];
    });

    newElements = newElements.map((rowItem, row) => {
      return rowItem.map((item, column) => {
        return item.tick(this.elements, { x: row, y: column });
      });
    });

    this.elements = newElements;
    return new Network(this.sizeX, this.sizeY, this.elements);
  }
}
