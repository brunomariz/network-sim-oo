import { ReactNode } from "react";

export default class NetworkFeature {
  color: string;
  component: ReactNode;

  constructor(color: string) {
    this.color = color;
  }
}
