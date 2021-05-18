import { AggEvent } from "./models/AggEvent";

export class IcalObject {
  constructor() {}
  events: AggEvent[];
  timezoneIds: string[];
}
