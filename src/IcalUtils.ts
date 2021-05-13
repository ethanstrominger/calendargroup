import icalParser /* ICAL */ from "ical.js";
import { IcalObject } from "./IcalObject";
import { sync, async } from "node-ical";

export function getIcalObjectFromText(icalText: string): IcalObject {
  const iCalData = icalParser.parse(icalText);
  const iCalDataComponent = new icalParser.Component(iCalData);

  const timezones = iCalDataComponent.getAllSubcomponents("vtimezone");
  const timezoneIds = timezones.map((timezone) =>
    timezone.getFirstPropertyValue("tzid")
  );

  const icalObject = new IcalObject();
  icalObject.timezoneIds = timezoneIds;
  return icalObject;
}
