import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "./Empty";
import Link from "./Link";
import NetworkFeature from "./NetworkFeature";

export default class Network {
  sizeX: number;
  sizeY: number;
  elements: NetworkFeature[][];

  constructor(sizeX: number, sizeY: number, elements?: NetworkFeature[][]) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    const emptyArray = [
      ...Array.from(Array(sizeX), () => new Array(sizeY).fill(new Empty())),
    ];

    emptyArray[2][5] = new Link(1, TransmissionStatus.transmitting);
    emptyArray[2][6] = new Link(1, TransmissionStatus.notTransmitting);
    // emptyArray[2][7] = new Link(1, false);
    // emptyArray[2][8] = new Link(1, false);
    // emptyArray[2][9] = new Link(1, false);
    // emptyArray[2][10] = new Link(1, false);
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
    return this;
  }
}
