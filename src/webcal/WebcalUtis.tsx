import { AggregatedEvent } from "../models/AggregatedEvent";
import { readFileSync } from "fs";
import ICAL from "ical.js";
import { XMLHttpRequest } from "xmlhttprequest";

function _convertIAggregatedEventToAggregatedEvent(ICALEvent) {
    const uid = ICALEvent.getFirstPropertyValue("uid");
    return new AggregatedEvent({
        aggregatedEventId: uid,
        aggregatedEventWebcalId: uid,
        title: ICALEvent.getFirstPropertyValue("summary"),
        startDateTime: new Date(ICALEvent.getFirstPropertyValue("dtstart")),
        endDateTime: new Date(ICALEvent.getFirstPropertyValue("dtend")),
        description: ICALEvent.getFirstPropertyValue("description"),
        location: ICALEvent.getFirstPropertyValue("location"),
        rrule: ICALEvent.getFirstPropertyValue("rrule"),
        recurrenceId: new Date(ICALEvent.getFirstPropertyValue("recurrence-id")),
        created: new Date(ICALEvent.getFirstPropertyValue("created")),
        lastModified: new Date(ICALEvent.getFirstPropertyValue("lastModified")),
        dtstamp: new Date(ICALEvent.getFirstPropertyValue("dtstamp")),
        exdate: new Date(ICALEvent.getFirstPropertyValue("exdate")),
        sequence: ICALEvent.getFirstPropertyValue("sequence"),
    });
}

function _getEventsFromICALFile(webcalFilename: string) {
    const iCalText = readFileSync(webcalFilename).toString();
    return _getAggregatedEventsFromICALText(iCalText);
};

function _getAggregatedEventsFromICALText(iCalText: string) {
    const iCalData = ICAL.parse(iCalText);
    const iCalDataComponent = new ICAL.Component(iCalData);
    const iAggregatedEventRecords = iCalDataComponent.getAllSubcomponents("vevent");
    const aggregatedEvents = iAggregatedEventRecords.map(_convertIAggregatedEventToAggregatedEvent);
    return aggregatedEvents;
};

export const getAggregatedEventsFromWebcalFile = (webcalFilename: string): AggregatedEvent[] => {
    return _getEventsFromICALFile(webcalFilename);
};

export const getAggregatedEventsFromWebcalURL = async (url: string): Promise<AggregatedEvent[]> => {
    // todo: change to fetch?
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    await Http.send();
    const responseText: string = await new Promise((resolve, reject) => {
        Http.onload = e => {
            resolve(Http.responseText);
        }
    });
    return _getAggregatedEventsFromICALText(responseText);
}

export const getVeventComponentsTextFromFile = (ICAL_FILENAME: string): string => {
    return ""
}
