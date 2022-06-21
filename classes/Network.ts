import {
  generateIcon,
  generateStripes,
  templateGenerator,
} from "../utils/templates";
import Empty from "./Empty";
import NetworkFeature from "./NetworkFeature";

export default class Network {
  sizeX: number;
  sizeY: number;
  elements: NetworkFeature[][];

  constructor(
    sizeX: number,
    sizeY: number,
    elements?: NetworkFeature[][] | undefined
    // template?: NetworkTemplate
  ) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    // const emptyArray = [
    //   ...Array.from(Array(sizeX), () => new Array(sizeY).fill(new Empty())),
    // ];

    // switch (template) {
    //   case "icon":
    //     generateIcon(emptyArray);
    //     break;
    //   case "stripes":
    //     generateStripes(emptyArray);
    //     break;
    //   case "empty":
    //     break;

    //   default:
    //     generateIcon(emptyArray);
    //     break;
    // }
    // // if (template) generateStripes();

    const emptyArray = templateGenerator("empty", sizeX, sizeY);

    this.elements = elements ?? emptyArray;
  }

  tick() {
    let newElements = this.elements.map((rowItem, row) => {
      return [...rowItem];
    });

    newElements = newElements.map((rowItem, row) => {
      return rowItem.map((item, column) => {
        return item.tick(this.elements, { x: row, y: column });
      });
    });

    this.elements = newElements;
    return new Network(this.sizeX, this.sizeY, this.elements);
  }
}
