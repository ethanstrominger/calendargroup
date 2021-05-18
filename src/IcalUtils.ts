import { IcalObject } from "./IcalObject";
import { sync } from "node-ical";

export function getIcalObjectFromText(icalText: string): IcalObject {
  const icalData = sync.parseICS(icalText);
  const icalObject = new IcalObject();

  return icalObject;
}
