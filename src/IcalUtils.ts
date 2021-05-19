import { IcalObject } from "./IcalObject";
import { DateWithTimeZone, TimeZoneDef, sync } from "node-ical";

export function getIcalObjectFromText(icalText: string): IcalObject {
  const icalData = sync.parseICS(icalText);
  //console.log(icalData);
  const icalObject = new IcalObject();
  for (const parsedEvent of Object.values(icalData).filter(
    (obj) => obj.type == "VEVENT"
  )) {
    //console.log(parsedEvent);
    const x = parsedEvent.created;
    icalObject.events.push({
      uid: typescriptConvertToString(parsedEvent.uid),
      dtStart: typescriptCovertToDate(parsedEvent.start),
      dtEnd: typescriptCovertToDate(parsedEvent.end),
      dtStamp: typescriptCovertToDate(parsedEvent.dtstamp),
      created: typescriptCovertToDate(parsedEvent.created),
      location: typescriptConvertToString(parsedEvent.location),
      summary: typescriptConvertToString(parsedEvent.summary),
      recurrenceId: parsedEvent.recurrenceid,
      rrule: parsedEvent.rrule?.toString(),
    });
  }
  return icalObject;
}

function throwExceptionIfNotDate(dateTypeVar: TimeZoneDef | DateWithTimeZone) {
  const isDate = dateTypeVar["toDateString"] != undefined;
  if (!isDate) {
    throw "Parameter is not a date";
  }
}

function throwExceptionIfNotStrng(stringVar: string | TimeZoneDef) {
  if (typeof stringVar != "string") {
    throw "Parameter is not a string";
  }
}

// function is necessary for typescript to identify var as a date
// properties in the external sync.parseIcs that we know as dates are sometimes typed as TimeZoneDef | DateWithTimeZon
// DateWithTimeZone is compatible with Date
function typescriptCovertToDate(
  dateTypeVar: TimeZoneDef | DateWithTimeZone
): Date {
  // calculating retValue before checkng for exception for code coverage
  const retValue = dateTypeVar instanceof Date ? dateTypeVar : new Date();
  throwExceptionIfNotDate(dateTypeVar);
  return retValue;
}

// function is necessary for typescript to identify var as a string
// properties in the external sync.parseIcs that we know as strings are sometimes typed as TimeZoneDef | string
function typescriptConvertToString(stringVar: TimeZoneDef | string): string {
  throwExceptionIfNotStrng(stringVar);
  return stringVar.toString();
}
