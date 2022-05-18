import { ReactNode } from "react";
import LinkComponent from "../components/NetworkFeatureComponents/LinkComponent/LinkComponent";
import NetworkFeature from "./NetworkFeature";

export default class Link extends NetworkFeature {
  errorRate: number;

  constructor(errorRate: number) {
    super("#101044");
    this.errorRate = errorRate;
  }
}
