import { CalEvent } from "../models/CalEvent";
// import fs from "fs";

// const iCalData = fs.readFileSync(iCalFileName).toString();
// get calEvents(): { [key: string]: CalEvent } {
// return this._calEvents;
// }
// private static _convertICalRecordToICalEvent(vevent) {
// console.log("converting");
// const element = {
//   uid: vevent.getFirstPropertyValue("uid"),
//   summary: vevent.getFirstPropertyValue("summary"),
//   dtstart: new Date(vevent.getFirstPropertyValue("dtstart")),
//   dtend: new Date(vevent.getFirstPropertyValue("dtend")),
//   description: vevent.getFirstPropertyValue("description"),
//   location: vevent.getFirstPropertyValue("location"),
// };
// console.log("done");
// return element;
// }

export const getCalEventsFromWebcalFile = (webcalFilename: string): CalEvent[] => {
    const webcalEvents: CalEvent[] = [];
    return webcalEvents;
};