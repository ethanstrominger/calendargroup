## Algorithm

Goal: Combine multiple calendars into a new calendar, where:

- Calendar Timezone Definitions: The list of timezone definitions at the beginning of the new calendar include all the timezone definitions from the original calendars with no duplicates
- The new calendar will retain/discard/override the following information (ICS terms below):
  - Retain:
    - Timezone Component
    - Event Components, with following changes:
      - Description: Add URL or file specification of the original event to the top of the description, followed by 2 carriage returns (for space between the URL and original description)
      - Events with no timezone orginally specified: use the default timezone from the original calendar
  - Override:
    - Calendar Properties
      - Calendar Scale : Gregorian
      - Method : Publish
      - Product Identifier : AggregatedCalendar
      - Version : Version of AggregatedCalendar, e.g., 1.0
      - X-WR-CALNAME : user-provided (by creator of Aggregated Calendar)
      - X-WR-TIMEZONE : user-provided (by creator of Aggregated Calendar)
      - X-WR-CALDESC : user-provided (by creator of Aggregated Calendar)
  - Discard:
    - To-Do Component
    - Journal Component
    - Free/Busy Component
    - Alarm Component
    - Calendar extensions not mentioned above (Note: extensions have "X-" prefix)

Overall algorithm:

Given: A valid array of ics filenames:

1.  Initialize a new array for holding data about each ics. The elements of the array will have this structure

    - filespec: string
    - timezoneDefinitions: ARRAY [ { name: STRING, icalText: string } ]
    - events: ARRAY [ { icalEventText: string} ]

    NOTE: Any other info (todos, etc) is discarded

2.  For each ICS, populate a new element in the above array as follows
    2.1 filespec => flespec from the original list
    2.2 timezoneDefinitons => timezone definitions from the original lst
    2.3 events => for each event component, copy the **event text** and modify as follows:  
    
    - Figure out URL for event, if possible. - Description: Add the **URL or file specification** of the calendar to the top of the description followed by the event URL on the same line if available, followed by 2 carriage returns (for space between the URL and original description). For meetups, webscrape the full description (ics truncates a portion of the description). 
    - Events with no timezone orginally specified: use the **default timezone** from the original calendar
    ```
    Example: Timezone specified, so no change
    DTSTART;TZID=Europe/Berlin:20210405T130000 would stay the same

    Example: No timezone, so "Z" is chopped off and timezone is set to default (in below example, America/New_York):
    DTSTART;20210405T130000Z would change to DTSTART;TZID=America/New_York;20210405T130000
             ```

3.  Create an array of timezones which is the unique set of timezone definitions for all the calendars
4.  Create an an array of event text which is the combination of the event event array of all of the events
5.  (Can be deferred) Order by DtSTART, DTEND transformed to UTC and repopulate SEQUENCE
6.  Derive final ics

```
   START VCALENDAR
   Calendar properties:
      - Calendar Scale : Gregorian
      - Method : Publish
      - Product Identifier : AggregatedCalendar
      - Version : Version of AggregatedCalendar, e.g., 1.0
      - X-WR-CALNAME : user-provided (by creator of Aggregated Calendar)
      - X-WR-TIMEZONE : user-provided (by creator of Aggregated Calendar)
      - X-WR-CALDESC : user-provided (by creator of Aggregated Calendar)
   < combined text from array of unique timezone definitions >
   < combined text from array of events >
   END VCALENDAR
```

- Meetup event URL can be calculated as followed: - Derive meetup event id from the uid.  
  Tests

* Calendar with events all from the same timezone
* Calendar with events in default timezone and another timezone
* Two calendars that share the same timezone and use one timezone
* Two calendars that use different default timezones and use one timezone
* Two calendars that use different default timezones and have multiple timezones
