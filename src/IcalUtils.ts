import { IcalObject } from "./IcalObject";
import { sync, async } from "node-ical";


export function getIcalObjectFromText(icalText: string): IcalObject {
  const icalData = sync.parseICS(icalText);
  let icalLines = icalText.split(/\r?\n/);
  
  const icalObject = new IcalObject();
  
  for (const line of icalLines) {
    if (line.substring(0,13) == 'X-WR-TIMEZONE') {
      icalObject.defaultTimezoneId = line.substr(14);
      break;
    }
  }

  let timezoneIds = [] as string[];
  for (const timeZone of Object.values(icalData)) {
    if (timeZone.tzid) {
      timezoneIds.push(timeZone.tzid)
    }
  };

  icalObject.timezoneIds = timezoneIds;
  return icalObject;
}
