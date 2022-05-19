import { TransmissionStatus } from "../@types/transmissionStatus";
import NetworkFeature from "./NetworkFeature";

export default class Node extends NetworkFeature {
  constructor() {
    super("#104499", TransmissionStatus.transmitting);
  }
}
