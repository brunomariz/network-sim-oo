import { TransmissionStatus } from "../@types/transmissionStatus";
import { Signal } from "./Signal";

export default class NetworkFeature {
  name: string = "Network Feature";
  color: string;
  transmissionStatus: TransmissionStatus;
  signal: Signal = new Signal(0, false);

  constructor(color: string, transmissionStatus: TransmissionStatus) {
    this.transmissionStatus = transmissionStatus;
    this.color = color;
  }

  tick(elements: NetworkFeature[][], position: Position): NetworkFeature {
    // overwrite on child classes
    return this;
  }

  setTransmitting(signalValue: number) {
    this.transmissionStatus = TransmissionStatus.transmitting;
    this.signal.value = signalValue;
  }
}
