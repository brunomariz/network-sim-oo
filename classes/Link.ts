import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "./Empty";
import NetworkFeature from "./NetworkFeature";
import { Signal } from "./Signal";

export default class Link extends NetworkFeature {
  name: string = "Link";

  errorRate: number;
  neighborsTransmitting = false;
  neighborsSignalSum = 0;

  constructor(
    errorRate: number = 0.1,
    transmissionStatus: TransmissionStatus,
    signal: Signal
  ) {
    super("#101044", transmissionStatus);

    this.signal = signal;
    this.errorRate = errorRate;
    this.color = this.getNewColor();
  }

  tick(elements: NetworkFeature[][], position: Position): NetworkFeature {
    // Initialize variables
    this.neighborsTransmitting = false;
    this.neighborsSignalSum = 0;
    // Define neighbors in terms of offset from position row and column
    // Ex: [-1, 0] signifies neighbor above (row + (-1), column)
    // Ex: [0, 1]  signifies neighbor to the right (row, column + 1)
    const neighbors = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]; // top, right, bottom, and left
    let i = 0;
    let j = 0;
    // Loop through neigbors and update variables
    for (let neighbor = 0; neighbor < neighbors.length; neighbor++) {
      i = position.x + neighbors[neighbor][0];
      j = position.y + neighbors[neighbor][1];
      if (i > -1 && i < elements.length && j > -1 && j < elements[i].length) {
        if (
          elements[i][j].transmissionStatus == TransmissionStatus.transmitting
        ) {
          if (elements[i][j].signal.corrupted) {
            this.signal.corrupted = true;
          }
          this.neighborsTransmitting = true;
          this.neighborsSignalSum += elements[i][j].signal.value;
        }
      }
    }

    // Generate random noise on signal based on error rate
    this.generateNoise();

    return this.linkFactory();
  }

  linkFactory() {
    if (
      this.neighborsTransmitting &&
      this.transmissionStatus == TransmissionStatus.notTransmitting
    ) {
      return new Link(
        this.errorRate,
        TransmissionStatus.transmitting,
        new Signal(this.neighborsSignalSum, this.signal.corrupted)
      );
    } else if (this.transmissionStatus == TransmissionStatus.transmitting) {
      return new Link(
        this.errorRate,
        TransmissionStatus.justTransmitted,
        new Signal(0, false)
      );
    } else {
      return new Link(
        this.errorRate,
        TransmissionStatus.notTransmitting,
        new Signal(0, false)
      );
    }
  }

  generateNoise() {
    const random = Math.floor(Math.random() / this.errorRate);
    if (random == 0) {
      this.neighborsSignalSum += 1;
      this.signal.corrupted = true;
    }
  }

  getNewColor() {
    switch (this.transmissionStatus) {
      case TransmissionStatus.notTransmitting:
        return "#101044";

      case TransmissionStatus.transmitting:
        if (this.signal.corrupted) {
          return "#ef5544";
        }
        return "#10ef44";

      case TransmissionStatus.justTransmitted:
        return "#088f33";

      default:
        return "#101044";
    }
  }
}
