## Algorithm
Goal: Combine multiple calendars into a new calendar, where:
  - Event Timezone ID: For any source event with no timezone specified in the source calendar, the event in the new calendar will specify the timezone copied from the source calendar default
  - URL: Add original source of event (URL or file specification) to the top of the description, followed by 2 carriage returns (for space between the URL and original description)
  - Calendar Timezone Definitions: The list of timezone definitions at the beginning of the new calendar include all the timezone definitions from the original calendars with no duplicates
  - The new calendar will retain/discard/override the following information (ICS terms below):
    - Retain:
        - Timezone Component 
        - Event Component 
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

Given a list of valid ICS file names

Overall algorithm:

1. Initialize an array of transformed calendar.  At the end, the array will include:
     - filespec: STRING
     - timezoneDefinitions: ARRAY [ { name: STRING, textValue: STRING} ]
     - events: ARRAY [ EVENT TEXT ]
    
    NOTE: Any other info (todos, etc) is discarded
2. For each ICS => derive values and add to transformed calendar array.
3. Initialize an array of timezones.  For each element in the transformed calendar array, if the timezone is not in the timezone, add it. the timezone is not defined, add timezone definition to the array 
4. Create an an array of event text which is the combination of the event event array of all of the events
5. Can be deferred) Order by DtSTART, DTEND transformed to UTC and repopulate SEQUENCE
6. Derive final ics
```
   START VCALENDAR
   < combined text from array of unique timezone definitions from step 3 >
   < combined text from array of events >
   END VCALENDAR
```

Tests
  - Calendar with events all from the same timezone
  - Calendar with events in default timezone and another timezone
  - Two calendars that share the same timezone and use one timezone
  - Two calendars that use different default timezones and use one timezone
  - Two calendars that use different default timezones and have multiple timezones


