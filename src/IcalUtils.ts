import { IcalObject } from "./IcalObject";
import { sync } from "node-ical";

export function getIcalObjectFromText(icalText: string): IcalObject {
  const icalData = sync.parseICS(icalText);
  //console.log(icalData);
  const icalObject = new IcalObject();
  // icalObject.events = [
  //   {
  //     dtStart: new Date("2020-01-30"),
  //     dtEnd: new Date("2020-01-30"),
  //     dtStamp: new Date("2020-01-18"),
  //     created: new Date("2020-01-02"),
  //     location: "10 Mass Ave, Boston, MA",
  //     summary: "Sample Event",
  //   },
  //   {
  //     dtStart: new Date("2020-01-30"),
  //     dtEnd: new Date("2020-01-30"),
  //     dtStamp: new Date("2020-01-18"),
  //     created: new Date("2020-01-02"),
  //     location: "10 Mass Ave, Boston, MA",
  //     summary: "Sample Event",
  //   },
  // ];
  for (const parsedEvent of Object.values(icalData).filter(
    (obj) => obj.type == "VEVENT"
  )) {
    //console.log(parsedEvent);
    icalObject.events.push({
      originIcalUid: "2",
      dtStart: new Date("2020-01-30"),
      dtEnd: new Date("2020-01-30"),
      dtStamp: new Date("2020-01-18"),
      created: new Date("2020-01-02"),
      location: "10 Mass Ave, Boston, MA",
      summary: parsedEvent.summary,
    });
  }
  return icalObject;
}
