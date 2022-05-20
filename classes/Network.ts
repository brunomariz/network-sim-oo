import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "./Empty";
import Link from "./Link";
import NetworkFeature from "./NetworkFeature";
import Node from "./Node";
import { Signal } from "./Signal";
import TwistedPair from "./TwistedPair";

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
      emptyArray[0][0] = new Node();
      emptyArray[2][0] = new Node();
      emptyArray[4][0] = new Node();
      emptyArray[6][0] = new Node();
      emptyArray[8][0] = new Node();
      for (let i = 1; i < emptyArray[0].length; i++) {
        emptyArray[0][i] = new TwistedPair(
          TransmissionStatus.notTransmitting,
          new Signal(0, false)
        );
        emptyArray[2][i] = new TwistedPair(
          TransmissionStatus.notTransmitting,
          new Signal(0, false)
        );
        emptyArray[4][i] = new TwistedPair(
          TransmissionStatus.notTransmitting,
          new Signal(0, false)
        );
        emptyArray[6][i] = new TwistedPair(
          TransmissionStatus.notTransmitting,
          new Signal(0, false)
        );
        emptyArray[8][i] = new TwistedPair(
          TransmissionStatus.notTransmitting,
          new Signal(0, false)
        );
      }
    };

    generateStripes();
    // emptyArray[2][5] = new Link(1, TransmissionStatus.transmitting, 2.5);
    // emptyArray[2][6] = new Link(1, TransmissionStatus.notTransmitting, 0);
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
