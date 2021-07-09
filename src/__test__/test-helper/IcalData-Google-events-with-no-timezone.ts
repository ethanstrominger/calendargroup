export const ICAL_TEST_DATA = {
  testName: "Google Calendar with no timezones",
  testDescription: `
Four events with no timezone.  For non-repeating events, Google exports the event using UTC."
`,
  calData: `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Test Events without Timezone
X-WR-TIMEZONE:America/New_York
X-WR-CALDESC:Default timezone (tz) for calendar: America/New_York\nEvents a
 re all 6 PM in local tz:\n- default tz 2021-06-01\n- Europe/Berlin tz  2021
 -06-02\n- default tz.  2021-06-03\n- Europe/Berlin tz  2021-06-04
BEGIN:VEVENT
DTSTART:20210601T220000Z
DTEND:20210601T230000Z
DTSTAMP:20210518T141704Z
uid:1d76jqukakjdlr875o7868o0ci@google.com
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
DTSTART:20210603T220000Z
DTEND:20210603T230000Z
DTSTAMP:20210518T141704Z
uid:4jad88msctu17t5r3r5rlfh52n@google.com
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
DTSTART:20210602T160000Z
DTEND:20210602T170000Z
DTSTAMP:20210518T141704Z
uid:3hfjcfm2l0l5uh4hmeu7ig1e16@google.com
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
DTSTART:20210604T160000Z
DTEND:20210604T170000Z
DTSTAMP:20210518T141704Z
uid:287296skhctdlpb7lcu4aodija@google.com
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
