import { TransmissionStatus } from "../@types/transmissionStatus";
import NetworkFeature from "./NetworkFeature";

export default class Node extends NetworkFeature {
  name: string = "Node";
  constructor() {
    super(TransmissionStatus.transmitting);
    this.signal.value = 2.5;
  }
}
