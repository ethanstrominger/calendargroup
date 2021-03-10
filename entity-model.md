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
|     SOURCES       |                                            |         external events for an event aggregrator and
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
|       EVENT          |                                   |   SUBSCRIBABLE    | <=== Event group procedure combines the aggregated
|       AGGREGATOR          | >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> |     CALENDAR      |      events for all the event aggregators of an 
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
EventAggregator: 
 - UUID
 - Name
 - Url
 - veventComponentsText

EventGroup: UUID, Name, [ EventAggregators ], [ Filters ]
  - UUID
  - Name
  - aggregatedVeventComponentsText

Filter: UUID: Name, [ FilterConditions ], [ EventAggregators ]
FilterCondition: UUID, FilterExpression


# USER EVENT INFO

USERS ---< SUBSCRIBED ICAL EVENT INFO >---- AGG EVENTS

# ROLES

- ADMIN -> CRUD on all tables
- EVENT GROUP ADMIN --< EVENT GROUP: CRUD EVENT GROUP AND RELATED AGGREGRATORS, FILTERS, AND FILtER CONDITIONS
- USER -< SUBSCRIBED ICAL EVENT: CRYD
- EVERYONE -> READ ON EVENT GROUP, FILTERS, FILTER CONDITIONS AND SUBSCRIBE TO AN EVENT GROUP

