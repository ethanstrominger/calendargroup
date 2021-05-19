import { AggEvent } from "./models/AggEvent";

export class IcalObject {
  constructor() {
    this.events = [
      {
        originIcalUid: "1",
        dtStart: new Date("2020-01-30"),
        dtEnd: new Date("2020-01-30"),
        dtStamp: new Date("2020-01-18"),
        created: new Date("2020-01-02"),
        location: "10 Mass Ave, Boston, MA",
        summary: "Sample Event",
      },
      2,
    ];
  }
  events: AggEvent[];
}
