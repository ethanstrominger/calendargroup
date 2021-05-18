import { IcalObject } from "./IcalObject";
import { sync } from "node-ical";

export function getIcalObjectFromText(icalText: string): IcalObject {
  const icalData = sync.parseICS(icalText);
  const icalObject = new IcalObject();

  let timezoneIds = [] as string[];

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
  return result;
}
