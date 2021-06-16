Commands
`yarn test`

This will not catch type mismatches (1 + "3"). To catch type mismatches, run `yarn noemit`

Objective

Join calendars from three URLs for calendars in the ical text to create a new calendar that includes all the events. This must use icalObject. IcalObject has a single property events which is an array of type AggEvent.

localhost:3000/calendar/softwarecraft

IcalUtis Functions implemented

getIcalTextFromEvents(aggEvent: AggEvent[]) - returns text in ical format
getIcalObjectFromText(icalText: string) - returns an icalObject - icalObject.events => AggEvent[]

Note: getIcalTextFromEvents is currently used for generating test data, no
texts for this.

ICalObject, AggEvent

Joining

[ ] Add test for icalUtil.getIcalObjectFromTexts([icalText1, icalText2, icalText3]) combines events from all three calendars.
[ ] Add test for icalUtils.getUrls(prefix) returns an array of URLs associated
with the prefix in the config file.

Integration tests

[ ] Add integration text for icalUtil.getTextsFromUrls([url1, url2, url3]) returns an array of ical texts
[ ] Add integration test for icalUtil.getIcalTextFromPrefix(prefix) returns an ical based on the urls associated with the prefix. The prefix is stored in a configuration file that lists prefixes and their URLs.
[ ] Add test for route localhost:3000/calendar - returns all the configured prefixes
[ ] Add test for route localhost:3000/calendar/<prefix> retrieves a calendar

Parsing

[ ] Change tests so that parameter values are data driven from an array of test values. Test name should be included and should display when test fails.
[ ] Add test for a repeating event (rrule has a value)
[ ] Add test for an exception to a repeating event (reccurence_id has a value)
