import { TransmissionStatus } from "../@types/transmissionStatus";
import Empty from "./Empty";
import NetworkFeature from "./NetworkFeature";

export default class Link extends NetworkFeature {
  errorRate: number;

  constructor(errorRate: number, transmissionStatus: TransmissionStatus) {
    super("#101044", transmissionStatus);

    this.errorRate = errorRate;
    this.color = this.getNewColor();
  }

  tick(elements: NetworkFeature[][], position: Position): NetworkFeature {
    const neighborsTransmitting = this.checkTransmittingNeighbors(
      elements,
      position
    );

    console.log(elements.slice(position.x - 2, position.x + 2));

    if (
      neighborsTransmitting &&
      this.transmissionStatus == TransmissionStatus.notTransmitting
    ) {
      return new Link(this.errorRate, TransmissionStatus.transmitting);
    } else if (this.transmissionStatus == TransmissionStatus.transmitting) {
      return new Link(this.errorRate, TransmissionStatus.justTransmitted);
    } else {
      return new Link(this.errorRate, TransmissionStatus.notTransmitting);
    }
  }

  checkTransmittingNeighbors(elements: NetworkFeature[][], position: Position) {
    let count = 0;
    for (let i = position.x - 1; i < position.x + 2; i++) {
      for (let j = position.y - 1; j < position.y + 2; j++) {
        if (i > -1 && i < elements.length && j > -1 && j < elements[i].length) {
          if (
            elements[i][j].transmissionStatus == TransmissionStatus.transmitting
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getNewColor() {
    switch (this.transmissionStatus) {
      case TransmissionStatus.notTransmitting:
        return "#101044";

      case TransmissionStatus.transmitting:
        return "#10ef44";

      case TransmissionStatus.justTransmitted:
        return "#088f33";

      default:
        return "#101044";
    }
  }
}
