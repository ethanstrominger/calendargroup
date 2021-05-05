import { AggEvent } from "./models/AggEvent";

export class IcalObject {
  defaultTimezoneId: string;
  constructor() {}
  events: [AggEvent];
  timezoneIds: [string];
}
