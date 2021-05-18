import { newYorkTimezoneId, berlinTimezoneId } from "./IcalTestHelper";

const expectedResults = [
  { timezone: newYorkTimezoneId },
  { timezone: berlinTimezoneId },
  { timezone: newYorkTimezoneId },
  { timezone: berlinTimezoneId },
];
export const ICAL_TEST_DATA = {
  testName: "Google Calendar with no timezones",
  testDescription: `
Four events: 
- 1st and 3rd in America/New_York.  
- 2nd and 4th in Europe/Berlin. non-repeating events, Google exports the event using UTC
`,
  expectedResults: expectedResults,
  calData: `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Test Events without Timezone
X-WR-TIMEZONE:America/New_York
BEGIN:VEVENT
DTSTART;TZID=${expectedResults[0].timezone}:20210601T180000,
DTEND;TZID=${expectedResults[0].timezone}:20210601T190000Z
DTSTAMP:20210518T141704Z
UID:1d76jqukakjdlr875o7868o0ci@google.com
CREATED:20210518T141015Z
DESCRIPTION:
LAST-MODIFIED:20210518T141015Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:June 1\, default tz
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=${expectedResults[1].timezone}:20210601T180000
DTEND;TZID=${expectedResults[1].timezone}:20210601T190000
DTSTAMP:20210518T141704Z
UID:3hfjcfm2l0l5uh4hmeu7ig1e16@google.com
CREATED:20210518T141035Z
DESCRIPTION:
LAST-MODIFIED:20210518T141247Z
LOCATION:
SEQUENCE:1
STATUS:CONFIRMED
SUMMARY:June 2\, Europe/Berlin tz
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=${expectedResults[2].timezone}:20210601T180000
DTEND;TZID=${expectedResults[2].timezone}:20210601T190000
DTSTAMP:20210518T141704Z
UID:4jad88msctu17t5r3r5rlfh52n@google.com
CREATED:20210518T141047Z
DESCRIPTION:
LAST-MODIFIED:20210518T141047Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:June 3\, default tz
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=${expectedResults[3].timezone}:20210604T160000
DTEND;TZID=${expectedResults[3].timezone}:20210604T170000
DTSTAMP:20210518T141704Z
UID:287296skhctdlpb7lcu4aodija@google.com
CREATED:20210518T141115Z
DESCRIPTION:
LAST-MODIFIED:20210518T141400Z
LOCATION:
SEQUENCE:1
STATUS:CONFIRMED
SUMMARY:June 4\, Europe/Berlin
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR
`,
};
