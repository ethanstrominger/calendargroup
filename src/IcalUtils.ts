import icalParser /* ICAL */ from "ical.js";
import { IcalObject } from "./IcalObject";
import { sync } from "node-ical";

export function getIcalObjectFromText(icalText: string): IcalObject {
  const icalDataStructured = sync.parseICS(icalText);
  let icalLines = icalText.split(/\r?\n/);

  const icalObject = new IcalObject();

  for (const line of icalLines) {
    if (line.substring(0, 13) == "X-WR-TIMEZONE") {
      icalObject.defaultTimezoneId = line.substr(14);
      break;
    }
  }

  let timezoneIds = [] as string[];
  for (const timeZone of Object.values(icalDataStructured)) {
    const tzid: string = timeZone["tzid"];
    if (tzid) {
      timezoneIds.push(tzid);
    }
  }

  icalObject.timezoneIds = timezoneIds;
  return icalObject;
}

export function getIcalObjectFromText2(icalText: string): IcalObject {
  console.log(icalText);
  const parsedCal = sync.parseICS(icalText);
  console.log("parsedCal", parsedCal);
  const calObjects = Object.values(parsedCal);
  console.log("calObjects", calObjects);
  // todo:
  // 1. Initialize new icalObject that will be returned.
  // 2. For each object in calObjects where type="VTIMEZONE", add the timezoneid to the
  //    icalObject.timezoneids array.
  // 3. return the icalObject (instead of the temporary code below)
  // 4. rename sample files "new *.txt"

  const result = getIcalObjectFromText(icalText);
  console.log("result", result);
  return result;
  // const icalObject = new IcalObject();
  // icalObject.timezoneIds = timezoneIds;
  // return icalObject;
}
