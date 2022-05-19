import { TransmissionStatus } from "../@types/transmissionStatus";
import Link from "./Link";
import NetworkFeature from "./NetworkFeature";

export default class Empty extends NetworkFeature {
  constructor() {
    super("#d4d4d4", TransmissionStatus.notTransmitting);
  }

  tick(elements: NetworkFeature[][], position: Position): NetworkFeature {
    // const liveNeighbors = this.countLiveNeighbors(elements, position);
    // if (liveNeighbors == 3) {
    //   return new Link(1);
    // }
    return this;
  }

  countLiveNeighbors(elements: NetworkFeature[][], position: Position) {
    let count = 0;
    for (let i = position.x - 1; i < position.x + 2; i++) {
      for (let j = position.y - 1; j < position.y + 2; j++) {
        if (i > -1 && i < elements.length && j > -1 && j < elements[i].length) {
          if (elements[i][j] instanceof Link) {
            count += 1;
            console.log("found");
          }
        }
      }
    }
    return count;
  }
}
