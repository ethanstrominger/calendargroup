# Syncrhonization Diagram

```
┌----------------------┐                                      ┌------------┐
│ EXTERNAL CALENDAR /  │ ------------------------------------<|  EXTERNAL  |
│    EVENT LIST        │                                      |   EVENTS   |
└----------------------┘                                      └------------┘
          |                                                         |
          |                                                         |
          |                                                         |
         /|\                                                        |
┌----------------------┐                                            |
|        EVENT         | -------------------------------------------┐   <==== Event aggregator procedure fetches
|     SOURCES          |                                            |         external events for an event aggregrator and
└----------------------┘                                            |         if applicable, filters the events based on the
   \|/                                                              |         filter for the event aggregator
    |                                                               |
    |                                                               |
    |                                                      ┌--------|----------┐
    |                                                      |        |          |
    |     ┌-------------┐    ┌-------------------┐         |       /|\         |
    |     |   FILTER    |---<| FILTER CONDITIONS |         |    ┌------------┐ |
    |     └-------------┘    └-------------------┘         |    | AGGREGATED | |
    |          \|/                                         |    | EVENTS     | |
    |           |                                          |    └------------┘ |
┌----------------------┐                                   |                   |
|       SMART CALENDAR | >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> |     CALENDAR      |      events for all the event aggregators of an
└----------------------┘                                   |                   | .    event group
                                                           |                   |
                                                           └-------------------┘
                                                                    /\
                                                                    ||
                                                                    || Event Goer subscribes to calendr
                                                                    ||
                                                                 EVENT GOER

```

# MODEL ENTITY DEFINITIONS

EventSource:

- UUID
- Name
- Type (FILE or URL)
- Source (FILE or URL)
- Timezones

AggregatedEvents:

- UUID
- Name
- other fields specified by webcal format

EventAggregator

- UUID
- Name

Filter: UUID: Name, [ FilterConditions ], [ EventSources ]
FilterCondition: UUID, FilterExpression

# USER EVENT INFO

USERS ---< SUBSCRIBED ICAL EVENT INFO >---- AGG EVENTS

# ROLES

- ADMIN -> CRUD on all tables
- EVENT GROUP ADMIN --< EVENT GROUP: CRUD EVENT GROUP AND RELATED AGGREGRATORS, FILTERS, AND FILtER CONDITIONS
- USER -< SUBSCRIBED ICAL EVENT: CRYD
- EVERYONE -> READ ON EVENT GROUP, FILTERS, FILTER CONDITIONS AND SUBSCRIBE TO AN EVENT GROUP
