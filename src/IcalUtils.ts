import icalParser /* ICAL */ from "ical.js";
import { IcalObject } from "./IcalObject";

// export function addTimezoneIfAbsent(
//   timeString: string,
//   defaultTimezone: string
// ) {
//   if (timeString.includes("TZID")) {
//     return timeString;
//   }

//   const timeStringComponents = timeString.split(":");
//   const prefix = timeStringComponents[0];
//   let dateString = timeStringComponents[1];
//   dateString = dateString.substring(0, dateString.length - 1);
//   return prefix + ";TZID=" + defaultTimezone + ":" + dateString;
// }

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
