import { AggregatedEvent } from "../../models/AggregatedEvent";
import { getAggregatedEventsFromWebcalFile, getVeventComponentsTextFromFile } from "../WebcalUtils";
import { getAggregatedEventsFromWebcalURL } from "../WebcalUtils";
import { ICAL_FILENAME, ICAL_URL } from '../../__test-helper__/testGlobals';
import { readFileSync } from "fs";

describe("ICS import", () => {
    it("You can get events from an ICS", () => {
        const events = getAggregatedEventsFromWebcalFile(ICAL_FILENAME);
        expect(events[0] instanceof AggregatedEvent);
    });
});

describe("URL import", () => {
    it("You can get events from a URL", async () => {
        const events = await getAggregatedEventsFromWebcalURL(ICAL_URL);
        expect(events[0] instanceof AggregatedEvent);
    });
});

// Given an ics file with two or more events
// When you get vevents component text of the ics
// Then the string is contained within the ics
describe("ComponentText extraction", () => {
    it("The event text is extracted correctly", async () => {
        const veventComponentsText = getVeventComponentsTextFromFile(ICAL_FILENAME);
        const fileContent = readFileSync(ICAL_FILENAME).toString()
        console.log('Debug count',veventComponentsText.match(/\n/g),veventComponentsText.match(/\r/g),
        veventComponentsText.match(/\n\r/g),veventComponentsText.match(/\r\n/g))
        expect(fileContent).toContain(veventComponentsText);

        const countFromGet = (veventComponentsText.match(/VEVENT/g) || []).length;
        const countFromFile = (fileContent.match(/VEVENT/g) || []).length;
        expect(countFromGet).toEqual(countFromFile);
    });
});

