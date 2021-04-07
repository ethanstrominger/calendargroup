import { AggEvent } from "../models/AggEvent";
import { readFileSync } from "fs";
import ICAL from "ical.js";
import { XMLHttpRequest } from "xmlhttprequest";

function _convertIAggEventToAggEvent(ICALEvent) {
    const uid = ICALEvent.getFirstPropertyValue("uid");
    return new AggEvent({
        uid: uid,
        aggEventWebcalId: uid,
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
    return _getAggEventsFromICALText(iCalText);
};

function _getAggEventsFromICALText(iCalText: string) {
    const iAggEventRecords = _getVeventComponentsFromICALText(iCalText);
    const aggEvents = iAggEventRecords.map(_convertIAggEventToAggEvent);
    return aggEvents;
};

export const getAggEventsFromWebcalFile = (webcalFilename: string): AggEvent[] => {
    return _getEventsFromICALFile(webcalFilename);
};

export const getAggEventsFromWebcalURL = async (url: string): Promise<AggEvent[]> => {
    // todo: change to fetch?
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    await Http.send();
    const responseText: string = await new Promise((resolve, reject) => {
        Http.onload = e => {
            resolve(Http.responseText);
        }
    });
    return _getAggEventsFromICALText(responseText);
}

export const getVeventComponentsTextFromFile = (webcalFilename: string): string => {
    const iCalText = readFileSync(webcalFilename).toString();
    const vEvents = _getVeventComponentsFromICALText(iCalText);
    return _getTextFromArray(vEvents)
}
function _getVeventComponentsFromICALText(iCalText: string): Array<ICAL.Component> {
    const iCalData = ICAL.parse(iCalText);
    const iCalDataComponent = new ICAL.Component(iCalData);
    return iCalDataComponent.getAllSubcomponents("vevent");
}

function _getTextFromArray(vArray: any[]) {
    let text = ""
    let arrayLength = vArray.length;
    for (let i = 0; i < arrayLength; i++) {
        text += vArray[i].toString() + '\r\n'
    }
    return text
}

