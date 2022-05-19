import { TransmissionStatus } from "../@types/transmissionStatus";

export default class NetworkFeature {
  color: string;
  transmissionStatus: TransmissionStatus;

  constructor(color: string, transmissionStatus: TransmissionStatus) {
    this.transmissionStatus = transmissionStatus;
    this.color = color;
  }

  tick(elements: NetworkFeature[][], position: Position): NetworkFeature {
    // overwrite on child classes
    return this;
  }
}
