import { TransmissionStatus } from "../@types/transmissionStatus";
import { Signal } from "./Signal";

export default class NetworkFeature {
  // TODO: change name to static
  name: string = "Network Feature";
  // Number of meters an element represents
  static readonly elementSize: number = 2;
  transmissionStatus: TransmissionStatus;
  signal: Signal = new Signal(0, false);

  constructor(transmissionStatus: TransmissionStatus) {
    this.transmissionStatus = transmissionStatus;
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
