import { TransmissionStatus } from "../@types/transmissionStatus";
import Link from "./Link";
import NetworkFeature from "./NetworkFeature";
import { Signal } from "./Signal";

export default class TwistedPair extends Link {
  name: string = "Twisted Pair Link";
  // Max length for Cat5 or Cat6 Ethernet cables: 100 m
  // divide by element size to get max length in elements [m/el]
  static maxLenght = 100 / NetworkFeature.elementSize;
  // BER (bit error rate) per 100 m is assumed to be 10^-6 for twisted pair [/m]
  static berPerMaxLength = 10 ** -6;
  // Calculate BER per element (ber for each element to ammount to the berPerMaxLength
  // after travelling maxLength elements)
  static berPerElement = TwistedPair.berPerMaxLength / TwistedPair.maxLenght;
  constructor(transmitting: TransmissionStatus, signal: Signal) {
    super(TwistedPair.berPerElement, transmitting, signal);
  }

  linkFactory() {
    if (
      this.neighborsTransmitting &&
      this.transmissionStatus == TransmissionStatus.notTransmitting
    ) {
      if (this.sufferedInterference) {
        console.log("interf");
      }

      return new TwistedPair(
        TransmissionStatus.transmitting,
        new Signal(this.neighborsSignalSum, this.sufferedInterference)
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
