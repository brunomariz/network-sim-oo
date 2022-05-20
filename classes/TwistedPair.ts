import { TransmissionStatus } from "../@types/transmissionStatus";
import Link from "./Link";
import { Signal } from "./Signal";

export default class TwistedPair extends Link {
  name: string = "Twisted Pair Link";
  constructor(transmitting: TransmissionStatus, signal: Signal) {
    super(0.1, transmitting, signal);
  }

  linkFactory() {
    if (
      this.neighborsTransmitting &&
      this.transmissionStatus == TransmissionStatus.notTransmitting
    ) {
      return new TwistedPair(
        TransmissionStatus.transmitting,
        new Signal(this.neighborsSignalSum, this.signal.corrupted)
      );
    } else if (this.transmissionStatus == TransmissionStatus.transmitting) {
      return new TwistedPair(
        TransmissionStatus.justTransmitted,
        new Signal(0, false)
      );
    } else {
      return new TwistedPair(
        TransmissionStatus.notTransmitting,
        new Signal(0, false)
      );
    }
  }
}
