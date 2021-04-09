```
BEGIN:VCALENDAR
    PRODID:-//Google Inc//Google Calendar 70.9054//EN
    VERSION:2.0
    CALSCALE:GREGORIAN
    METHOD:PUBLISH
    X-WR-CALNAME:Sample Calendar
    X-WR-TIMEZONE:America/New_York
    X-WR-CALDESC:Sample Calendar with different types of events
    BEGIN:VTIMEZONE
        TZID:America/New_York
        X-LIC-LOCATION:America/New_York
        BEGIN:DAYLIGHT
            TZOFFSETFROM:-0500
            TZOFFSETTO:-0400
            TZNAME:EDT
            DTSTART:19700308T020000
            RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
        END:DAYLIGHT
        BEGIN:STANDARD**
            TZOFFSETFROM:-0400
            TZOFFSETTO:-0500
            TZNAME:EST
            DTSTART:19701101T020000
            RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
        END:STANDARD
    END: VTIMEZONE
    BEGIN:VTIMEZONE
        TZID:Europe/Berlin
        X-LIC-LOCATION:Europe/Berlin
        BEGIN:DAYLIGHT
            TZOFFSETFROM:+0100
            TZOFFSETTO:+0200
            TZNAME:CEST
            DTSTART:19700329T020000
            RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
        END:DAYLIGHT
        BEGIN:STANDARD
            TZOFFSETFROM:+0200
            TZOFFSETTO:+0100
            TZNAME:CET
            DTSTART:19701025T030000
            RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
        END:STANDARD
    END:VTIMEZONE
    BEGIN:VEVENT
        DTSTART:20210405T130000Z
        DTEND:20210405T140000Z
        DTSTAMP:20210409T190000Z
        UID:12pvkpgashueshetu51qnilcld@google.com
        CREATED:20210409T174347Z
        DESCRIPTION:Runs Mon Mar 5\, 9-10 AM EST\n\nThis is the same timezone as th
        e calendar.
        LAST-MODIFIED:20210409T174347Z
        LOCATION:2000 Massachusetts Ave\, Cambridge\, MA 02140\, USA
        SEQUENCE:0
        STATUS:CONFIRMED
        SUMMARY:Non-repeating event default timezone
        TRANSP:OPAQUE
    END:VEVENT
    BEGIN:VEVENT
        DTSTART;TZID=America/New_York:20210405T110000
        DTEND;TZID=America/New_York:20210405T120000
        RRULE:FREQ=WEEKLY;UNTIL=20210426T035959Z;BYDAY=FR,MO,TH,TU,WE
        EXDATE;TZID=America/New_York:20210412T110000
        EXDATE;TZID=America/New_York:20210413T110000
        DTSTAMP:20210409T190000Z
        UID:7iuqd35c5e1h3dkaat8v579qlp@google.com
        CREATED:20210409T175106Z
        DESCRIPTION:<ul><li>First Fri event happens Saturday an hour later.&nbsp\;&
        nbsp\;</li><li>Thu event canceled</li></ul>
        LAST-MODIFIED:20210409T180158Z
        LOCATION:Berliln\, MA
        SEQUENCE:4
        STATUS:CONFIRMED
        SUMMARY:Repeating Daily Event with Some Exceptions
        TRANSP:OPAQUE
    END:VEVENT
    BEGIN:VEVENT
        DTSTART;TZID=America/New_York:20210417T100000
        DTEND;TZID=America/New_York:20210417T110000
        DTSTAMP:20210409T190000Z
        UID:7iuqd35c5e1h3dkaat8v579qlp@google.com
        RECURRENCE-ID;TZID=America/New_York:20210416T110000
        CREATED:20210409T175106Z
        DESCRIPTION:<ul><li>First Fri event happens Saturday an hour later.&nbsp\;&
        nbsp\;</li><li>Thu event canceled</li></ul>
        LAST-MODIFIED:20210409T180158Z
        LOCATION:Berliln\, MA
        SEQUENCE:5
        STATUS:CONFIRMED
        SUMMARY:Repeating Occurence Exception: Fri 4/16 moved to Sat 4/17 earlier
        TRANSP:OPAQUE
    END:VEVENT
    BEGIN:VEVENT
        DTSTART;TZID=Europe/Berlin:20210405T130000
        DTEND;TZID=Europe/Berlin:20210405T140000
        RRULE:FREQ=DAILY;UNTIL=20210409T215959Z
        DTSTAMP:20210409T190000Z
        UID:0d25mhbqqnqgv4hqvm54b6e0hr@google.com
        CREATED:20210409T182350Z
        DESCRIPTION:
        LAST-MODIFIED:20210409T182414Z
        LOCATION:
        SEQUENCE:0
        STATUS:CONFIRMED
        SUMMARY:Repeating event in CET
        TRANSP:OPAQUE
    END:VEVENT
END:VCALENDAR
```
