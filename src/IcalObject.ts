import { AggEvent } from "./models/AggEvent";

export class IcalObject {
  constructor() {
    this.events = [];
  }

  events: AggEvent[];
}
