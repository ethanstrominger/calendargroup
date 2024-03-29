# ENTITY MODEL

## AGGREGATOR MODEL

```
┌----------------------------------------┐
| ┌---------------┐      ┌-----------┐   |                ┌------------------┐
│ | AGGREGATOR    │ ---< | AGG EVENTS| >>>>>>>>>>>>>>>>>> | GENERATED ICAL   |
│ | (internal)    │      | (derived) |   |                | (derived output) |
│ └---------------┘      └-----------┘   |                └------------------┘
|         |     |                        |             ICS generated with all events
└---------|-----|------------------------┘             from calendars referred to by
          |     |                                      the Agg Event Sources
          |     /\
          |  ┌------------┐    ┌------------------┐
          |  |   FILTER   |---<| FILTER CONDITIONS|
          |  | (internal) |    |    (internal)    |
          |  └------------┘    └------------------┘
          |
         /|\
┌----------------------┐            ┌----------┐
|    CALENDAR SOURCES  | -----------| EXTERNAL |
|       (internal)     |            | CALENDAR |
└----------------------┘            └----------┘
         |                              ||
         |                              ||
        /|\                             || One Agg Event created for each
┌----------------------┐                || event in the ICS
|    AGG EVENTS        |                ||
|    (derived)         | <================
└----------------------┘

```

Create empty express service
Write a test that you get an OK
Add a config file and makes

https://localhost:3000/calendar/softwarecraft
function produceCalendar(suffix)
suffix => getUrls()

https://localhost:3000/calendar/sports

## USER EVENT INFO MODEL (V2)

USERS ---< SUBSCRIBED ICAL EVENT INFO >---- AGG EVENTS

## SECURITY MODEL

- ADMIN -> CRUD on all tables
- EVENT GROUP ADMIN --< EVENT GROUP: CRUD EVENT GROUP AND RELATED AGGREGRATORS, FILTERS, AND FILtER CONDITIONS
- USER -< SUBSCRIBED ICAL EVENT: CRYD
- EVERYONE -> READ ON EVENT GROUP, FILTERS, FILTER CONDITIONS AND SUBSCRIBE TO AN EVENT GROUP

## OBJECT MODEL DEFINITIONS

Aggregator

- aggregatorUID: string
- name: string
- urlPath: string
- aggEventSources: [AggEventSource]
  Methods:
  - create (name, urlPath)
  - addAggEventSource (aggEventSource)
  - get(aggregatorUid)

AggEventSource:

- aggEventSourceUID: string
- icalHaskkey: {uid: string, recurrence_id: string or undefined }
- type: enum (FILE or URL)
- source (string for file)
- timezones: [ TimezoneType ]
- aggEvents: [ AggEvent ]
  Methods:
  - create ( { aggEventSourceUid, name, type, source } )
  - create ( {name, type, source }) **V2**
  - addTimezonesIcalText ( icalText)
  - addTimezone ( timezone: Timezonetype ) ** V2 **
  - addAggEvent ( aggEvent )

TimezoneType:

- name: string
- icalText: string

AggEvent:

- aggEventUID: string
- webCalText: string,

V2 at

- icalAttributes: EventAttributesType

icalAttributes (matches format of webCalText)
DTSTART:string,
DTEND:string,
DTSTAMP:string
UID:string,
CREATED:string,

- DESCRIPTION: string,
  LAST-MODIFIED:string,
- LOCATION:string,
  SEQUENCE:number,
  STATUS:string,
  SUMMARY: string,
  TRANSP:string,

Atttributes for a Defining Repeating Event (vs specific occurence or exception)
RRULE: string,
\*\* EXDATE: string (dates of any occurences that are deleted),

Attributes for exceptions to repeating events:
RECURRENCE_ID: string (original occurence date)

EventAttributesType:
DTSTARTt: DtDateType,
DTEND: DTDateType,
DTSAMP: DTDateType,
UID:string,
CREATED:DtDateType,
DESCRIPTION: string,
LAST-MODIFIED:DTDateTypeg,
LOCATION:string,
SEQUENCE:number,
STATUS:string,
SUMMARY: string,
TRANSP:string,
RRULE: string,
EXDATE: string,
RECCIREMCE_ID: DTDateType

DtDateType:
utcDate Date,
utcTime Time,
tzDate Date,
tzTime Time,
timezone: string

Filter: UUID: Name, [ FilterConditions ], [ EventSources ]
FilterCondition: UUID, FilterExpression
