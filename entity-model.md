# Syncrhonization Diagram

```
PUBLIC WEBCAL EVENTS >------------------------------------- PUBLIC WEBCAL CALENDARS
      /\                                                           /\
      ||                                                           ||
      ||                                                           ||
      ||                                                           ||
      \/                                                           \/
   APP EVENTS >---------------------------------------------- APP CALENDARS
       |                                                          \/
       | Create events from APP EVENTS                             |
       | based on filter group criteria                            |
      \/                                                           |
FILTER GROUP EVENTS >----------------------------------------- FILTER GROUPS
      ||                                                           ||
      ||                                                           ||
      ||                                                           ||
      \/                                                           \/
GOOGLE CALENDAR EVENTS >------------------------------------ GOOGLE CALENDARS
```

# USER EVENT INFO

USERS ---< USER APP EVENT INFO >---- APP EVENTS

# ROLES
ADMIN -> All tables
EVENT ADMIN    >--< APP CALENDARS: CRUD OF EVENTS PER CALENDAR
               >--< FILTER GROUPS: CRUD OF FILTER GROUP INFO