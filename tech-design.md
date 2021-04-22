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

**Overall algorithm:**

Given: A valid array of ics filenames:

1.  Initialize a new array for holding data about each ics. The elements of the array will have this structure

    - url: string (url of original ics file)
    - timezoneDefinitions: ARRAY [ { name: STRING, icalText: string } ] (types may be different if using 3rd party object model)
    - events: ARRAY [ { icalEvent: Event} ]

    NOTE: Any other info (todos, etc) is discarded

2.  For each ICS, populate a new element in the above array as follows:
   <br/>2.1 url => url from the original list
   <br/>2.2 timezoneDefinitons => timezone definitions from the original list
   <br/>2.3 events => for each event component, copy the **event object** and modify as follows:  
    
      - Figure out URL for event, if possible. 
      - Description: Add the **event URL** *if available†*, else add the **URL of the calendar** to the top of the description, followed by 2 carriage returns (for space between the URL and original description). For meetups, webscrape the full description (ics truncates a portion of the description). 
      - For the attribute DTSTART, if there is no timezone orginally specified: use the **default timezone** from the original calendar.  This is done by dropping off the Z and adding
    ```;TZID=<default timezone name> after DTSTART and before the colon```.

         Example: Timezone specified, so no change
      ```DTSTART;TZID=Europe/Berlin:20210405T130000``` would stay the same

         Example: No timezone, so "Z" is chopped off and timezone is set to default (in below example, America/New_York): ```DTSTART;20210405T130000Z``` would change to ```DTSTART;TZID=America/New_York;20210405T130000```.

         *† For Meetup.com events, you can derive the event URL from the UUID of the event.*

      <br/>2.4 Do the same for DTDEND

3.  Timezone list: Create an array of timezones which is the unique set of timezone definitions for all the calendars
4.  Event list: Create an an array of event objects which is the combination of the event array from all the calendars
5.  Populate sequence/sort: (Can be deferred) Repopulate SEQUENCE of the event objects to represent the events ordered by DTSTART and DTEND
6.  Serialize the timezone list and event list to ics formatted text. Example:

```
   START VCALENDAR
   Calendar Scale : Gregorian
   Method : Publish
   Product Identifier : AggregatedCalendar
   Version : Version of AggregatedCalendar, e.g., 1.0
   X-WR-CALNAME : user-provided (by creator of Aggregated Calendar)
   X-WR-TIMEZONE : user-provided (by creator of Aggregated Calendar)
   X-WR-CALDESC : user-provided (by creator of Aggregated Calendar)
   < combined text from array of unique timezone definitions >
   < combined text from array of events >
   END VCALENDAR
```

**Tests**

* One Calendar Tests:
   * One calendar with all events use the default timezone
   * One calendar with some events in the default timezone and other events use a different timezone
* Two Calendar Tests:
   * Two calendars that share the same default timezone and all events use the default timezone
   * Two calendars that use different default timezones and the events in both calendars use the default timezone for that calendar
   * Two calendars that use different default timezones and some of the events use non-default timezones
