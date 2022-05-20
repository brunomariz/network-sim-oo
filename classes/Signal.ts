export class Signal {
  value: number;
  corrupted: boolean = false;

  constructor(value: number, corrupted: boolean) {
    this.corrupted = corrupted;
    this.value = value;
  }
}
